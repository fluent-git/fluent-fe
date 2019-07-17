import cookie from 'js-cookie'
import Router from 'next/router'

var SessionManager = (function() {

    var getUsername = function() {
        return cookie.get('username');
    };

    var getToken = function() {
        return cookie.get('token');
    };

    var isLoggedIn = function() {
        var tokenCookie = cookie.get('token')
        if (tokenCookie == "" || tokenCookie == null || typeof tokenCookie === 'undefined') {
            return false
        } else {
            return true
        }
    }

    var signIn = function(username, token) {
        cookie.set('username', username)
        cookie.set('token', token)
        Router.push('/')
    }

    var signOut = function() {
        cookie.remove('username')
        cookie.remove('token')
        Router.push('/login')
    }
  
    return {
        isLoggedIn: isLoggedIn,
        getUsername: getUsername,
        getToken: getToken,
        signIn: signIn,
        signOut: signOut
    }
  
})();
  
export default SessionManager;