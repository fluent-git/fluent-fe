import { Component } from 'react'
import Layout from '../components/layout';
import sessionManager from '../utils/session'
import { Z_BLOCK } from 'zlib';

class Download extends Component {
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

  render() {
      return (
        <Layout loggedIn={this.state.loggedIn} username={this.state.username} showFooter={true}>
            <section className="section" style={{display: 'flex', alignItems: 'center', flexDirection: 'column', textAlign: 'center', justifyContent:'center', height: '80vh', textAlign: 'left'}}>
                <div>
                    <p className="title">Fluent for Android</p>
                    <p className="subtitle">Start and join fluent community on mobile devices.</p>
                    <a href="https://drive.google.com/uc?export=download&id=1RvyofT6jtSVguun3gpa-ao12bmq_rZGG">
                        <button className="button is-primary" style={{marginBottom: '1.5rem'}}>Download APK</button>
                    </a>
                    <p className="subtitle">Installation Guide</p>
                    <ol type="1" style={{marginLeft: '1em'}}>
                        <li>Click Download APK, and wait for finish</li>
                        <li>Click fluent.apk</li>
                        <li>Done!</li>
                    </ol>
                </div>
            </section>
        </Layout>
      )
  }
}

export default Download