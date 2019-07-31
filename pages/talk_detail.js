import { Component } from 'react'
import Layout from '../components/layout';
import sessionManager from '../utils/session'
import Router from 'next/router'
import Axios from 'axios';
import SessionManager from '../utils/session';

class TalkDetail extends Component {
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

        this.state = { user: '', clarity: '', pacing: '', pronunciation: '', note: '', nbspPadding: 31}
    }

    //The code below will be used once the backend side is implemented

  //   async getTalkDetails() {
  //     this.setState({ error: '' })
  //     const url = 'https://api.fluent.id/talk/details/'
  //     this.setState({ loading: "is-loading" })
  //     try {
  //       const userID = sessionManager.getUserId()
  //       const response = await Axios.post(url, {
  //         "user_id": userID,
  //         "talk_id": "talk_id",
  //       })
  //       this.setState({data: response.data})
  //     } catch (error) {
  //       console.error(
  //         'You have an error in your code or there are Network issues.',
  //         error
  //       )
  //       this.setState({ error: error.message })
  //     }
  //     this.setState({ loading: "" })
  // }

  // componentWillMount() {
  //     this.getTalkDetails()
  // }

    componentDidMount() {
      document.querySelector("body").classList.add("has-navbar-fixed-top")
    }

    render() {
        return (
            <Layout loggedIn={this.state.loggedIn} username={this.state.username}>
              <link type="text/css" rel="stylesheet" href="static/style.css"/>
              <br></br>
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <img src="static/asset/icon/user.svg"/>
                  <br></br>

                  <h1 className="title" style={{'text-align': 'center'}}>Score Speaking Skills</h1>
                  <form onSubmit={this.handleSubmit}>
                    <div className="field is-horizontal">
                      <div className="field-label">
                        <label className="label" style={{width: '100px', position: 'relative', top:'6px', 'text-align':'left'}}>Clarity</label>
                      </div>
                      <div className="control">
                        <div className="select is-fullwidth" name="clarity">
                          <select className="is-fullwidth" disabled>
                            <option value="0" disabled selected>Select a rating{'\xa0'.repeat(this.state.nbspPadding)}</option>
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
                        <label className="label" style={{width: '100px', position: 'relative', top:'6px', 'text-align':'left'}}>Pacing</label>
                      </div>
                      <div className="control">
                        <div className="select is-fullwidth" name="pacing">
                          <select style={{'white-space': 'pre'}} disabled>
                            <option value="0" disabled selected>Select a rating{'\xa0'.repeat(this.state.nbspPadding)}</option>
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
                        <label className="label" style={{width: '100px', position: 'relative', top:'6px', 'text-align':'left'}}>Pronunciation</label>
                      </div>
                      <div className="control" className="is-fullwidth">
                        <div className="select is-fullwidth" name="pronunciation">
                          <select disabled>
                            <option value="0" disabled selected>Select a rating{'\xa0'.repeat(this.state.nbspPadding)}</option>
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
                      <div className="field" style={{width: '100%'}}>
                      <label className="label" style={{width: '100px', position: 'relative', top:'6px', 'text-align':'left'}}>Feedback</label>
                        <div className="control" style={{width: '100%'}}>
                          <p>You did well!!</p>
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

export default TalkDetail