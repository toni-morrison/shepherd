import React from 'react';
import GoogleLogin from './GoogleLogin.jsx';
import EmailLogin from './EmailLogin.jsx';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      renderEmailField: false,
      renderGoogleLogin: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.renderEmail = this.renderEmail.bind(this);
  }

  handleLoginSubmit() {}

  renderEmail() {
    this.setState({
      renderEmailField: !this.state.renderEmailField
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  render() {
    return (
      <div className="auth-form">
        Login
        <br />
        <button type="button" onClick={() => this.renderEmail()}>
          Login With Email
        </button>
        {this.state.renderEmailField && <EmailLogin />}
        <GoogleLogin />
      </div>
    );
  }
}
