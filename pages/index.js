import { Component } from 'react'
import Layout from '../components/layout'
import cookie from 'js-cookie'
import sessionManager from '../utils/session'
import Speak from '../components/speak'
import Router from 'next/router'

class Home extends Component {

  constructor(props) {
    super(props)
    if (sessionManager.isLoggedIn()) {
      var username = sessionManager.getUsername()
      var userId = sessionManager.getUserId()
      var token = sessionManager.getToken()
      this.state = { loggedIn: true, username: username, userId: userId, token: token }
    } else {
      var username = sessionManager.getUsername()
      var userId = sessionManager.getUserId()
      var token = sessionManager.getToken()
      this.state = { loggedIn: false, username: "", userId: 0, token: "" }
    }
  }

  render () {
    let text
    if (this.state.loggedIn) {
      text = <Speak />
    } else {
      text = 
      <section className="section">
        <div className="container">
          <h1 className="title">
            {text}
          </h1>
        </div>
      </section>
    }

    return (
      <Layout loggedIn={this.state.loggedIn} username={this.state.username}>
        {text}
      </Layout>
    );
  }
}

export default Home
