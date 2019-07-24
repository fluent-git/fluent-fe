import { Component, Fragment } from 'react'
import Layout from '../components/layout'
import CallPage from '../components/callPage'
import QueuePage from '../components/queuePage'
import TalkPage from '../components/talkPage'
import sessionManager from '../utils/session'
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
      this.checkIfQueueIsAllowed = this.checkIfQueueIsAllowed.bind(this)
  
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
    
  async checkIfQueueIsAllowed(params){
    return axios.post(checkUrl, params)
      .then((res)=>
        {
          if(res.data.message === 'OK'){
            return true
          } else {
            return false
          }
        }
      )
      .catch((err)=>{
        console.log(err)
        return false
      })
  }
    
  async tryToQueue(thisTopic, topicImageSource){
    var isAllowed = await this.checkIfQueueIsAllowed({/* PAYLOAD HERE */})
    
    console.log("isAllowed",isAllowed)
    
    if(!isAllowed){
      console.log("Fluent is not open right now. Please come back later!")
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
    })

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
    const localStream = await navigator.mediaDevices.getUserMedia ({video: false, audio: true})
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
  
        var otherID = res.data.user_id
        var talkID = res.data.talk_id

        this.playStream(callConnection.remoteStream)
        callConnection.on('close',()=>this.reviewCallback(otherID,talkID))
        this.setState({status: connected})
      })
    } else {
      var otherID = res.data.user_id
      var talkID = res.data.talk_id
  
      callConnection = localPeer.call(res.data.peerjs_id,localStream)
      console.log("caller",{callConnection})
      callConnection.on('stream', (stream)=>{
        console.log(stream)
        this.playStream(stream)
      })
      callConnection.on('close',()=>this.reviewCallback(otherID,talkID))
      this.setState({status: connected})
    }
  }
    
  disconnectCall(){
    if(callConnection) callConnection.close()
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
    
  reviewCallback(otherID,talkID){
    console.log('###### INI REVIEW CALLBACK #######')
    console.log('create review for user',otherID,', talkID',talkID)
    axios.post(endTalkUrl,
      {
        'talk_id': talkID
      },
      {
        "headers": {
          "Content-Type": "application/json"
        }
      }
    )
    this.setState({status: "Review"})
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
        {currentRender}
      </Layout>
    );
  }
}

export default Talk
