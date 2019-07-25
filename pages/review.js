import { Component } from 'react'
import Layout from '../components/layout';
import sessionManager from '../utils/session'
import Router from 'next/router'
import Axios from 'axios';

class Review extends Component {
    constructor(props) {
        super(props)
        if (sessionManager.isLoggedIn()) {
            var username = sessionManager.getUsername()
            var userId = sessionManager.getUserId()
            var token = sessionManager.getToken()
        } else {
            var username = sessionManager.getUsername()
            var userId = sessionManager.getUserId()
            var token = sessionManager.getToken()
        }

        this.state = { user: '', clarity: '', pacing: '', pronounciation: '', note: ''}
        this.handleFeedback = this.handleFeedback.bind(this)
        this.handleClarity = this.handleClarity.bind(this)
        this.handlePacing = this.handlePacing.bind(this)
        this.handlePronounciation = this.handlePronounciation.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        
    }

    handleFeedback (event) {
      this.setState({ note: event.target.value })
    }

    handleClarity (event) {
      this.setState({clarity: event.target.value})
    }

    handlePacing (event) {
      this.setState({pacing: event.target.value})
    }

    handlePronounciation (event) {
      this.setState({pronounciation: event.target.value})
    }

    async handleSubmit (event) {
        event.preventDefault()
        this.setState({ error: '' })
        const clarity = this.state.clarity
        const pacing = this.state.pacing
        const pronounciation = this.state.pronounciation
        const note = this.state.note
        const url = `https://api.fluent.id/reviews/`
        this.setState({ loading: "is-loading" })
    
        try {
          const response = await Axios.post(url, {
            "user": 1,
            "clarity": clarity,
            "pacing": pacing,
            "pronunciation": pronounciation,
            "note": note,
            "talk_id": 1
          })
          if (response.data.id != 0) {
            console.log('Success')
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
            <Layout loggedIn={this.state.loggedIn} username={this.state.username}>
              <link type="text/css" rel="stylesheet" href="static/style.css"/>
              <br></br>
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <img src="static/asset/icon/user.svg"/>
                  <br></br>
                  <form onSubmit={this.handleSubmit}>
                    <div class="field is-horizontal">
                      <div class="field-label">
                        <label class="label" style={{width: '100px', position: 'relative', top:'6px'}}>Clarity</label>
                      </div>
                      <div class="control">
                        <div class="select" name="clarity">
                          <select onChange={this.handleClarity}>
                            <option value="0">Please Give Rating</option>
                            <option value="1">1 - Beginner</option>
                            <option value="2">2</option>
                            <option value="3">3 - Intermediate</option>
                            <option value="4">4</option>
                            <option value="5">5 - Expert</option>
                          </select>
                        </div>
                      </div>
                      </div>
                    <div class="field is-horizontal">
                      <div class="field-label">
                        <label class="label" style={{width: '100px', position: 'relative', top:'6px'}}>Pacing</label>
                      </div>
                      <div class="control">
                        <div class="select" name="pacing">
                          <select onChange={this.handlePacing}>
                            <option value="0">Please Give Rating</option>
                            <option value="1">1 - Beginner</option>
                            <option value="2">2</option>
                            <option value="3">3 - Intermediate</option>
                            <option value="4">4</option>
                            <option value="5">5 - Expert</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="field is-horizontal">
                      <div class="field-label">
                        <label class="label" style={{width: '100px', position: 'relative', top:'6px'}}>Pronounciation</label>
                      </div>
                      <div class="control">
                        <div class="select" name="pronounciation">
                          <select onChange={this.handlePronounciation}>
                            <option value="0">Please Give Rating</option>
                            <option value="1">1 - Beginner</option>
                            <option value="2">2</option>
                            <option value="3">3 - Intermediate</option>
                            <option value="4">4</option>
                            <option value="5">5 - Expert</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="field is-horizontal">
                      <div class="field" style={{width: '100px'}}>
                        <div class="control" style={{maxWidth: '300px', width: '60vw'}}>
                          <textarea class="textarea" placeholder="Explain how did your partner perform" onChange={this.handleFeedback}></textarea>
                        </div>
                      </div>
                    </div>
                    <div class="field is-horizontal">
                      <div class="field-label">
                    </div>
                      <div class="field-body">
                        <div class="field is-grouped">
                          <p class="control">
                            <button class="button is-primary">
                              Submit
                            </button>
                          </p>
                          <p class="control">
                            <a class="button is-light">
                              Report
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                    <br></br>
                  </form>
              </div>
            </Layout>
        );
    }
}

export default Review