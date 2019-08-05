import { Component } from 'react'
import Layout from '../components/layout'
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
    document.querySelector("body").classList.add("has-navbar-fixed-top")
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

  render () {
    return (
      <Layout loggedIn={this.state.loggedIn} username={this.state.username}>
        <link type="text/css" rel="stylesheet" href="static/style.css"/>
        <section className="dashboard">
          <section className="sectionStyle home center">
            <div className="center content">
              <div className="center">
                <div className="title">
                  <div className="stripe">
                  </div>
                  <div className="content-stripe">
                    <h1>Fluent, Komunitas Bahasa Dibuat Untukmu</h1>
                    <a href="/login">
                      <div className="join-button">
                        <p>Ayo Mulai</p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              <div className="image-container">
                <img src="/static/asset/image/home.png" />
              </div>
            </div>
          </section>
        </section>
      </Layout>
    );
  }
}

export default Home
