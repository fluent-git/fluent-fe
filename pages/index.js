import { Component } from 'react'
import Layout from '../components/layout'
import cookie from 'js-cookie'
import sessionManager from '../utils/session'
import Router from 'next/router'

class Home extends Component {

  constructor(props) {
    super(props)
    if (sessionManager.isLoggedIn()) {
      var username = sessionManager.getUsername()
      var userId = sessionManager.getUserId()
      var token = sessionManager.getToken()
      this.state = { loggedIn: true, username: username, userId: userId, token: token }
      Router.push('/talk')
    } else {
      var username = sessionManager.getUsername()
      var userId = sessionManager.getUserId()
      var token = sessionManager.getToken()
      this.state = { loggedIn: false, username: "", userId: 0, token: "" }
    }
  }

  render () {
    return (
      <Layout loggedIn={this.state.loggedIn} username={this.state.username}>
        <section className="section">
          <div className="container">
            <h1 className="title">
              Please login first
            </h1>
          </div>
        </section>
      </Layout>
    );
  }
}

export default Home
