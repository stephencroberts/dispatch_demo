import BaseStore from 'BaseStore'

import AppDispatcher from 'AppDispatcher'
import LoginConstants from 'LoginConstants'
import Cookie from 'CookieUtils'
var ActionTypes = LoginConstants.ActionTypes

let state = {messages: []}

class LoginStore extends BaseStore {

  isAuthenticated() {
    if (state.authenticated) return true

    var userId = Cookie.get('rtadmin_user_id')
    if (userId && userId.length > 0) state.authenticated = true

    return state.authenticated
  }

  isAuthenticating() {
    return state.fetching
  }

  getUserId() {
    if (state.id) return state.id
    state.id = Cookie.get('rtadmin_user_id')
    return state.id
  }

  getAuthToken() {
    if (state.token) return state.token
    state.token = Cookie.get('rtadmin_auth_token')
    return state.token
  }

  getMessages() {
    return state.messages
  }
}

let instance = new LoginStore()

// Register callback to handle all updates
instance.dispatchToken = AppDispatcher.register((action) => {

  switch(action.actionType) {

    case ActionTypes.LOGIN_REQUEST :
      state.fetching = action.fetching
      if (action.success) {
        Cookie.set('rtadmin_user_id', action.data.id, 1)
        Cookie.set('rtadmin_auth_token', action.data.token, 1)
        state.id = action.data.id
        state.token = action.data.token
        state.authenticated = true
      }
      instance.emitChange()
      break

    case ActionTypes.LOGIN_LOGOUT:
      Cookie.delete('rtadmin_user_id')
      Cookie.delete('rtadmin_auth_token')
      state.id = null
      state.token = null
      state.authenticated = false
      instance.emitChange()
      break

    default:
      // no op
  }
})

export default instance