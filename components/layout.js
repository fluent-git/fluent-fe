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
      <link href="/static/asset/logo/favicon.png" rel="icon" type="image/png" />
      <title>Fluent</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
      <nav className="navbar is-spaced is-primary navbar is-fixed-top" role="navigation" aria-label="main navigation">
        <div className="container" style={{ maxWidth: "none", margin: "none", paddingRight: '18px' }}>
          <div className="navbar-brand">
            <a className="navbar-item">
              <Link prefetch href="/">
                <img src="/static/asset/logo/logo-white.svg" />
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
    {props.showFooter? (
      <Footer></Footer>
    ): null }
  </div>
)

const Footer = props => (
  <footer className="footer">
    <div className="content has-text-centered">
      <span>Made with 💜in Jakarta, Indonesia</span>
      <br></br>
      <span>Copyright 2019 Fluent | <a href="https://docs.google.com/forms/d/1dcf3KYo46Pzlkoyyi4INPxqBRwEupNqTxrCbl9VSsg4" target="_blank">bit.ly/fluent-feedback</a></span>
      <span><p style={{color: 'black', marginBottom: 10}}><b><a href="/terms_conditions">Terms & Conditions</a></b></p></span>
    </div>
  </footer>
)

const ProfileButton = props => (
  <div id="navbarmenu" className="navbar-menu">
    <div className="navbar-start">
    </div>
    <div className="navbar-end">
      <div className="navbar-item has-dropdown is-hoverable" id="navbar-dropdown">
        <a className="navbar-link is-primary is-link">
          Hi, {props.username}!
        </a>
        <div className="navbar-dropdown">
          <Link prefetch href="/profile">
            <a className="navbar-item">
              Profile
            </a>
          </Link>
          <hr className="navbar-divider" />
          <Link prefetch href="/contact">
            <a className="navbar-item">Contact Us</a>
          </Link>
          <Link prefetch href="/download">
            <a className="navbar-item">Download</a>
          </Link>
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
      <Link prefetch href="/download">
        <a className="navbar-item">Download</a>
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
            <a className="button is-primary">Register</a>
          </Link>
        </div>
      </div>
    </div>
  </div>
)

export default Layout
