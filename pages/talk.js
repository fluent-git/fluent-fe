import { Component, Fragment } from 'react'
import Layout from '../components/layout'
import CallPage from '../components/callPage'
import QueuePage from '../components/queuePage'
import TalkPage from '../components/talkPage'
import Modal from '../components/modal'
import sessionManager from '../utils/session'
import Router from 'next/router'
import axios from 'axios'
import {
  baseUrl, checkUrl, queueUrl, cancelUrl, startTalkUrl, endTalkUrl, 
  queued, notQueued, connected, minimumCallTimeForReview, topicDetailUrl
} from '../utils/constants'

var localPeer = null
var localStream = null
var callConnection = null
var dataConnection = null
var audioPlayers = []
var otherId = -1
var talkId = -1
var connectionRole = null
var reconnectInterval = null

class Talk extends Component {
  constructor(props) {
      super(props)
      if (sessionManager.isLoggedIn()) {
          var username = sessionManager.getUsername()
          var userId = sessionManager.getUserId()
          var token = sessionManager.getToken()
          this.state = { 
            loggedIn: true, 
            username: username, 
            userId: userId, 
            token: token,  
            status: notQueued, 
            topic: "topic", 
            topicImg: "/static/asset/logo/logo.svg", 
            modal: false, 
            modalContent: "",
            modalImgSrc: "",
            callSeconds: 0,
            starters: [],
            tips: [],
          }
      } else {
          var username = sessionManager.getUsername()
          var userId = sessionManager.getUserId()
          var token = sessionManager.getToken()
          this.state = { 
            loggedIn: false, 
            username: "", 
            userId: 0, 
            token: "", 
            status: notQueued, 
            modal: false,
            modalContent: "",
            modalImgSrc: "",
            callSeconds: 0,
            starters: [],
            tips: [],
          }
      }

      this.handshakeTimeDelta = 0
      this.isCloseInitiator = false
      this.isClosed = true
      this.otherPeerId = null

      this.init = this.init.bind(this)
      this.playStream = this.playStream.bind(this)
      this.removeStreamPlayers = this.removeStreamPlayers.bind(this)
      this.tryToQueue = this.tryToQueue.bind(this)
      this.cancelQueue = this.cancelQueue.bind(this)
      this.disconnectCall = this.disconnectCall.bind(this)
      this.reviewCallback = this.reviewCallback.bind(this)
      this.tryToReconnect = this.tryToReconnect.bind(this)
      this.destroyPeerAndStream = this.destroyPeerAndStream.bind(this)
      this.getQueueCheckMessage = this.getQueueCheckMessage.bind(this)
      this.handleIncomingDataConnection = this.handleIncomingDataConnection.bind(this)
      this.handleIncomingCallConnection = this.handleIncomingCallConnection.bind(this)
      this.peerConnectionActions = this.peerConnectionActions.bind(this)
      this.handleData = this.handleData.bind(this)
      this.onClose = this.onClose.bind(this)
  }

  init(){
    const script = document.createElement('script')
    try{
      script.src = 'https://cdn.jsdelivr.net/npm/peerjs@0.3.20/dist/peer.min.js'
    } catch (err){
      //benerin supaya gapake alert nanti
      alert('You have a network error.')
    }
    console.log(document.body)
    document.body.appendChild(script)
  }

  playStream(stream) {
    this.removeStreamPlayers()
    var newAudioPlayer = document.createElement('audio')
    newAudioPlayer.srcObject = stream
    newAudioPlayer.autoplay = true
    document.body.appendChild(newAudioPlayer)
    audioPlayers.push(newAudioPlayer)
  }

  removeStreamPlayers(){
    audioPlayers.forEach((audioPlayer)=>document.body.removeChild(audioPlayer))
    audioPlayers = []
  }
    
  async getQueueCheckMessage(params){
    return axios.post(checkUrl, params)
      .then((res)=>
        {
          return {
            msg:res.data.message,
            //nanti add region compatibility supaya ga cuma GMT+7
            start:res.data.start,
            end:res.data.end
          };
        }
      )
      .catch((err)=>{
        console.log(err)
        return false
      })
  }
    
  destroyPeerAndStream(peer,stream){
    peer.destroy()
    stream.getTracks().forEach(track=>track.stop())
  }

  async playRingtone(){
    var ringtonePlayer = document.createElement('audio')
    document.body.appendChild(ringtonePlayer)
    ringtonePlayer.src = '../static/asset/audio/ringtone.mp3'
    ringtonePlayer.autoplay = true
    setTimeout(()=>{document.body.removeChild(ringtonePlayer)},2500)
  }

