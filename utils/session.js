import cookie from 'js-cookie'
import Router from 'next/router'

var SessionManager = (function() {

    var getUsername = function() {
        return cookie.get('username');
    };

    var getUserId = function() {
        return cookie.get('userId');
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

    var startReview = function(otherId, talkId){
        cookie.set('otherId',otherId)
        cookie.set('talkId',talkId)
    }

    var endReview = function(){
        cookie.remove('otherId')
        cookie.remove('talkId')
    }

    var getOtherId = function(){
        return cookie.get('otherId')
    }

    var getTalkId = function(){
        return cookie.get('talkId')
    }

    var signIn = function(username, userId, token) {
        cookie.set('username', username)
        cookie.set('userId',userId)
        cookie.set('token', token)
        Router.push('/talk')
    }

    var signOut = function() {
        cookie.remove('username')
        cookie.remove('userId')
        cookie.remove('token')
        Router.push('/login')
    }

    var talkDetails = function(talkId) {
        cookie.set('talkId',talkId)
    }
  
    return {
        isLoggedIn: isLoggedIn,
        getUsername: getUsername,
        getUserId: getUserId,
        getToken: getToken,
        startReview: startReview,
        endReview: endReview,
        getOtherId: getOtherId,
        getTalkId: getTalkId,
        signIn: signIn,
        signOut: signOut,
        talkDetails: talkDetails
    }
  
})();
  
export default SessionManager;