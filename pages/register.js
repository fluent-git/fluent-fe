import Layout from '../components/layout'
import { Component } from 'react'
import Axios from 'axios';
import sessionManager from '../utils/session'
import Router from 'next/router'

class Register extends Component {
    constructor (props) {
      super(props)
  
      if (sessionManager.isLoggedIn()) {
        Router.push('/')
      }
  
      this.state = { username: '', email: '', password: '', error: '', loading: '', loggedIn: false }
      this.handleUsername = this.handleUsername.bind(this)
      this.handlePassword = this.handlePassword.bind(this)
      this.handleEmail = this.handleEmail.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
    }
  
    handleUsername (event) {
      this.setState({ username: event.target.value })
    }

    handleEmail (event) {
        this.setState({ email: event.target.value })
      }
  
    handlePassword (event) {
      this.setState({ password: event.target.value })
    }
  
    async handleSubmit (event) {
      event.preventDefault()
      this.setState({ error: '' })
      const username = this.state.username
      const email = this.state.email
      const password = this.state.password
      console.log({email,username,password})
      const url = `https://api.fluent.id/users/`
      this.setState({ loading: "is-loading" })
  
      const obj = {
        "email": email, 
        "username": username,
        "password": password
      }
      console.log(obj)
      try {
        const response = await Axios.post(url, obj)
        // TODO: Implement real token from backend once implemented in backend
        const token = "abc"   // Dummy token
        const username = response.data.username
        const userId = response.data.user.id
        sessionManager.signIn(username, userId, token)
      } catch (error) {
        console.error(
          'You have an error in your code or there are Network issues.',
          error
        )
        this.setState({ error: error.message })
      }
  
      this.setState({ loading: "" })
    }
  
    render () {
      return (
        <Layout loggedIn={this.state.loggedIn} username={this.state.username}>
            <section className="section">
                <div className="container">
                    <div className="columns">
                        <div className="column auto">
                        </div>
                        <div className="column is-three-quarters">
                            <div className="box">
                                <div class="tile is-ancestor">
                                    <div class="tile is-vertical">
                                        <div class="tile">
                                            <div class="tile is-parent is-vertical">
                                                <article class="tile is-child notification is-primary">
                                                    <p class="title">Welcome to Fluent!</p>
                                                    <p class="subtitle">Where you can improve your english easily and without hassle.</p>
                                                </article>
                                            </div>
                                            <div class="tile is-parent">
                                                <article class="tile is-child is-info">

                                                    <p class="title">Sign Up</p>
                                                    <p class="subtitle">Fill in your details</p>

                                                    <form onSubmit={this.handleSubmit}>
                                                        <div class="field">
                                                            <label class="label">Username</label>
                                                            <div class="control">
                                                                <input class="input" type="username" placeholder="Username"  onChange={this.handleUsername}/>
                                                            </div>
                                                        </div>

                                                        <div class="field">
                                                            <label class="label">Email</label>
                                                            <div class="control">
                                                                <input class="input" type="email" placeholder="Email"  onChange={this.handleEmail}/>
                                                            </div>
                                                        </div>

                                                        <div className="field">
                                                            <label className="label">Password</label>
                                                            <div className="control">
                                                                <input className="input" type="password" placeholder="Password" onChange={this.handlePassword}/>
                                                            </div>
                                                        </div>

                                                        <div class="field is-grouped">
                                                            <div class="control">
                                                            <button className={`button ${this.state.loading}`} type="submit">Submit</button>
                                                            </div>
                                                        </div>
                                                    </form>

                                                </article>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="column auto">
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
      )
    }
}
  
export default Register