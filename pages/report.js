import { Component } from 'react'
import Layout from '../components/layout';
import sessionManager from '../utils/session'
import Router from 'next/router'
import Axios from 'axios';
import SessionManager from '../utils/session';

class Report extends Component {
    constructor(props) {
        super(props)
        if (sessionManager.isLoggedIn()) {
          var username = sessionManager.getUsername()
          var userId = sessionManager.getUserId()
          var token = sessionManager.getToken()
          var loggedIn = true
        } else {
          var username = sessionManager.getUsername()
          var userId = sessionManager.getUserId()
          var token = sessionManager.getToken()
          var loggedIn = false
        }

        this.state = { user: '', reason: '', note: '', talk_id: '', loggedIn: loggedIn, username: username, userId: userId, token: token}
        this.handleComment = this.handleComment.bind(this)
        this.handleReason = this.handleReason.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        
    }

    handleComment (event) {
      this.setState({ note: event.target.value })
    }

    handleReason (event) {
      this.setState({ reason: event.target.value })
    }

    componentDidMount() {
      document.querySelector("body").classList.add("has-navbar-fixed-top")
    }

    async handleSubmit (event) {
        event.preventDefault()
        this.setState({ error: '' })
        const reason = this.state.reason
        const note = this.state.note
        const url = `https://api.fluent.id/reports/`
        this.setState({ loading: "is-loading" })
    
        try {
          const otherId = sessionManager.getOtherId()
          const talkId = sessionManager.getTalkId()
          console.log({otherId,talkId})

          const response = await Axios.post(url, {
            "user": otherId,
            "reason": reason,
            "note": note,
            "talk_id": talkId
          })
          if (response.data.id != 0) {
            console.log('Success')
            SessionManager.endReview()
            Router.push('/')
          } else {
            console.log('Login failed.')
            let error = new Error(response.data.message)
            error.response = response
            throw error
          }
        } catch (error) {
          console.error(
            'You have an error in your code or there are Network issues.',
            error
          )
          this.setState({ error: error.message })
        }
    
        this.setState({ loading: "" })
      }

    render() {
        return (
            <Layout loggedIn={this.state.loggedIn} username={this.state.username} showFooter={false}>
              <link type="text/css" rel="stylesheet" href="static/style.css"/>
              <br></br>
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <img src="static/asset/icon/user.svg"/>
                  <br></br>
                  <h1 className="title">Report</h1>
                  <form onSubmit={this.handleSubmit}>
                    <div class="field is-horizontal">
                      <div class="field-label">
                        <label class="label" style={{width: '100px', position: 'relative', top:'6px'}}>Reason</label>
                      </div>
                      <div class="control">
                        <div class="select" name="reason">
                          <select onChange={this.handleReason}>
                            <option value="0">Please Select Reason</option>
                            <option value="No English">Partner didn't speak English</option>
                            <option value="Innapropriate">Partner didn't speak Appropriately</option>
                            <option value="No Speak">Partner didn't speak</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>
                      </div>

                    <div class="field is-horizontal">
                      <div class="field" style={{width: '100px'}}>
                        <div class="control" style={{maxWidth: '500px', width: '60vw'}}>
                          <textarea class="textarea" placeholder="Explain your reasoning" onChange={this.handleComment}></textarea>
                        </div>
                      </div>
                    </div>
                    <div class="field is-grouped">
                      <p class="control">
                        <button class="button is-primary">
                          Send Report
                        </button>
                      </p>
                    </div>
                    <br></br>
                  </form>
              </div>
            </Layout>
        );
    }
}

export default Report