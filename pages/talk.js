import React from 'react'
import Layout from '../components/layout'
import sessionManager from '../utils/session'
import Link from 'next/link'
import Head from '../components/head'
import Nav from '../components/nav'
import axios from 'axios'
import { homedir } from 'os';

const baseUrl = 'https://api.fluent.id'
const checkUrl = baseUrl+'/queue/check/'
const queueUrl = baseUrl+'/queue/start/'
const startTalkUrl = baseUrl+'/talk/start/'
const endTalkUrl = baseUrl+'/talk/end/'

var localPeer = null
var localStream = null
var callConnection = null

function init(){
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
    $('.title')[0].innerHTML = localPeer.id
  })
}

function playStream(stream) {
  var audio = $('<audio autoplay />').appendTo('body');
  audio[0].srcObject = stream;
}

async function checkIfQueueIsAllowed(params){
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

//// TEST FUNCTION
function getUserID(){
  //// REPLACE BODY
  var content = $('#userid')[0].value
  if(content === ''){
    throw('user id kosong')
  }
  return Number(content)
  //// REPLACE BODY
}

async function tryToQueue(){
  var isAllowed = await checkIfQueueIsAllowed({/* PAYLOAD HERE */})
  
  console.log({isAllowed})
  
  if(!isAllowed){
    alert("Fluent is not open right now. Please come back later!")
    return
  }

  var user_id = getUserID()
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

    localPeer.on('call', async function(incoming) {
      alert("We've found you a partner!")

      callConnection = incoming

      callConnection.answer(localStream)

      playStream(callConnection.remoteStream)

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
      console.log('ini start talk ditembak')
      console.log(res.data)


      var otherID = res.data.user_id
      var talkID = res.data.talk_id

      callConnection.on('close',()=>reviewCallback(otherID,talkID))
    })
  } else {
    alert("Found a partner: "+res.data)

    var otherID = res.data.user_id
    var talkID = res.data.talk_id

    callConnection = localPeer.call(res.data.peerjs_id,localStream)
    console.log(callConnection)
    callConnection.on('stream', (strm)=>{
      console.log(strm)
      playStream(strm)
    })
    callConnection.on('close',()=>reviewCallback(otherID,talkID))
  }
}

function disconnectCall(){
  if(callConnection) callConnection.close()
}

function reviewCallback(otherID,talkID){
  console.log('###### INI REVIEW CALLBACK #######')
  console.log('create review for user',otherID,', talkID',talkID)
}

class Talk extends React.Component{

  constructor(props) {
    super(props)
    if (sessionManager.isLoggedIn()) {
      var username = sessionManager.getUsername()
      var token = sessionManager.getToken()
      this.state = { loggedIn: true, username: username, token: token }
    } else {
      var username = sessionManager.getUsername()
      var token = sessionManager.getToken()
      this.state = { loggedIn: false, username: "", token: "" }
    }
  }

  render(){
    return (
      <Layout loggedIn={this.state.loggedIn} username={this.state.username}>
        <div>
          <Head title="Fluent" />
          <script src="https://cdn.jsdelivr.net/npm/peerjs@0.3.20/dist/peer.min.js"></script>
          <script src="https://code.jquery.com/jquery-3.4.1.js"></script>
          <Nav />

          <div className="hero">
            <h1 className="title">hehehe</h1>
            <table>
              <tbody>
                <tr>
                  <td>username:</td>
                  <td><input id="username"></input></td>
                  <td>user ID:</td>
                  <td><input id="userid"></input></td>
                </tr>
              </tbody>
            </table>

            <div className="row">
              <button onClick={tryToQueue}>queue me now!</button>
              <button onClick={disconnectCall}>disconnect call!</button>
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
    init()
  }
}

export default Talk