  async tryToQueue(thisTopic, topicImageSource){
    var topic = thisTopic.toLowerCase()
    
    // if (topic != "travel" && topic != "hobbies" && topic != "free talk" && topic != "opinion") {
    //   let modalContent = "This Topic Will Be Coming Soon! Stay Tuned!"
    //   this.setState({
    //     modal: true,
    //     modalContent: modalContent,
    //     modalImgSrc: "/static/asset/icon/warn.svg",
    //   })
    //   return
    // }

    var queueCheckResponse = await this.getQueueCheckMessage({"topic": topic})
    
    console.log("queue check response",queueCheckResponse)
    
    if(queueCheckResponse.msg === "ERR_TIME"){
      let modalContent = "Sorry, we are not open right now. Please come back at " + queueCheckResponse.start + ".00 - " + queueCheckResponse.end + ".00 WIB"
      this.setState({
        modal: true,
        modalContent: modalContent,
        modalImgSrc: "/static/asset/icon/warn.svg",
      })
      return
    }

    if(queueCheckResponse.msg === "ERR_TOPIC") {
      this.setState({
        modal: true,
        modalContent: "This topic is not open yet. Please try another topic!",
        modalImgSrc: "/static/asset/icon/warn.svg",
      })
      return
    }
     
    this.setState({
      modal: true,
      modalContent: "Please wait, we are trying to queue you...",
      modalImgSrc: "/static/asset/icon/queue_load.gif",
    })

    localPeer = new Peer({
      config: {'iceServers': [
        { url: 'stun:stun.l.google.com:19302' },
        { url: 'turn:165.22.105.219:65432', username: 'peerjs', credential: 'h2olo2' }
      ]}
    });

    localPeer.on('open',async()=>{
      console.log("localPeer",localPeer)
      console.log(localPeer.id)

      this.setState({
        topic: topic,
        topicImg: topicImageSource,
      })
      var user_id = this.state.userId
      console.log("user_id",user_id)
      console.log("topic",topic)
      
      await new Promise(resolve => setTimeout(resolve, 1000));

      this.setState({status: queued, modal: false, })

      navigator.mediaDevices.getUserMedia = (navigator.mediaDevices.getUserMedia || navigator.mediaDevices.webkitGetUserMedia || navigator.mediaDevices.mozGetUserMedia || navigator.mediaDevices.msGetUserMedia);
      // Get access to microphone
      localStream = await navigator.mediaDevices.getUserMedia ({video: false, audio: true})
      console.log(localStream)
      await new Promise(resolve => setTimeout(resolve, 2000));

      try{
        var res = await axios.post(queueUrl,
          {
            "topic": topic,
            "user_id": user_id,
            "peerjs_id": localPeer.id
          },
          {
            "headers": {
              "Content-Type": "application/json"
            }
          }
        )
      } catch(err) {
        this.destroyPeerAndStream(localPeer,localStream)
        this.setState({
          status: notQueued,
          modal: true,
          modalContent: "There was an error queueing you. Please try another topic!",
          modalImgSrc: "/static/asset/icon/warn.svg",
        })
        this.cancelQueue()
        return
      }
      console.log(res.data)
    
      var starters = axios.post(
        topicDetailUrl,
        {
          "topic": topic
        },
        {
          "headers": {
            "Content-Type": "application/json"
          }
        }
      ).then((res)=>{
        starters = res.data.conversation_starters
        let tips = res.data.tips
        this.setState({starters: starters, tips: tips})
      })
      
      this.isClosed = false

      if(res.data.message === 'Queuing'){
        connectionRole = 'Queuer'
        localPeer.on('connection', this.handleIncomingDataConnection)
        localPeer.on('call', this.handleIncomingCallConnection)
        console.log('queuer',this.state.starters)
      } else {
        connectionRole = 'Caller'
        otherId = res.data.user_id
        talkId = res.data.talk_id
        this.otherPeerId = res.data.peerjs_id
        this.peerConnectionActions()
        this.setState({status: connected})
        console.log(this.state.starters)
      }
    })
  }
    
  async handleIncomingDataConnection(incoming){
    dataConnection = incoming
    this.otherPeerId = dataConnection.peer
    dataConnection.on('data', this.handleData)
  }

  async handleIncomingCallConnection(incoming){
    var user_id = this.state.userId
    
    if(callConnection == null){
      this.setState({status: connected})
      this.playRingtone()    
      var res = await axios.post(startTalkUrl,
        {
          "user_id":user_id
        },
        {
          "headers": {
            "Content-Type": "application/json"
          }
        }
      )
      console.log(res.data)

      otherId = res.data.user_id
      talkId = res.data.talk_id
    }

    callConnection = incoming
    callConnection.answer(localStream)

    this.playStream(callConnection.remoteStream)
    callConnection.on('stream',this.playStream)
    callConnection.on('close',this.tryToReconnect)
  }

  peerConnectionActions(){
    dataConnection = localPeer.connect(this.otherPeerId)
    dataConnection.on('data', this.handleData)
    var firstCallConnection = (callConnection == null)
    callConnection = localPeer.call(this.otherPeerId,localStream)
    if(firstCallConnection)this.playRingtone()
    callConnection.on('stream', (stream)=>{
      console.log(stream)
      this.playStream(stream)
    })
    callConnection.on('close',this.tryToReconnect)
  }

