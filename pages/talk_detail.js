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
            this.state = { loggedIn: true, username: username, userId: userId, token: token, data: [] }
        } else {
            var username = sessionManager.getUsername()
            var userId = sessionManager.getUserId()
            var token = sessionManager.getToken()
            this.state = { loggedIn: false, username: "", userId: 0, token: "", data: [] }
        }

        this.state = { clarity: '', pacing: '', pronunciation: '', note: '', nbspPadding: 31, topic: '', duration: 0, time: ''}
    }

    async getTalkDetails() {
      this.setState({ error: '' })
      const url = 'https://api.fluent.id/talk/talk_detail/'
      this.setState({ loading: "is-loading" })
      try {
        const userID = sessionManager.getUserId()
        const talkID = sessionManager.getTalkId()
        const response = await Axios.post(url, {
          "user_id": userID,
          "talk_id": talkID,
        })
        const datas = response.data
        this.setState({ clarity: datas.clarity, 
                       pacing: datas.pacing, 
                       pronunciation: datas.pronunciation, 
                       note: datas.note, 
                       topic: datas.talk_id.topic, 
                       duration: datas.talk_id.duration,
                       time: datas.talk_id.start_time
                       })
      } catch (error) {
        console.error(
          'You have an error in your code or there are Network issues.',
          error
        )
        this.setState({ error: error.message })
      }
      this.setState({ loading: "" })
  }

  componentWillMount() {
      this.getTalkDetails()
  }

  componentDidMount() {
    document.querySelector("body").classList.add("has-navbar-fixed-top")
  }

    render() {
      const clarityOption = ["Difficult to understand", 
                  "Unnatural speech, no intonation", 
                  "Speech is good overall",
                  "Speech is very clear with intonation",
                  "Speech is natural and effective"
                ];
      const pacingOption = ["Lots of stops or pauses", 
                "Too slow", 
                "Speed is good",
                "Too fast",
                "Words are slurred"
              ];
      const pronunciationOption = ["Has difficulty pronouncing words", 
                  "Some words are mispronounced", 
                  "Correctly pronounces most words",
                  "Almost no pronunciation mistakes",
                  "Near-native pronunciation"
                ];

      let getFeedback
      const feedback = this.state.note;
      if (feedback == "") {
        getFeedback = <p>Your Partner Did Not Leave Any Notes</p>;
      } else {
        getFeedback = <p>{feedback}</p>;
      }

      const clarityNote = clarityOption[this.state.clarity-1];
      var showClarity = <option selected>{clarityNote}</option>;

      const pacingNote = pacingOption[this.state.pacing-1];
      var showPacing = <option selected>{pacingNote}</option>;

      const pronunciationNote = pronunciationOption[this.state.pronunciation-1];
      var showPronounciation = <option selected>{pronunciationNote}</option>;

      const callDate = this.state.time.substring(0, 10)
      const callTime = this.state.time.substring(11, 16)
      var date = new Date(null);
      date.setSeconds(this.state.duration); // specify value for SECONDS here
      var timeString = date.toISOString().substr(11, 8);

      var showDetails = <div>
                      <p>{callDate} &nbsp; {callTime} {"\n"}</p> 
                      <p>  Topic: {this.state.topic} {"\n"}</p>
                      <p>  Duration: {timeString}</p></div>

        return (
            <Layout loggedIn={this.state.loggedIn} username={this.state.username}>
              <link type="text/css" rel="stylesheet" href="static/style.css"/>
              <br></br>
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <img src="static/asset/icon/user.svg"/>
                  <br></br>
                  <h1 className="title" style={{'textAlign': 'center'}}>Score Speaking Skills</h1>
                  {showDetails}
                  <br></br>
                  <form onSubmit={this.handleSubmit}>
                    <div className="field is-horizontal">
                      <div className="field-label">
                        <label className="label" style={{width: '100px', position: 'relative', top:'6px', 'text-align':'left'}}>Clarity</label>
                      </div>
                      <div className="control">
                        <div className="select is-fullwidth" name="clarity">
                          <select className="is-fullwidth" disabled>
                            {showClarity}
                          </select>
                        </div>
                      </div>
                      </div>
                    <div className="field is-horizontal">
                      <div className="field-label">
                        <label className="label" style={{width: '100px', position: 'relative', top:'6px', 'textAlign':'left'}}>Pacing</label>
                      </div>
                      <div className="control">
                        <div className="select is-fullwidth" name="pacing">
                          <select style={{'white-space': 'pre'}} disabled>
                            {showPacing}
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
                            {showPronounciation}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="field is-horizontal">
                      <div className="field" style={{width: '100%'}}>
                      <label className="label" style={{width: '100px', position: 'relative', top:'6px', 'text-align':'left'}}>Feedback</label>
                        <div className="control" style={{width: '100%'}}>
                          {getFeedback}
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