import AppDispatcher from 'AppDispatcher'
import LoginConstants from 'LoginConstants'
import ActionRequest from 'ActionRequest'

var LoginActions = {

  login({email, password, callback}) {

    var request = new ActionRequest({
      actionType: LoginConstants.ActionTypes.LOGIN_REQUEST,
      fetching: true
    })

    AppDispatcher.dispatch(request)

    // Simulate async API call
    setTimeout(function() {
      request.fetching = false
      request.success = true
      request.data = {id: 'id', token: 'token'}
      AppDispatcher.dispatch(request)
    }, 1000)
  },

  logout() {
    AppDispatcher.dispatch({
      actionType: LoginConstants.ActionTypes.LOGIN_LOGOUT
    })
  }
}

export default LoginActions