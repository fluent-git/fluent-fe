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
  
      this.state = { username: '', email: '', password: '', level: 1, error: '', loading: '', loggedIn: false }
      this.handleUsername = this.handleUsername.bind(this)
      this.handlePassword = this.handlePassword.bind(this)
      this.handleEmail = this.handleEmail.bind(this)
      this.handleLevel = this.handleLevel.bind(this)
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

    handleLevel (event) {
      this.setState({ level: event.target.value })
    }
  
    async handleSubmit (event) {
      event.preventDefault()
      this.setState({ error: '' })
      const username = this.state.username
      const email = this.state.email
      const password = this.state.password
      const level = parseInt(this.state.level)
      const registerUrl = `https://api.fluent.id/register/`
      const loginUrl = `https://api.fluent.id/login/`
      this.setState({ loading: "is-loading" })
  
      const obj = {
        "email": email, 
        "username": username,
        "password": password,
        "level": level
      }
      console.log(obj)
      try {
        var response = await Axios.post(registerUrl, obj) //register
        
        response = await Axios.post(loginUrl, {
          "username": username,
          "password": password
        })
        if (response.data.message == 'OK') {
          const token = response.data.token
          const userId = response.data.user.id
          sessionManager.signIn(username, userId, token)
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

    componentDidMount() {
      document.querySelector("body").classList.add("has-navbar-fixed-top")
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
                                                  <p className="title">Learn English Conversation for free.</p>
                                                  <p className="subtitle">A fun conversation learning app that lets you make friends as you learn English!</p>
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

                                                        <div className="field">
                                                            <label className="label">Skill Level</label>
                                                            <div className="select is-fullwidth">
                                                              <select onChange={this.handleLevel}>
                                                                <option value="1">Beginner</option>
                                                                <option value="2">Intermediate</option>
                                                                <option value="3">Proficient</option>
                                                              </select>
                                                            </div>
                                                        </div>
                                                        <p style={{color: 'black', marginBottom: 10}}>By signing up you agree to the <b><a href="/terms_conditions">terms and conditions</a></b></p>
                                                        <div className="field is-grouped">
                                                            <div className="control">
                                                            <button className={`button is-primary ${this.state.loading}`} type="submit">Submit</button>
                                                            </div>
                                                        </div>
                                                        {/* <p style={{color: 'black', marginBottom: 10}}>Already have an account? <b><a href="/login">Sign In</a></b></p> */}
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