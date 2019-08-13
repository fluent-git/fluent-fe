import { Component } from 'react'
import Link from 'next/link'
import Layout from '../components/layout'
import sessionManager from '../utils/session'
import Router from 'next/router'
import { initGA, logPageView } from '../utils/analytics'

class Home extends Component {
  componentDidMount () {
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
      Router.push('/talk')
    } else {
      var username = sessionManager.getUsername()
      var userId = sessionManager.getUserId()
      var token = sessionManager.getToken()
      this.state = { loggedIn: false, username: "", userId: 0, token: "" }
    }
  }

  render () {
    return (
      <Layout loggedIn={this.state.loggedIn} username={this.state.username}>
        <section className="section first">
          <div className="container is-widescreen">
            <div className="tile is-ancestor fullsize">
              <div className="tile">
                <article className="tile is-child centered">
                  <div className="centered has-text-centered-mobile">
                    <p className="title is-size-1-desktop">Berlatihlah Berbicara Bahasa Inggris Secara Anonim!</p>
                    <p className="subtitle">Tingkatkan keterampilan berbicara anda di Bahasa Ingris, cari hobi baru, atau cuman ngobrol aja!</p>
                    <div className="buttons">
                      <Link prefetch href="/login">
                        <a className="button is-primary">Mulai Berbicara</a>
                      </Link>
                  </div>
                  </div>
                </article>
              </div>
              <div className="tile is-vertical is-8">
                <article className="tile is-child">
                  <figure className="image is-5by4">
                    <img src="/static/asset/image/home.png"/>
                  </figure>
                </article>
              </div>
            </div>
          </div>
        </section>
        <div className="separator-curve">
          <img className="image-curve" src="/static/asset/image/curve.png"/>
        </div>
        <section className="section pink">
          <div className="columns is-mobile is-centered window-top">
            <div className="column is-two-thirds-desktop has-text-centered">
              <p className="title is-size-2-desktop">
              Berbicara Bahasa Inggris itu mudah dan menyenangkan!
              </p>
              <p className="subtitle light">
                Beginilah caranya 👇
              </p>
            </div>
          </div>
          <div className="tile is-ancestor fullsize">
            <div className="tile is-1"></div>

            <div className="tile is-5 is-parent">
              <article className="tile">
                <figure className="image">
                  <img src="/static/asset/image/talk-3d.png"/>
                </figure>
              </article>
            </div>

            <div className="tile is-5 is-parent">
              <article className="tile centered">
                <div className="centered has-text-centered-mobile">
                  <p className="subtitle strong">Dengarkan, bagikan, dan ekspresikan ide favoritmu dalam Bahasa Inggris</p>
                  <p className="subtitle">Ngobrol secara gratis dengan orang yang juga ingin melatih 
                  Bahasa Ingris mereka dan diskusikan topik favoritmu! Saling melatih kemampuan 
                  bahasa ingris kalian dan mereka tidak akan pernah tau apa pun tentang mu, termasuk nama mu!</p>
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
                  <p className="subtitle strong">Pilih Topik, Mulai Berbicara!</p>
                  <p className="subtitle">Pilihlah topik apapun dan kamu akan di hubungkan dengan 
                  orang lain untuk mulai berbicara dengan Bahasa Ingriss. Setelah berbicara, kalian 
                  akan diberikan kesempatan untuk menilai kemampuan berbicara match kamu.</p>
                </div>
              </article>
            </div>

            <div className="tile is-5 is-parent">
              <article className="tile">
                <figure className="image">
                  <img src="/static/asset/image/topic-3d.png"/>
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
                Kami menjaminkan anda 100% privasi, anonimitas lengkap, tidak perlu foto profil, tidak perlu nama asli.
                </p>
              </div>
            </div>
          <img className="image-curve" src="/static/asset/image/anonym.png"/>
        </div>
        <section className="section last">
          <div className="container is-widescreen">
            <div className="columns is-mobile is-centered window-top">
              <div className="column is-two-thirds-desktop has-text-centered">
                <p className="title is-size-2-desktop">
                Mengapa berlatih berbicara Bahasa Ingris?
                </p>
                <p className="subtitle light">
                Bahasa Ingris adalah Bahasa Internasional! Dengan melancarkan kemampuan percakapan kamu, anda bisa membuka banyak kesempatan baru
                </p>
              </div>
            </div>
            <div className="tile is-ancestor fullsize">
              <div className="tile is-1"></div>
              <div className="tile is-parent middle">
                <article className="tile">
                  <figure className="image">
                    <img className="image-small" src="/static/asset/image/career.png"/>
                    <p className="title is-size-5-desktop has-text-centered">
                    Better Career Prospects
                    </p>
                  </figure>
                </article>
              </div>
              <div className="tile is-parent">
                <article className="tile">
                  <figure className="image">
                    <img className="image-small" src="/static/asset/image/speak.png"/>
                    <p className="title is-size-5-desktop has-text-centered">
                    Speak With Foreigners
                    </p>
                  </figure>
                </article>
              </div>
              <div className="tile is-parent">
                <article className="tile">
                  <figure className="image">
                    <img className="image-small" src="/static/asset/image/increase.png"/>
                    <p className="title is-size-5-desktop has-text-centered">
                    Increase Your Value
                    </p>
                  </figure>
                </article>
              </div>
              <div className="tile is-parent">
                <article className="tile">
                  <figure className="image">
                    <img className="image-small" src="/static/asset/image/travel.png"/>
                    <p className="title is-size-5-desktop has-text-centered">
                    Travel Anywhere Easily
                    </p>
                  </figure>
                </article>
              </div>
              <div className="tile is-1"></div>
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
        `}</style>
      </Layout>
    );
  }
}

export default Home
