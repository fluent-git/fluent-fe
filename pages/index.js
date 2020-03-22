import { Component } from 'react'
import Link from 'next/link'
import Layout from '../components/layout'
import sessionManager from '../utils/session'
import Router from 'next/router'
import { initGA, logPageView } from '../utils/analytics'

class Home extends Component {
  componentDidMount() {
    if (!window.GA_INITIALIZED) {
      initGA()
      window.GA_INITIALIZED = true
    }
    logPageView()
    document.querySelector("body").classList.add("has-navbar-fixed-top")
  }

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
  }

  render() {
    var mainLink = "/login" // default link
    if (this.state.loggedIn) {
      mainLink = "/talk"
    }
    return (
      <Layout loggedIn={this.state.loggedIn} username={this.state.username} showFooter={true}>
        <section className="section first">
          <div className="container is-widescreen">
            <div className="tile is-ancestor fullsize">
              <div className="tile is-1"></div>
              <div className="tile is-3">
                <article className="tile is-child centered-title">
                  <div className="has-text-centered-mobile">
                    <p className="title is-size-1-desktop">WFH? Bored? Lonely at Home?</p>
                    <p className="subtitle">Talk with people online! Practice speaking english anonymously!</p>
                    <div className="buttons">
                      <Link prefetch href={mainLink}>
                        <a className="button is-primary" style={{
                          padding: '1.2rem .4rem 1.2rem .8rem'
                        }}>
                          Start Talking Now
                          <img src="/static/asset/icon/start_talking.png" style={{
                            height: "2rem",
                            marginLeft: '.2rem'
                          }} />
                        </a>
                      </Link>
                    </div>
                  </div>
                </article>
              </div>
              <div className="tile is-7">
                <article className="tile is-child">
                  <figure className="image is-5by4">
                    <img src="/static/asset/image/home.png" />
                  </figure>
                </article>
              </div>

              <div className="tile is-1"></div>
            </div>
          </div>
        </section>
        <div className="separator-curve">
          <img className="image-curve" src="/static/asset/image/curve.png" />
        </div>
        <section className="section pink">
          <div className="columns is-mobile is-centered window-top">
            <div className="column is-two-thirds-desktop has-text-centered">
              <p className="title is-size-2-desktop">
                Speaking English can be fun and easy!
              </p>
              <p className="subtitle light">
                Here's how 👇
              </p>
            </div>
          </div>
          <div className="tile is-ancestor fullsize">
            <div className="tile is-1"></div>

            <div className="tile is-5 is-parent">
              <article className="tile">
                <figure className="image">
                  <img src="/static/asset/image/talk-3d.png" />
                </figure>
              </article>
            </div>

            <div className="tile is-5 is-parent">
              <article className="tile centered">
                <div className="centered has-text-centered-mobile">
                  <p className="subtitle strong">Listen, share and express your opinions in English.</p>
                  <p className="subtitle">
                    Discuss your favorite topics with others who also want to improve their English.
                    By improving your English speaking abilities anonymously, there is no reason for you to fear anything!
                  </p>
                </div>
              </article>
            </div>

            <div className="tile is-1"></div>
          </div>

          <div className="tile is-ancestor fullsize">
            <div className="tile is-1"></div>

            <div className="tile is-5 is-parent">
              <article className="tile centered">
                <div className="centered has-text-centered-mobile">
                  <p className="subtitle strong">Choose a Topic, Start Talking!</p>
                  <p className="subtitle">Choose any topic and you will be connected with someone to start talking in English.
                  At the end of the call, you will be given a chance to provide feedback to your partner.</p>
                </div>
              </article>
            </div>

            <div className="tile is-5 is-parent">
              <article className="tile">
                <figure className="image">
                  <img src="/static/asset/image/topic-3d.png" />
                </figure>
              </article>
            </div>

            <div className="tile is-1"></div>
          </div>
          <hr></hr>
        </section>
        <div className="separator-curve">
          <div className="columns is-mobile is-centered">
            <div className="column is-two-thirds-desktop has-text-centered">
              <p className="title title-bottom is-size-3-desktop">
                We guarantee you 100% complete privacy and anonymity - we do not ask for any personal data.
                </p>
            </div>
          </div>
          <img className="image-curve" src="/static/asset/image/anonym.png" />
        </div>
        <section className="section last">
          <div className="container is-widescreen">
            <div className="columns is-mobile is-centered window-top">
              <div className="column is-two-thirds-desktop has-text-centered">
                <p className="title is-size-2-desktop">
                  Why improve your English speaking skills?
                </p>
                <p className="subtitle light">
                  English is an international language. By improving your speaking abilities, you can unlock lots of new opportunities!
                </p>
              </div>
            </div>
            <div className="tile is-ancestor fullsize">
              <div className="tile is-1"></div>
              <div className="tile is-parent middle">
                <article className="tile">
                  <figure className="image">
                    <img className="image-small" src="/static/asset/image/career.png" />
                    <p className="title is-size-5-desktop has-text-centered">
                      Improve career prospects
                    </p>
                  </figure>
                </article>
              </div>
              <div className="tile is-parent">
                <article className="tile">
                  <figure className="image">
                    <img className="image-small" src="/static/asset/image/speak.png" />
                    <p className="title is-size-5-desktop has-text-centered">
                      Talk with foreigners
                    </p>
                  </figure>
                </article>
              </div>
              <div className="tile is-parent">
                <article className="tile">
                  <figure className="image">
                    <img className="image-small" src="/static/asset/image/increase.png" />
                    <p className="title is-size-5-desktop has-text-centered">
                      Improve your confidence
                    </p>
                  </figure>
                </article>
              </div>
              <div className="tile is-parent">
                <article className="tile">
                  <figure className="image">
                    <img className="image-small" src="/static/asset/image/travel.png" />
                    <p className="title is-size-5-desktop has-text-centered">
                      Talk to people abroad
                    </p>
                  </figure>
                </article>
              </div>
              <div className="tile is-1"></div>
            </div>
          </div>

          <div className="container is-widescreen">
            <div className="tile is-ancestor fullsize">
              <div className="tile is-vertical is-1">
              </div>
              <div className="tile is-vertical is-4">
                <article className="tile is-child is-10">
                  <figure className="image">
                    <img src="/static/asset/image/phone-mock.png" />
                  </figure>
                </article>
              </div>
              <div className="tile is-vertical is-6">
                <article className="tile is-child centered-narrow">
                  <div className="centered-narrow has-text-centered-mobile">
                    <p className="title is-size-1-desktop">Talk about Anything, Anywhere, Anytime!</p>
                    <p className="subtitle">Available on Android and Google Chrome! Waiting for a bus or just bored at home? Invest your time for yourself to improve your English
                    speaking abilities. Talk about anything with the Free Talk feature!</p>
                    <div className="buttons">
                      <Link prefetch href="/download">
                        <a><img className="google-play" src="/static/asset/image/googleplay.png" /></a>
                      </Link>
                    </div>
                  </div>
                </article>
              </div>
              <div className="tile is-vertical is-1">
              </div>
            </div>
          </div>
        </section>
        <style jsx>{`

          hr {
            margin-left: auto;
            margin-right: auto;
            margin-top: 6rem;
            margin-bottom: 6rem;
            width: 50%;
            color: #5353AC;
            background-color: #5353AC;
            border-color: #5353AC;
          }

          p {
            color: #3c3c72;
          }

          p.title {
            margin-bottom: 3rem;
          }

          p.title-bottom {
            margin-bottom: 0rem;
          }

          p.light {
            color: #5353AC
          }

          p.strong {
            font-weight: 700;
            font-size: 1.5em;
          }

          .first {
            padding-bottom: 5px;
            padding-top: 0px;
          }

          .last {
            padding-bottom: 5px;
            padding-top: 4rem;
          }

          .window-top {
            margin-bottom: 55px;
          }

          @media only screen and (max-width: 800px) {
            .first {
              padding-top: 45px;
            }
          }

          .pink {
            background-color: #F4E3E1;
          }

          @media only screen and (max-width: 800px) {
            .buttons {
              justify-content: center;
            }
          }

          .separator-curve {
            width: 100%;
            background-color: #F4E3E1;
          }

          .image-curve {
            width: 100%;
          }

          .centered {
            width: 100%;
            height: auto;
            top: 15%;
            margin: 0 auto;
            position: relative;
          }

          .centered-title {
            padding-top: 50%;
          }

          @media only screen and (max-width: 800px) {
            .centered-title {
              padding-top: 0px;
            }
          }
          
          .centered-narrow {
            width: 100%;
            height: auto;
            top: 10%;
            margin: 0 auto;
            position: relative;
          }

          .tile.fluent-window {
            padding: 50px;
            margin: 50px;
          }

          .image-small {
            width: 50%;
            margin: auto;
          }

          .middle {
            justify-content: middle;
          }

          .google-play {
            height: 50px;
          }
        `}</style>
      </Layout>
    );
  }
}

export default Home
