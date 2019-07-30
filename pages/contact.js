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

      render() {
          return (
            <Layout>
                <link type="text/css" rel="stylesheet" href="static/style.css"/>
                 <br></br>
                   <section id="contact">
                      <div class="container">
                          <div class="row">
                              <div class="col-lg-8 mx-auto text-center">
                                <form id="contactform" action="https://formspree.io/fluent.id@gmail.com" method="POST">
                                  <div class="field">
                                    <label class="label">Name (optional)</label>
                                      <div class="control">
                                        <input class="form-control input" id="name" name="name" placeholder="Name" type="text"/>
                                      </div>
                                  </div>
                                  <div class="field">
                                    <label class="label">Email (optional)</label>
                                      <div class="control">
                                        <input class="form-control input" id="email" name="_replyto" placeholder="Email" type="email"/>
                                      </div>
                                  </div>
                                  <div class="field">
                                    <label class="label">Message</label>
                                      <div class="control">
                                        <textarea class="textarea form-control" id="comments" name="message" placeholder="Message" rows="5"></textarea>
                                      </div>
                                  </div>
                                  <div class="field is-grouped">
                                    <div class="control">
                                      <button class="button is-link" type="submit">Send</button>
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