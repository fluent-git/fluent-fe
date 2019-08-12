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
            <div class="tile is-ancestor fullsize">
              <div class="tile">
                <article class="tile is-child centered">
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
              <div class="tile is-vertical is-8">
                <article class="tile is-child">
                  <figure class="image is-5by4">
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
          <div class="tile is-ancestor fullsize">
            <div class="tile is-1"></div>

            <div class="tile is-5 is-parent">
              <article class="tile">
                <figure class="image">
                  <img src="/static/asset/image/talk-3d.png"/>
                </figure>
              </article>
            </div>

            <div class="tile is-5 is-parent">
              <article class="tile centered">
                <div className="centered has-text-centered-mobile">
                  <p className="subtitle strong">Dengarkan, bagikan, dan ekspresikan ide favoritmu dalam Bahasa Inggris</p>
                  <p className="subtitle">Ngobrol secara gratis dengan orang yang juga ingin melatih 
                  Bahasa Ingris mereka dan diskusikan topik favoritmu! Saling melatih kemampuan 
                  bahasa ingris kalian dan mereka tidak akan pernah tau apa pun tentang mu, termasuk nama mu!</p>
                </div>
              </article>
            </div>

            <div class="tile is-1"></div>
          </div>

          <div class="tile is-ancestor fullsize">
            <div class="tile is-1"></div>

            <div class="tile is-5 is-parent">
              <article class="tile centered">
                <div className="centered has-text-centered-mobile">
                  <p className="subtitle strong">Pilih Topik, Mulai Berbicara!</p>
                  <p className="subtitle">Pilihlah topik apapun dan kamu akan di hubungkan dengan 
                  orang lain untuk mulai berbicara dengan Bahasa Ingriss. Setelah berbicara, kalian 
                  akan diberikan kesempatan untuk menilai kemampuan berbicara match kamu.</p>
                </div>
              </article>
            </div>

            <div class="tile is-5 is-parent">
              <article class="tile">
                <figure class="image">
                  <img src="/static/asset/image/topic-3d.png"/>
                </figure>
              </article>
            </div>

            <div class="tile is-1"></div>
          </div>
        </section>
        <style jsx>{`

          p {
            color: #3c3c72;
          }

          p.title {
            margin-bottom: 3rem;
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

          .fullsize {
            height: 100vh;
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
            top: 25%;
            margin: 0 auto;
            position: relative;
          }

          .tile.fluent-window {
            padding: 50px;
            margin: 50px;
          }

        `}</style>
      </Layout>
    );
  }
}

export default Home
