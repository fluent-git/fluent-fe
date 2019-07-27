import { Component } from 'react'
import Layout from '../components/layout';
import sessionManager from '../utils/session'
import Axios from 'axios';

class Profile extends Component {
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

        this.getUserProfile = this.getUserProfile.bind(this)
    }

    async getUserProfile(event) {
        // var url = 'https://api.fluent.id/profiles/'
        // var urlAccess = url.concat(this.userId)
        console.log("CLICKED")
        const response = await Axios.get('https://api.fluent.id/profiles/1')
        console.log(response)
        return { response }
      }

    render() {
        return (
            <Layout loggedIn={this.state.loggedIn} username={this.state.username}>
                <br></br>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <img src="static/asset/icon/user.svg"/>
                    <br></br>
                    <h1 className="title">Talk History</h1>
                    <br></br>
                    <div class="card-box table-responsive">
                        <table id="datatable" class="table table-striped table-bordered" width="100%">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Topic</th>
                                    <th>Duration</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colspan="6" class="dataTables_empty">No History</td>
                                </tr>
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