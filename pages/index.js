import { Component } from 'react'
import Layout from '../components/layout'
import cookie from 'js-cookie'
import sessionManager from '../utils/session'
import Router from 'next/router'
import { initGA, logPageView } from '../utils/analytics'

class Home extends Component {
  componentDidMount () {
    if (!window.GA_INITIALIZED) {
      initGA()
      window.GA_INITIALIZED = true
    }
    logPageView()
  }
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

  componentDidMount() {
    document.querySelector("body").classList.add("has-navbar-fixed-top")
  }

  render () {
    return (
      <Layout loggedIn={this.state.loggedIn} username={this.state.username}>
        <section className="section">
          <div className="container">
            <h1 className="title">
              {/* Di Bawah Hanya Temporary, tolong di ganti kalau sudah jadi */}
              Welcome To Fluent! A Community for you to Practice Speaking English!
              <br></br>
              Coming Soon! Stay Tuned
            </h1>
            <img src="static/asset/image/home.png"/>
          </div>
        </section>
      </Layout>
    );
  }
}

export default Home
