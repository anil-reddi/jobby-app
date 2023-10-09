import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    isError: false,
  }

  onSuccessLogin = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onFailureLogin = errorMsg => {
    this.setState({errorMsg, isError: true})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state

    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSuccessLogin(data.jwt_token)
    } else {
      this.onFailureLogin(data.error_msg)
    }
  }

  onChangeUsername = event => this.setState({username: event.target.value})

  onChangePassword = event => this.setState({password: event.target.value})

  renderUserNameField = () => {
    const {username} = this.state

    return (
      <div className="input-field-container">
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          value={username}
          placeholder="Username"
          onChange={this.onChangeUsername}
          className="input-field"
        />
      </div>
    )
  }

  renderPasswordField = () => {
    const {password} = this.state

    return (
      <div className="input-field-container">
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          value={password}
          placeholder="Password"
          onChange={this.onChangePassword}
          className="input-field"
        />
      </div>
    )
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    const {errorMsg, isError} = this.state
    return (
      <div className="login-container">
        <form className="login-form" onSubmit={this.onSubmitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          {this.renderUserNameField()}
          {this.renderPasswordField()}
          <div>
            <button className="login-btn" type="submit">
              Login
            </button>
            {isError && <p className="error-msg">*{errorMsg}</p>}
          </div>
        </form>
      </div>
    )
  }
}
export default Login
