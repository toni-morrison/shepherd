import React from 'react';
import GoogleLogin from './GoogleLogin.jsx';
import EmailLogin from './EmailLogin.jsx';
import {Button} from 'react-bootstrap';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      renderEmailField: false,
      renderGoogleLogin: false
    };
    this.renderEmail = this.renderEmail.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

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
        <Button type="button" onClick={this.renderEmail}>
          Login With Email
        </Button>
        <EmailLogin
          renderEmailField={this.state.renderEmailField}
          handleToggleLogin={this.props.handleToggleLogin}
        />
        <GoogleLogin handleToggleLogin={this.props.handleToggleLogin} />
      </div>
    );
  }
}
