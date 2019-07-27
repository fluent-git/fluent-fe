import { Component, Fragment } from 'react'
import Layout from '../components/layout'
import CallPage from '../components/callPage'
import QueuePage from '../components/queuePage'
import TalkPage from '../components/talkPage'
import sessionManager from '../utils/session'
import Router from 'next/router'
import axios from 'axios'

const baseUrl = 'https://api.fluent.id'
const checkUrl = baseUrl+'/queue/check/'
const queueUrl = baseUrl+'/queue/start/'
const cancelUrl = baseUrl+'/queue/cancel/'
const startTalkUrl = baseUrl+'/talk/start/'
const endTalkUrl = baseUrl+'/talk/end/'

const queued = "queued"
const notQueued = "notQueued"
const connected = "connected"

var localPeer = null
var callConnection = null

class Talk extends Component {
  constructor(props) {
      super(props)
      if (sessionManager.isLoggedIn()) {
          var username = sessionManager.getUsername()
          var userId = sessionManager.getUserId()
          var token = sessionManager.getToken()
          this.state = { loggedIn: true, username: username, userId: userId, token: token,  status: notQueued, topic: "topic", topicImg: "/static/asset/logo/logo.svg" }
      } else {
          var username = sessionManager.getUsername()
          var userId = sessionManager.getUserId()
          var token = sessionManager.getToken()
          this.state = { loggedIn: false, username: "", userId: 0, token: "", status: notQueued }
      }

      this.init = this.init.bind(this)
      this.playStream = this.playStream.bind(this)
      this.tryToQueue = this.tryToQueue.bind(this)
      this.cancelQueue = this.cancelQueue.bind(this)
      this.disconnectCall = this.disconnectCall.bind(this)
      this.reviewCallback = this.reviewCallback.bind(this)
      this.destroyPeerAndStream = this.destroyPeerAndStream.bind(this)
      this.getQueueCheckMessage = this.getQueueCheckMessage.bind(this)
  
  }

  init(){
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/peerjs@0.3.20/dist/peer.min.js'

    document.body.appendChild(script)
  }

  playStream(stream) {
    const audio = document.createElement('audio')
    audio.srcObject = stream
    audio.autoplay = true
    document.body.appendChild(audio)
  }
    
  async getQueueCheckMessage(params){
    return axios.post(checkUrl, params)
      .then((res)=>
        {
          return res.data.message;
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
    var queueCheckResponse = await this.getQueueCheckMessage({/* PAYLOAD HERE */})
    
    console.log("queue check response",queueCheckResponse)
    
    if(queueCheckResponse === "ERROR_TIME"){
      console.log("Fluent is not open right now. Please come back later!")
      return
    }

    if(queueCheckResponse === "ERROR_TOPIC"){
      console.log("This topic is not open yet. Please try another topic!")
      return
    }
     
    localPeer = new Peer({
      config: {'iceServers': [
        { url: 'stun:165.22.105.219:65432' },
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
      var topic = thisTopic.toLowerCase()
      console.log("user_id",user_id)
      console.log("topic",topic)
      
      this.setState({status: queued})

      navigator.mediaDevices.getUserMedia = (navigator.mediaDevices.getUserMedia || navigator.mediaDevices.webkitGetUserMedia || navigator.mediaDevices.mozGetUserMedia || navigator.mediaDevices.msGetUserMedia);
      // Get access to microphone
      var localStream = await navigator.mediaDevices.getUserMedia ({video: false, audio: true})
      console.log(localStream)
      await new Promise(resolve => setTimeout(resolve, 2000));

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
      console.log(res.data)
    
      if(res.data.message === 'Queuing'){

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
          callConnection.on('close',()=>{
            this.destroyPeerAndStream(localPeer,localStream)
            this.reviewCallback(otherId,talkId)
          })
          this.setState({status: connected})
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
      callConnection.close()
    }
    this.setState({status: notQueued})
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

  componentDidMount(){
    this.init()
  }

  render() {
    let currentRender
    if (this.state.status == notQueued) {
      currentRender = <TalkPage tryToQueue={this.tryToQueue} /> 
    } else if(this.state.status == queued) {
      currentRender = <QueuePage cancelQueue={this.cancelQueue} />
    } else if (this.state.status == connected) {
      currentRender = <CallPage imgsrc={this.state.topicImg} title={this.state.topic} disconnectCall={this.disconnectCall} />
    }
    return (
      <Layout loggedIn={this.state.loggedIn} username={this.state.username}>
        <div id="talk">
          {currentRender}
        </div>
      </Layout>
    );
  }
}

export default Talk
