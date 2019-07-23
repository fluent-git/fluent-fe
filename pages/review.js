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

                <link type="text/css" rel="stylesheet" href="static/style.css" />

                <br></br>

                <form onSubmit={this.handleSubmit}>

                <div class="field is-horizontal">
                  <div class="field-label">
                    <label class="label">Clarity</label>
                  </div>
                  <div class="field-body">
                    <div class="field is-narrow">
                      
                    <div class="rate">
                      <input type="radio" id="star5" name="clarity" value="5" onChange={this.handleClarity}/>
                      <label for="star5" title="text">5 stars</label>
                      <input type="radio" id="star4" name="clarity" value="4" onChange={this.handleClarity}/>
                      <label for="star4" title="text">4 stars</label>
                      <input type="radio" id="star3" name="clarity" value="3" onChange={this.handleClarity}/>
                      <label for="star3" title="text">3 stars</label>
                      <input type="radio" id="star2" name="clarity" value="2" onChange={this.handleClarity}/>
                      <label for="star2" title="text">2 stars</label>
                      <input type="radio" id="star1" name="clarity" value="1" onChange={this.handleClarity}/>
                      <label for="star1" title="text">1 star</label>
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

                    <div class="rate">
                      <input type="radio" id="star10" name="pacing" value="5" onChange={this.handlePacing}/>
                      <label for="star10" title="text">5 stars</label>
                      <input type="radio" id="star9" name="pacing" value="4" onChange={this.handlePacing}/>
                      <label for="star9" title="text">4 stars</label>
                      <input type="radio" id="star8" name="pacing" value="3" onChange={this.handlePacing}/>
                      <label for="star8" title="text">3 stars</label>
                      <input type="radio" id="star7" name="pacing" value="2" onChange={this.handlePacing}/>
                      <label for="star7" title="text">2 stars</label>
                      <input type="radio" id="star6" name="pacing" value="1" onChange={this.handlePacing}/>
                      <label for="star6" title="text">1 star</label>
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
                      
                    <div class="rate">
                      <input type="radio" id="star15" name="pronounciation" value="5" onChange={this.handlePronounciation}/>
                      <label for="star15" title="text">5 stars</label>
                      <input type="radio" id="star14" name="pronounciation" value="4" onChange={this.handlePronounciation}/>
                      <label for="star14" title="text">4 stars</label>
                      <input type="radio" id="star13" name="pronounciation" value="3" onChange={this.handlePronounciation}/>
                      <label for="star13" title="text">3 stars</label>
                      <input type="radio" id="star12" name="pronounciation" value="2" onChange={this.handlePronounciation}/>
                      <label for="star12" title="text">2 stars</label>
                      <input type="radio" id="star11" name="pronounciation" value="1" onChange={this.handlePronounciation}/>
                      <label for="star11" title="text">1 star</label>
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