  tryToReconnect(){
    this.removeStreamPlayers()
    callConnection = {open:false}
    if(dataConnection) dataConnection.close()
    if(!this.isClosed){
      if(connectionRole == 'Caller'){
        reconnectInterval = window.setInterval(()=>{
          console.log('reconnect try')
          if(callConnection.open){
            console.log('reconnect done!')
            window.clearInterval(reconnectInterval)
            console.log(callConnection)
            console.log(dataConnection)
          } else {
            this.removeStreamPlayers()
            this.peerConnectionActions()
          }
        },1000)
      }
      alert('you had a connection problem!')
      console.log('connection problem!')
    }
  }

  //timeout count
  handleData(json){
    if(dataConnection){
      var msg = json.msg
      console.log('Received '+msg)
      if(msg == 'FIN'){
        dataConnection.send({msg:'ACK'})
        if(this.isCloseInitiator){
          setTimeout(()=>{
            this.isClosed = true
            console.log('KILL DATACONN')
            dataConnection.close()
            dataConnection = null
            if(callConnection)callConnection.close()
            callConnection = null
            this.reviewCallback()
          },this.handshakeTimeDelta)
        } else {
          //10 ms delay
          setTimeout(dataConnection.send({msg:'FIN'}),10)
        }
      }
      if(msg == 'ACK'){
        if(this.isCloseInitiator){
          this.handshakeTimeDelta = new Date().getTime() - this.handshakeTimeDelta
          console.log(this.handshakeTimeDelta)
        } else {
          this.isClosed = true
          console.log('KILL DATACONN')
          dataConnection.close()
          dataConnection = null
          if(callConnection) callConnection.close()
          callConnection = null
          this.reviewCallback()
        }
      }
    }
  }

  async disconnectCall(){
    try{
      dataConnection.send({msg: 'FIN'})
      console.log('sent close message')
      this.isCloseInitiator = true
      this.handshakeTimeDelta = new Date().getTime()
    } catch {
      //langsung matiin aja
      await axios.post(cancelUrl,
        {
          "user_id":Number(this.state.userId)
        },
        {
          "headers": {
            "Content-Type": "application/json"
          }
        }
      )
      this.destroyPeerAndStream(localPeer,localStream)
      dataConnection = null
      callConnection = null
      this.setState({status: notQueued})
    }
  }
  
  async cancelQueue(){
    if(this.state.status === queued) {
      await axios.post(cancelUrl,
        {
          "user_id":Number(this.state.userId)
        },
        {
          "headers": {
            "Content-Type": "application/json"
          }
        }
      )
    } 
    this.setState({status: notQueued})
  }
    
  reviewCallback(){
    this.destroyPeerAndStream(localPeer,localStream)
    /*if(this.state.callSeconds <= minimumCallTimeForReview){
      axios.post(endTalkUrl,
        {
          'talk_id': talkId
        },
        {
          "headers": {
            "Content-Type": "application/json"
          }
        }
      )
      this.setState({
        status: notQueued,
        modal: true,
        modalContent: "Reviews can only be given for calls longer than one minute. Please talk more to give and receive feedback!",
        modalImgSrc: "/static/asset/icon/warn.svg",
      })
      return
    }*/
    console.log('###### INI REVIEW CALLBACK #######')
    console.log('create review for user',otherId,', talkId',talkId)
    sessionManager.startReview(otherId,talkId)
    axios.post(endTalkUrl,
      {
        'talk_id': talkId
      },
      {
        "headers": {
          "Content-Type": "application/json"
        }
      }
    )
    Router.push('/review')
  }
  onClose() {
    this.setState({modal: false})
  }

  timerListener(passedTimeInSeconds){
    this.setState({callSeconds: passedTimeInSeconds})
  }
  
  componentDidMount() {
    this.init()
    document.querySelector("body").classList.add("has-navbar-fixed-top")
  }

  render() {
    let currentRender, currentModal
    if (this.state.status == notQueued) {
      currentRender = <TalkPage tryToQueue={this.tryToQueue} /> 
    } else if(this.state.status == queued) {
      currentRender = <QueuePage cancelQueue={this.cancelQueue} topic={this.state.topic} tips={this.state.tips} />
    } else if (this.state.status == connected) {
      currentRender = <CallPage imgsrc={this.state.topicImg} title={this.state.topic} disconnectCall={this.disconnectCall} starters={this.state.starters} />
    } 
    if (this.state.modal) {
      currentModal = <Modal content={this.state.modalContent} imgSrc={this.state.modalImgSrc} onClose={this.onClose}/>
    }
    return (
      <Layout loggedIn={this.state.loggedIn} username={this.state.username}>
        <div id="talk">
          {currentModal}
          {currentRender}
        </div>
      </Layout>
    );
  }
}

export default Talk
