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
        sessionManager.signIn(username, token)
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
                            <div className="tile is-ancestor">
                                <div className="tile is-vertical">
                                    <div className="tile">
                                        <div className="tile is-parent is-vertical">
                                            <article className="tile is-child notification is-primary">
                                                <p className="title">Welcome to Fluent!</p>
                                                <p className="subtitle">Where you can improve your english easily and without hassle.</p>
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

                                                    <div className="field is-grouped">
                                                        <div className="control">
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

export default Login