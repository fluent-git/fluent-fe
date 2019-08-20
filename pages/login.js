import { Component } from 'react'
import Layout from '../components/layout'
import { login } from '../utils/auth'
import Axios from 'axios';
import sessionManager from '../utils/session'
import Router from 'next/router'

class Login extends Component {
  constructor (props) {
    super(props)

    if (sessionManager.isLoggedIn()) {
      Router.push('/')
    }

    this.state = { username: '', password: '', error: '', loading: '', loggedIn: false }
    this.handleUsername = this.handleUsername.bind(this)
    this.handlePassword = this.handlePassword.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleUsername (event) {
    this.setState({ username: event.target.value })
  }

  handlePassword (event) {
    this.setState({ password: event.target.value })
  }

  async handleSubmit (event) {
    event.preventDefault()
    this.setState({ error: '' })
    const username = this.state.username
    const password = this.state.password
    const url = `https://api.fluent.id/login/`
    this.setState({ loading: "is-loading" })

    try {
      const response = await Axios.post(url, {
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
      <Layout loggedIn={this.state.loggedIn} username={this.state.username} showFooter={true}>
        <section className="section">
            <div className="container">
                <div className="columns">
                    <div className="column auto">
                    </div>
                    <div className="column is-three-quarters">
                        <div className="box">
                            <div className="tile is-ancestor">
                                <div className="tile is-vertical">
                                    <div className="tile">
                                        <div className="tile is-parent is-vertical">
                                            <article className="tile is-child notification is-primary">
                                                <p className="title">Learn English Conversation for free.</p>
                                                <p className="subtitle">A fun conversation learning app that lets you make friends as you learn English!</p>
                                            </article>
                                        </div>
                                        <div className="tile is-parent">
                                            <article className="tile is-child is-info">
                                                <p className="title">Sign In</p>
                                                <p className="subtitle">Fill in your details</p>
                                                <p className={`has-text-danger error ${this.state.error && 'show'}`}>
                                                    <small>{this.state.error && `Error: ${this.state.error}`}</small>
                                                </p>
                                                <form onSubmit={this.handleSubmit}>
                                                    <div className="field">
                                                        <label className="label">Username</label>
                                                        <div className="control">
                                                            <input className="input" type="text" placeholder="Username" onChange={this.handleUsername}/>
                                                        </div>
                                                    </div>

                                                    <div className="field">
                                                        <label className="label">Password</label>
                                                        <div className="control">
                                                            <input className="input" type="password" placeholder="Password" onChange={this.handlePassword}/>
                                                        </div>
                                                    </div>
                                                    <p style={{color: 'black', marginBottom: 10}}>New to Fluent? <b><a href="/register">Create an account</a></b> to get started today.</p>
                                                    <div className="field is-grouped">
                                                        <div className="control">
                                                            <button className={`button is-primary ${this.state.loading}`} type="submit">Submit</button>
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

export default Login