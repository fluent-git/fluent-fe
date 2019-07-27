import Head from 'next/head'
import Link from 'next/link'
import '../styles/styles.sass'
import sessionManager from '../utils/session'
import Router from 'next/router'

const toggleStyles = (event) => {
  document.querySelector('#burger').classList.toggle('is-active')
  document.querySelector('#navbarmenu').classList.toggle('is-active')
}

const Layout = props => (
  <div>
    <Head>
      <title>Fluent</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
    </Head>
    <header>
      <nav className="navbar has-shadow is-spaced" role="navigation" aria-label="main navigation">
        <div className="container">
          <div className="navbar-brand">
            <a className="navbar-item">
              <Link prefetch href="/">
                <img src="/static/asset/logo/logo.svg"/>
              </Link>
            </a>
            <a id="burger" onClick={toggleStyles} 
                role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarmenu">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>
            {props.loggedIn ? (
              <ProfileButton username={props.username}></ProfileButton>
            ) : (<LoginButton></LoginButton>)}
        </div>
      </nav>
    </header>
    {props.children}
    <footer className="footer">
      <div className="content has-text-centered">
        <span>Copyright 2019 Fluent</span>
      </div>
    </footer>
  </div>
)

const ProfileButton = props => (
  <div id="navbarmenu" className="navbar-menu">
    <div className="navbar-start">
    </div>
    <div className="navbar-end">
      <Link prefetch href="/contact">
        <a className="navbar-item">Contact Us</a>
      </Link>
      <div className="navbar-item has-dropdown is-hoverable">
        <a className="navbar-link is-primary is-link">
          {props.username}
        </a>
        <div className="navbar-dropdown">
          <Link prefetch href="/profile">
            <a className="navbar-item">
              Profile
            </a>
          </Link>
          <hr className="navbar-divider"/>
          <a className="navbar-item" onClick={sessionManager.signOut}>
            Sign Out
          </a>
        </div>
      </div>
    </div>
  </div>
)

const LoginButton = props => (

  <div id="navbarmenu" className="navbar-menu">
    <div className="navbar-start">
    </div>
    <div className="navbar-end">
      <Link prefetch href="/">
        <a className="navbar-item">Home</a>
      </Link>
      <Link prefetch href="/contact">
        <a className="navbar-item">Contact Us</a>
      </Link>
      <div className="navbar-item">
        <div className="buttons">
          <Link prefetch href="/login">
            <a className="button">Sign In</a>
            </Link>
        </div>
      </div>

      <div className="navbar-item">
        <div className="buttons">
          <Link prefetch href="/register">
            <a className="button is-link">Register</a>
          </Link>
        </div>
      </div>
    </div>
  </div>
)

export default Layout