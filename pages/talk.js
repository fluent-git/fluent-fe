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
var callConnection = null
var audioPlayer = null

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
          }
      }

      this.init = this.init.bind(this)
      this.playStream = this.playStream.bind(this)
      this.killStream = this.killStream.bind(this)
      this.tryToQueue = this.tryToQueue.bind(this)
      this.cancelQueue = this.cancelQueue.bind(this)
      this.disconnectCall = this.disconnectCall.bind(this)
      this.reviewCallback = this.reviewCallback.bind(this)
      this.destroyPeerAndStream = this.destroyPeerAndStream.bind(this)
      this.getQueueCheckMessage = this.getQueueCheckMessage.bind(this)
      this.onClose = this.onClose.bind(this)
  }

  init(){
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/peerjs@0.3.20/dist/peer.min.js'

    document.body.appendChild(script)
  }

  playStream(stream) {
    audioPlayer = document.createElement('audio')
    audioPlayer.srcObject = stream
    audioPlayer.autoplay = true
    document.body.appendChild(audioPlayer)
  }

  killStream(){
    audioPlayer.remove()
    audioPlayer = null
  }
    
  async getQueueCheckMessage(params){
    return axios.post(checkUrl, params)
      .then((res)=>
        {
          return {
            msg:res.data.message,
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
      var localStream = await navigator.mediaDevices.getUserMedia ({video: false, audio: true})
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
    
      if(res.data.message === 'Queuing'){

        var starters = await axios.post(
          topicDetailUrl,
          {
            "topic": topic
          },
          {
            "headers": {
              "Content-Type": "application/json"
            }
          }
        )
        starters = starters.data.conversation_starters
        console.log('starters',starters)

        localPeer.on('call', async (incoming) => {
          callConnection = incoming
          callConnection.answer(localStream)
          console.log("queuer",{callConnection})
    
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
    
          var otherId = res.data.user_id
          var talkId = res.data.talk_id

          this.playStream(callConnection.remoteStream)
          callConnection.on('stream',this.playStream)
          callConnection.on('close',()=>{
            this.destroyPeerAndStream(localPeer,localStream)
            this.reviewCallback(otherId,talkId)
          })
          this.setState({status: connected, starters: starters})
        })
      } else {
        var otherId = res.data.user_id
        var talkId = res.data.talk_id
    
        callConnection = localPeer.call(res.data.peerjs_id,localStream)
        console.log("caller",{callConnection})
        callConnection.on('stream', (stream)=>{
          console.log(stream)
          this.playStream(stream)
        })
        callConnection.on('close',()=>{
          this.destroyPeerAndStream(localPeer,localStream)
          this.reviewCallback(otherId,talkId)
        })
        this.setState({status: connected})
      }
    })
  }
    
  disconnectCall(){
    if(callConnection){
      this.killStream()
      callConnection.close()
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
    
  reviewCallback(otherId,talkId){
    if(this.state.callSeconds <= minimumCallTimeForReview){
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
    }
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
  }

  render() {
    let currentRender, currentModal
    if (this.state.status == notQueued) {
      currentRender = <TalkPage tryToQueue={this.tryToQueue} /> 
    } else if(this.state.status == queued) {
      currentRender = <QueuePage cancelQueue={this.cancelQueue} />
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
