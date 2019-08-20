import { Component } from 'react'
import Layout from '../components/layout';
import sessionManager from '../utils/session'
import Axios from 'axios';
import Router from 'next/router'

class Profile extends Component {
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
        this.getUserProfile = this.getUserProfile.bind(this)
        this.handleTalkDetail = this.handleTalkDetail.bind(this)
    }

    async getUserProfile() {
        this.setState({ error: '' })
        const url = 'https://api.fluent.id/talk/recent_talk/'
        this.setState({ loading: "is-loading" })
        try {
          const userID = sessionManager.getUserId()
          const response = await Axios.post(url, {
            "user_id": userID,
          })
          this.setState({data: response.data})
        } catch (error) {
          console.error(
            'You have an error in your code or there are Network issues.',
            error
          )
          this.setState({ error: error.message })
        }
        this.setState({ loading: "" })
    }

    handleTalkDetail (event) {
        const talkId = event.target.value
        console.log(talkId)
        sessionManager.talkDetails(talkId)
        Router.push('/talk_detail')
      }

    componentWillMount() {
        this.getUserProfile()
    }

    componentDidMount() {
        document.querySelector("body").classList.add("has-navbar-fixed-top")
      }

    render() {
        const username = sessionManager.getUsername()
        var titleName = <h1 className="title">{username}</h1>;
        return (
            <Layout loggedIn={this.state.loggedIn} username={this.state.username} showFooter={true}>
                <br style={{lineHeight: '50px'}}></br>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <img src="static/asset/icon/user.svg"/>
                    <br></br>
                    {titleName}
                    <br></br>
                    <h1 className="title">Talk History</h1>
                    <div className="card-box table-responsive">
                        <table id="datatable" className="table table-striped is-striped table-bordered" width="100%">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Topic</th>
                                    <th>Duration</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.data.map((talkList) => {
                                    const { id, start_time, topic, duration } = talkList
                                    const callDate = start_time.substring(0, 10)
                                    const callTime = start_time.substring(11, 16)
                                    var date = new Date(null);
                                    date.setSeconds(duration); // specify value for SECONDS here
                                    var timeString = date.toISOString().substr(11, 8);
                                    return (
                                        <tr key={id}>
                                            <td>{callDate}</td>
                                            <td>{callTime}</td>
                                            <td>{topic}</td>
                                            <td>{timeString}</td>
                                            <td>
                                             <button className="button is-primary" value={id} onClick={this.handleTalkDetail}>Details</button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <br></br>
                </div>
            </Layout>  
        );
    }
}

export default Profile