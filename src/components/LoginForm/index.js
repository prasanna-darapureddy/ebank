import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginForm extends Component {
  state = {userId: '', pin: '', errorMsg: '', isErrorShows: false}

  onChangeUserId = event => {
    this.setState({userId: parseInt(event.target.value)})
  }

  onChangePin = event => {
    this.setState({pin: parseInt(event.target.value)})
  }

  submitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  submitFailure = errorMsg => {
    this.setState({errorMsg, isErrorShows: true})
  }

  onSubmitForm = async event => {
    event.preventDefault()

    const {userId, pin} = this.state

    const userDetails = {userId, pin}
    console.log(userDetails)

    const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)

    if (response.ok) {
      this.submitSuccess(data.jwt_token)
    } else {
      this.submitFailure(data.error_msg)
    }
  }

  render() {
    const {errorMsg, isErrorShows} = this.state

    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <>
        <div className="login-bg-container">
          <div className="login-card-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              alt="website login"
              className="login-img"
            />
            <div className="login-card">
              <h1 className="welcome-heading">Welcome Back</h1>
              <form className="login-form" onSubmit={this.onSubmitForm}>
                <label className="label-text" htmlFor="username">
                  User ID
                </label>
                <input
                  type="text"
                  className="user-input"
                  placeholder="Enter User ID"
                  id="username"
                  onChange={this.onChangeUserId}
                />
                <label className="label-text" htmlFor="pin">
                  PIN
                </label>
                <input
                  type="password"
                  id="pin"
                  className="user-input"
                  placeholder="Enter PIN"
                  onChange={this.onChangePin}
                />
                <button type="submit" className="login-button">
                  Login
                </button>
              </form>
              {isErrorShows && <p className="error-msg">*{errorMsg}</p>}
            </div>
          </div>
        </div>
      </>
    )
  }
}
export default LoginForm
