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
            console.log('Success Bitch')
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
                <br></br>

                <form onSubmit={this.handleSubmit}>

                <div class="field is-horizontal">
                  <div class="field-label">
                    <label class="label">Clarity</label>
                  </div>
                  <div class="field-body">
                    <div class="field is-narrow">
                      <div class="control">
                        <label class="radio">
                          <input type="radio" name="clarity" value="1" onChange={this.handleClarity}/>
                          1
                        </label>
                        <label class="radio">
                          <input type="radio" name="clarity" value="2" onChange={this.handleClarity}/>
                          2
                        </label>
                        <label class="radio">
                          <input type="radio" name="clarity" value="3" onChange={this.handleClarity}/>
                          3
                        </label>
                        <label class="radio">
                          <input type="radio" name="clarity" value="4" onChange={this.handleClarity}/>
                          4
                        </label>
                        <label class="radio">
                          <input type="radio" name="clarity" value="5" onChange={this.handleClarity}/>
                          5
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="field is-horizontal">
                  <div class="field-label">
                    <label class="label">Pacing</label>
                  </div>
                  <div class="field-body">
                    <div class="field is-narrow">
                      <div class="control">
                        <label class="radio">
                          <input type="radio" name="pacing" value="1" onChange={this.handlePacing}/>
                          1
                        </label>
                        <label class="radio">
                          <input type="radio" name="pacing" value="2" onChange={this.handlePacing}/>
                          2
                        </label>
                        <label class="radio">
                          <input type="radio" name="pacing" value="3" onChange={this.handlePacing}/>
                          3
                        </label>
                        <label class="radio">
                          <input type="radio" name="pacing" value="4" onChange={this.handlePacing}/>
                          4
                        </label>
                        <label class="radio">
                          <input type="radio" name="pacing" value="5" onChange={this.handlePacing}/>
                          5
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="field is-horizontal">
                  <div class="field-label">
                    <label class="label">Pronounciation</label>
                  </div>
                  <div class="field-body">
                    <div class="field is-narrow">
                      <div class="control">
                        <label class="radio">
                          <input type="radio" name="pronounciation" value="1" onChange={this.handlePronounciation}/>
                          1
                        </label>
                        <label class="radio">
                          <input type="radio" name="pronounciation" value="2" onChange={this.handlePronounciation}/>
                          2
                        </label>
                        <label class="radio">
                          <input type="radio" name="pronounciation" value="3" onChange={this.handlePronounciation}/>
                          3
                        </label>
                        <label class="radio">
                          <input type="radio" name="pronounciation" value="4" onChange={this.handlePronounciation}/>
                          4
                        </label>
                        <label class="radio">
                          <input type="radio" name="pronounciation" value="5" onChange={this.handlePronounciation}/>
                          5
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="field is-horizontal">
                  <div class="field-label is-normal">
                    <label class="label">Feedback</label>
                  </div>
                  <div class="field-body">
                    <div class="field">
                      <div class="control">
                        <textarea class="textarea" placeholder="Explain how did your partner perform" onChange={this.handleFeedback}></textarea>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="field is-horizontal">
                  <div class="field-label">
                </div>
                  <div class="field-body">
                    <div class="field">
                      <div class="control">
                        <button class="button is-primary">
                          Submit Review
                        </button>
                      </div>
                    </div>
                    <div class="field is-grouped is-grouped-right">
                     <p class="control">
                       <a class="button is-light">
                         Report
                       </a>
                     </p>
                    </div>
                  </div>
                </div>

                </form>




            </Layout>
        );
    }
}

export default Review