import { Component } from 'react'
import Layout from '../components/layout';
import sessionManager from '../utils/session'
import Router from 'next/router'
import Axios from 'axios';
import SessionManager from '../utils/session';

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

        this.state = { user: '', clarity: '', pacing: '', pronunciation: '', note: ''}
        this.handleFeedback = this.handleFeedback.bind(this)
        this.handleClarity = this.handleClarity.bind(this)
        this.handlePacing = this.handlePacing.bind(this)
        this.handlePronunciation = this.handlePronunciation.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleReport = this.handleReport.bind(this)
        
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

    handlePronunciation (event) {
      this.setState({pronunciation: event.target.value})
    }

    handleReport (event) {
      Router.push('/report')
    }

    async handleSubmit (event) {
        event.preventDefault()
        this.setState({ error: '' })
        const clarity = this.state.clarity
        const pacing = this.state.pacing
        const pronunciation = this.state.pronunciation
        const note = this.state.note
        const url = `https://api.fluent.id/reviews/`
        this.setState({ loading: "is-loading" })

        try {
          const otherId = sessionManager.getOtherId()
          const talkId = sessionManager.getTalkId()
          console.log({otherId,talkId})

          const response = await Axios.post(url, {
            "user": otherId,
            "clarity": clarity,
            "pacing": pacing,
            "pronunciation": pronunciation,
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
            <Layout loggedIn={this.state.loggedIn} username={this.state.username}>
              <link type="text/css" rel="stylesheet" href="static/style.css"/>
              <br></br>
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <img src="static/asset/icon/user.svg"/>
                  <br></br>
                  <h1 className="title">Please review your conversation partner!</h1>
                  <form onSubmit={this.handleSubmit}>
                    <div className="field is-horizontal">
                      <div className="field-label">
                        <label className="label" style={{width: '100px', position: 'relative', top:'6px'}}>Clarity</label>
                      </div>
                      <div className="control">
                        <div className="select" name="clarity">
                          <select onChange={this.handleClarity}>
                            <option value="0" disabled selected>Select a rating</option>
                            <option value="1">Difficult to understand</option>
                            <option value="2">Unnatural speech, no intonation</option>
                            <option value="3">Speech is good overall</option>
                            <option value="4">Speech is very clear with intonation</option>
                            <option value="5">Speech is natural and effective</option>
                          </select>
                        </div>
                      </div>
                      </div>
                    <div className="field is-horizontal">
                      <div className="field-label">
                        <label className="label" style={{width: '100px', position: 'relative', top:'6px'}}>Pacing</label>
                      </div>
                      <div className="control">
                        <div className="select is-fullwidth" name="pacing">
                          <select onChange={this.handlePacing}>
                            <option value="0" disabled selected>Select a rating</option>
                            <option value="1">Lots of stops or pauses</option>
                            <option value="2">Too slow</option>
                            <option value="3">Speed is good</option>
                            <option value="4">Too fast</option>
                            <option value="5">Words are slurred</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="field is-horizontal">
                      <div className="field-label">
                        <label className="label" style={{width: '100px', position: 'relative', top:'6px'}}>Pronunciation</label>
                      </div>
                      <div className="control">
                        <div className="select" name="pronunciation">
                          <select onChange={this.handlePronunciation}>
                            <option value="0" disabled selected>Select a rating</option>
                            <option value="1">Has difficulty pronouncing words</option>
                            <option value="2">Some words are mispronounced</option>
                            <option value="3">Correctly pronounces most words</option>
                            <option value="4">Almost no pronunciation mistakes</option>
                            <option value="5">Near-native pronunciation</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="field is-horizontal">
                      <div className="field" style={{width: '100px'}}>
                        <div className="control" style={{maxWidth: '300px', width: '60vw'}}>
                          <textarea className="textarea" placeholder="Explain how did your partner perform" onChange={this.handleFeedback}></textarea>
                        </div>
                      </div>
                    </div>
                    <div className="field is-horizontal">
                      <div className="field-label">
                    </div>
                      <div className="field-body">
                        <div className="field is-grouped">
                          <p className="control">
                            <button className="button is-primary">
                              Submit
                            </button>
                          </p>
                          <p className="control">
                            <a className="button is-light" onClick={this.handleReport}>Report</a>
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