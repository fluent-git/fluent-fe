import React from 'react'
import Layout from '../components/layout'
import sessionManager from '../utils/session'
import Link from 'next/link'
import Head from '../components/head'
import Nav from '../components/nav'
import axios from 'axios'
import { homedir } from 'os';

const baseUrl = 'http://localhost:8000'
const checkUrl = baseUrl+'/queue/check/'
const queueUrl = baseUrl+'/queue/start/'
const cancelUrl = baseUrl+'/queue/cancel/'
const startTalkUrl = baseUrl+'/talk/start/'
const endTalkUrl = baseUrl+'/talk/end/'

var localPeer = null
var localStream = null
var callConnection = null

class Talk extends React.Component{

  constructor(props) {
    super(props)
    if (sessionManager.isLoggedIn()) {
      var username = sessionManager.getUsername()
      var userId = sessionManager.getUserId()
      var token = sessionManager.getToken()
      this.state = { loggedIn: true, username: username, userId: userId, token: token, statusMsg: "Not Queued" }
    } else {
      var username = sessionManager.getUsername()
      var userId = sessionManager.getUserId()
      var token = sessionManager.getToken()
      this.state = { loggedIn: false, username: "", userId: 0, token: "", statusMsg: "Not Queued" }
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
            alert("Audio input device error. Please refresh the website.")
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
  
  async tryToQueue(){
    var isAllowed = await this.checkIfQueueIsAllowed({/* PAYLOAD HERE */})
    
    console.log({isAllowed})
    
    if(!isAllowed){
      alert("Fluent is not open right now. Please come back later!")
      return
    }
  
    var user_id = this.state.userId
    console.log({user_id})
  
    var res = await axios.post(queueUrl,
      {
        "topic": "topic",
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
      alert("Please be patient, we are finding you a partner")
      this.setState({statusMsg: "Queued"})

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
        this.setState({statusMsg: "Connected"})
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
      this.setState({statusMsg: "Connected"})
    }
  }
  
  disconnectCall(){
    if(callConnection) callConnection.close()
  }

  async cancelQueue(){
    if(this.state.statusMsg === "Queued") {
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
    this.setState({statusMsg: "Not Queued"})
  }
  
  reviewCallback(otherID,talkID){
    console.log('###### INI REVIEW CALLBACK #######')
    console.log('create review for user',otherID,', talkID',talkID)
    this.setState({statusMsg: "Review"})
  }

  render(){
    return (
      <Layout loggedIn={this.state.loggedIn} username={this.state.username}>
        <div>
          <Head title="Fluent" />
          <Nav />

          <div className="hero">
            <h1 className="title">{this.state.statusMsg}</h1>
            <table>
              <tbody>
                <tr>
                  <td>username: {this.state.username}</td>
                  <td>user ID: {this.state.userId}</td>
                </tr>
              </tbody>
            </table>

            <div className="row">
              <button onClick={this.tryToQueue}>queue me now!</button>
              <button onClick={this.cancelQueue}>cancel queue!</button>
              <button onClick={this.disconnectCall}>disconnect call!</button>
            </div>
          </div>
          <style jsx>{`
            .hero {
              width: 100%;
              color: #333;
            }
            .title {
              margin: 0;
              width: 100%;
              padding-top: 80px;
              line-height: 1.15;
              font-size: 48px;
            }
            .title,
            .description {
              text-align: center;
            }
            .row {
              max-width: 880px;
              margin: 80px auto 40px;
              display: flex;
              flex-direction: row;
              justify-content: space-around;
            }
            .card {
              padding: 18px 18px 24px;
              width: 220px;
              text-align: left;
              text-decoration: none;
              color: #434343;
              border: 1px solid #9b9b9b;
            }
            .card:hover {
              border-color: #067df7;
            }
            .card h3 {
              margin: 0;
              color: #067df7;
              font-size: 18px;
            }
            .card p {
              margin: 0;
              padding: 12px 0 0;
              font-size: 13px;
              color: #333;
            }
          `}</style>
        </div>
      </Layout>
    )
  }
  componentDidMount(){
    this.init()
  }
}

export default Talk
