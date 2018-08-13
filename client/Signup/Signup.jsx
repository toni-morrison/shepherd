import React from "react";

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      firstname: "",
      lastname: "",
      street: "",
      city: "",
      state: "",
      zipcode: null
    };
    this.validateForm = this.validateForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignupSubmit = this.handleSignupSubmit(this);
  }

  validateForm() {
    return (
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword
    );
  }

  handleSignupSubmit() {
    //pass email and password to firebase auth
    //grab the User uid from firebase and add it to info being passed to db
    //pass all information to db USER and save
    //redirect to dashboard
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  render() {
    return (
      <div className="auth-form">
        {" "}
        Signup
        <form onSubmit={this.handleSignupSubmit}>
          <input
            type="email"
            value={this.state.email}
            id="email"
            placeholder="Enter your email"
            onChange={this.handleChange}
          />
          <br />
          <input
            type="password"
            value={this.state.password}
            id="password"
            placeholder="Enter your password"
            onChange={this.handleChange}
          />
          <br />
          <input
            type="password"
            value={this.state.confirmPassword}
            id="confirmPassword"
            placeholder="Confirm your password"
            onChange={this.handleChange}
          />
          <br />
          <input
            type="text"
            value={this.state.firstname}
            id="firstname"
            placeholder="First name"
            onChange={this.handleChange}
          />
          <br />
          <input
            type="text"
            value={this.state.lastname}
            id="lastname"
            placeholder="Last name"
            onChange={this.handleChange}
          />
          <br />
          Enter Your Address
          <br />
          <input
            type="text"
            value={this.state.street}
            id="street"
            placeholder="Enter your street "
            onChange={this.handleChange}
          />
          <br />
          <input
            type="text"
            value={this.state.city}
            id="city"
            placeholder="Enter your city "
            onChange={this.handleChange}
          />
          <br />
          <input
            type="text"
            value={this.state.state}
            id="state"
            placeholder="Enter your state "
            onChange={this.handleChange}
          />
          <br />
          <input
            type="zipcode"
            value={this.state.zipcode}
            id="zipcode"
            placeholder="Enter your zipcode "
            onChange={this.handleChange}
          />
          <br />
          <button disabled={!this.validateForm()}>Submit</button>
        </form>
      </div>
    );
  }
}
