import React from 'react';

export default class EmailLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.validateForm = this.validateForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  render() {
    if (!this.props.renderEmailField) {
      return null;
    } else {
      return (
        <div className="auth-form">
          <form onSubmit={this.props.handleLoginSubmit}>
            <input
              id="email"
              type="email"
              value={this.state.email}
              placeholder="Enter Your Email"
              onChange={this.handleChange}
            />
            <br />
            <input
              id="password"
              type="password"
              value={this.state.password}
              placeholder="Enter Your Password"
              onChange={this.handleChange}
            />
            <br />
            <button disabled={!this.validateForm()}>Submit</button>
          </form>
        </div>
      );
    }
  }
}
