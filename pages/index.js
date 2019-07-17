import { Component } from 'react'
import Layout from '../components/layout'
import cookie from 'js-cookie'
import sessionManager from '../utils/session'

class Home extends Component {

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

  render () {
    let text
    if (this.state.loggedIn) {
      text = <section className="section"><div className="container"><h1 className="title">Hi {this.state.username}</h1></div></section>
    } else {
      text = <section className="section"><div className="container"><h1 className="title">Please login first</h1></div></section>
    }

    return (
      <Layout loggedIn={this.state.loggedIn} username={this.state.username}>
        {text}
      </Layout>
    )
  }
}

export default Home
