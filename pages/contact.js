import { Component } from 'react'
import Layout from '../components/layout';
import sessionManager from '../utils/session'

class Contact extends Component {
    constructor(props) {
        super(props)
        if (sessionManager.isLoggedIn()) {
            var username = sessionManager.getUsername()
            var userId = sessionManager.getUserId()
            var token = sessionManager.getToken()
        } else {
            var username = sessionManager.getUsername()
            var userId = sessionManager.getUserId()
            var token = sessionManager.getToken()
        }
      }

      componentDidMount() {
        document.querySelector("body").classList.add("has-navbar-fixed-top")
      }

      render() {
          return (
            <Layout>
                <link type="text/css" rel="stylesheet" href="static/style.css"/>
                 <br></br>
                   <section id="contact">
                      <div className="container">
                          <div className="row">
                              <div className="col-lg-8 mx-auto text-center">
                                <form id="contactform" action="https://formspree.io/fluent.id@gmail.com" method="POST">
                                  <div className="field">
                                    <label className="label">Name (optional)</label>
                                      <div className="control">
                                        <input className="form-control input" id="name" name="name" placeholder="Name" type="text"/>
                                      </div>
                                  </div>
                                  <div className="field">
                                    <label className="label">Email (optional)</label>
                                      <div className="control">
                                        <input className="form-control input" id="email" name="_replyto" placeholder="Email" type="email"/>
                                      </div>
                                  </div>
                                  <div className="field">
                                    <label className="label">Message</label>
                                      <div className="control">
                                        <textarea className="textarea form-control" id="comments" name="message" placeholder="Message" rows="5"></textarea>
                                      </div>
                                  </div>
                                  <div className="field is-grouped">
                                    <div className="control">
                                      <button className="button is-link" type="submit">Send</button>
                                    </div>
                                  </div>
                                </form>                             
                              </div>
                            </div>
                          </div>
                        </section>
                      <br></br>
              </Layout>
          )
      }


}

export default Contact