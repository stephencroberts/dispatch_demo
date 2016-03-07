import React from 'react'

import AuthStore from './stores/AuthStore'
import LoginActions from './actions/LoginActions'
import Login from './components/Login.react'

class LoginControllerView extends React.Component {
  
  constructor(props) {
    super(props)
  }

  render() {

    var props = {
      authenticating: this.props.authenticating,
      onEmailChange: this._onEmailChange,
      onPasswordChange: this._onPasswordChange,
      onSubmit: this._onSubmit
    }

    return (
      <Login {...props} />
    )
  }

  _onEmailChange = (e) => {
    this.setState({email: e.target.value})
  }

  _onPasswordChange = (e) => {
    this.setState({password: e.target.value})
  }

  _onSubmit = (e) => {
    e.preventDefault()
    LoginActions.login({
      email: this.state.email,
      password: this.state.password
    })
  }
}

export {
  LoginActions as LoginActions,
  AuthStore as AuthStore,
  LoginControllerView as default
}