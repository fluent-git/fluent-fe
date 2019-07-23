import { Component, Fragment } from 'react'
import Layout from '../components/layout'
import Router from 'next/router'
import sessionManager from '../utils/session'
import Link from 'next/link'
import Head from '../components/head'
import Nav from '../components/nav'
import axios from 'axios'
import { homedir } from 'os';

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
var localStream = null
var callConnection = null

class Speak extends Component {
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
    script.onload = ()=>{
      navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
      // Get access to microphone
      navigator.getUserMedia (
        {video: false, audio: true},
        
        // Success callback
        function success(localAudioStream) {
            localStream = localAudioStream
            console.log({localStream})
        },
        // Failure callback
        function error(err) {
            console.log(err)
            alert("To continue using Fluent, allow us to access your microphone")
        }
      )
        
      localPeer = new Peer({
        config: {'iceServers': [
          { url: 'stun:165.22.105.219:65432' },
          { url: 'turn:165.22.105.219:65432', username: 'peerjs', credential: 'h2olo2' }
        ]}
      });
  
      localPeer.on('open',async()=>{
        console.log({localPeer})
        console.log(localPeer.id)
      })
    }
    
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
    
    console.log({isAllowed})
    
    if(!isAllowed){
      alert("Fluent is not open right now. Please come back later!")
      return
    }
    
    var user_id = this.state.userId
    var topic = thisTopic.toLowerCase()
    this.setState({
      topic: topic,
      topicImg: topicImageSource,
    })
    console.log({user_id})
    console.log({topic})
  
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
      this.setState({status: queued})

      localPeer.on('call', async (incoming) => {
        alert("We've found you a partner!")
  
        callConnection = incoming
  
        callConnection.answer(localStream)
        this.playStream(callConnection.remoteStream)
  
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
  
        callConnection.on('close',()=>this.reviewCallback(otherID,talkID))
        this.setState({status: connected})
      })
    } else {
      alert("Found a partner: "+res.data.user_id)
  
      var otherID = res.data.user_id
      var talkID = res.data.talk_id
  
      callConnection = localPeer.call(res.data.peerjs_id,localStream)
      console.log(callConnection)
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
    } else alert("You are not queued yet!")
    this.setState({status: notQueued})
  }
    
  reviewCallback(otherID,talkID){
    console.log('###### INI REVIEW CALLBACK #######')
    console.log('create review for user',otherID,', talkID',talkID)
    this.setState({status: "Review"})
  }

  componentDidMount(){
    this.init()
  }

  render() {
    let currentRender
    if (this.state.status == notQueued) {
      currentRender = <SpeakPage tryToQueue={this.tryToQueue} /> 
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

class SpeakPage extends Component {
  constructor(props){
    super(props)
  }
  render(){
    return(
      <div className="columns">
        <div className="column has-background-link is-narrow">
          <div className="columns" style={{width: 300, padding: 30, flexDirection: 'column'}}>         
            <TileHeader tryToQueue={this.props.tryToQueue} imgsrc='/static/asset/topic/free-purple.svg' title="Free"/>
            <p className="title" style={{color: '#3C3C72'}}>Talk</p>
            <p className="subtitle">
              Talking with stranger and polish your speaking skill. 
              What do you waiting for? Choose your topic!   
            </p>
          </div> 
        </div>
        <div className="column has-background-primary" style={{padding: 50}}>
          <div className="columns is-mobile is-multiline"> 
              <Tile tryToQueue={this.props.tryToQueue} imgsrc='/static/asset/topic/culture.svg' title="Culture"/>
              <Tile tryToQueue={this.props.tryToQueue} imgsrc='/static/asset/topic/food.svg' title="Food"/>
              <Tile tryToQueue={this.props.tryToQueue} imgsrc='/static/asset/topic/game.svg' title="Game"/>
              <Tile tryToQueue={this.props.tryToQueue} imgsrc='/static/asset/topic/health.svg' title="Health"/>
              <Tile tryToQueue={this.props.tryToQueue} imgsrc='/static/asset/topic/job.svg' title="Job"/>
              <Tile tryToQueue={this.props.tryToQueue} imgsrc='/static/asset/topic/movie.svg' title="Movie"/>
              <Tile tryToQueue={this.props.tryToQueue} imgsrc='/static/asset/topic/place.svg' title="Place"/>
              <Tile tryToQueue={this.props.tryToQueue} imgsrc='/static/asset/topic/politic.svg' title="Politic"/>
              <Tile tryToQueue={this.props.tryToQueue} imgsrc='/static/asset/topic/tech.svg' title="Tech"/>
              <Tile tryToQueue={this.props.tryToQueue} imgsrc='/static/asset/topic/trend.svg' title="Trend"/>
          </div>
        </div>
      </div>
    );
  }
}

class Tile extends Component {
  constructor(props){
    super(props)
  }
  render(){
    return (
      <div className="column container">
        <Box tryToQueue={this.props.tryToQueue}  title={this.props.title} imgsrc={this.props.imgsrc}/>
      </div>
    );
  }
}

class TileHeader extends Component {
  constructor(props){
    super(props)
  }
  render(){
    return (
      <div className="column container">
        <Box tryToQueue={this.props.tryToQueue} title={this.props.title} imgsrc={this.props.imgsrc}/>
      </div>
    );
  }
}

class Box extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <a onClick={() => this.props.tryToQueue(this.props.title, this.props.imgsrc)}>
        <div 
          className="box" 
          style={{
            display: 'flex', 
            flexDirection:'column', 
            alignItems: 'center',
            justifyContent:'space-around',
            height: 300}}>
          <figure className="image is-128x128">
            <img src={this.props.imgsrc} />
          </figure>
          <p className="title">
            {this.props.title}
          </p>
        </div>
      </a>
    );
  }
}

class QueuePage extends Component {
  render() {
    return (
      <div className="container" style={{display: 'flex', alignItems: 'center', flexDirection: 'column', padding: 50}}>
        <img src='/static/asset/image/queue.svg' style={{width: 600}} />
        <img src='/static/asset/icon/load.svg' style={{width: 64, margin: 20}} />
        <p className="title">Please wait till match...</p>
        <p className="subtitle">Estimated wait: 5 minutes</p>
        <a onClick={() => this.props.cancelQueue()}>
          <figure className="image is-64x64">
            <img src='/static/asset/icon/cancel.svg' />
          </figure>
        </a>
      </div>
    );
  }
}

class CallPage extends Component {
	render() {
		return (
			<div style={{display: 'flex', alignItems: 'center', flexDirection: 'column', padding: 50}}>
				<figure className="image is-128x128" style={{margin: 20}}>
					<img src={this.props.imgsrc} />
				</figure>
				<p className="title">
					Coversation Starter about {this.props.title}
				</p>
				<p className="subtitle">
					<div className="box" style={{margin: 20}}>
						<div className="content">
							<ol type="1" style={{marginTop: 0}}>
								<li>What are you most passionate about?</li>
								<li>What makes you laugh out loud?</li>
								<li>What was your favorite thing to do as a kid?</li>
								<li>Who do you text the most?</li>
								<li>What's your favorite TV show?</li>
							</ol>
						</div>
					</div>
				</p>
				<p className="subtitle">Don’t be shy and talk at least 10 minutes! Then score her speaking skills.</p>
				<p className="subtitle">2:05</p>
        <a onClick={() => this.props.disconnectCall()}>
          <figure className="image is-64x64">
            <img src='/static/asset/icon/call.svg' />
          </figure>
        </a>
			</div>
		);
	}
}

export default Speak
