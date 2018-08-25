import React from 'react';
import firebase from '../../server/firebase/firebase.js';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Button, FormControl, FormGroup, Col, Row } from 'react-bootstrap'

const SIGNUP = gql`
  mutation SignUp(
    $email: String!
    $first_name: String!
    $last_name: String!
    $street_address: String
    $city: String
    $state: String
    $zip_code: String
  ) {
    signup(
      email: $email
      first_name: $first_name
      last_name: $last_name
      street_address: $street_address
      city: $city
      state: $state
      zip_code: $zip_code
    ) {
      id
      email
      first_name
      last_name
    }
  }
`;

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      firstname: '',
      lastname: '',
      street: '',
      city: '',
      state: '',
      zipcode: ''
    };
    this.validateForm = this.validateForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignupSubmit = this.handleSignupSubmit.bind(this);
  }

  validateForm() {
    return (
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword
    );
  }

  handleSignupSubmit(e, signup) {
    e.preventDefault();
    //pass email and password to firebase auth
    //grab the User uid from firebase and add it to info being passed to db
    //pass all information to db USER and save
    //redirect to dashboard

    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(result => {
        signup({
          variables: {
            email: this.state.email,
            first_name: this.state.firstname,
            last_name: this.state.lastname,
            street_address: this.state.street,
            city: this.state.city,
            state: this.state.state,
            zip_code: this.state.zipcode
          }
        });
        this.props.handleToggleSignup();
        window.location.reload();
      })
      .catch(err => {
        console.log('ERROR:', err);
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
        Signup
        <Mutation mutation={SIGNUP}>
          {(signup, { loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;

            return (
              <form onSubmit={e => this.handleSignupSubmit(e, signup)}>
                <FormGroup>
                <Row>
                <Col xs={6}>
                  <FormControl
                    type="email"
                    value={this.state.email}
                    id="email"
                    placeholder="Enter your email"
                    onChange={this.handleChange}
                  />
                </Col>
                </Row>
                <Row>
                <Col xs={6}>
                  <FormControl
                    type="password"
                    value={this.state.password}
                    id="password"
                    placeholder="Enter your password"
                    onChange={this.handleChange}
                  />
                </Col>
                </Row>
                <Row>
                <Col xs={6}>
                  <FormControl
                    type="password"
                    value={this.state.confirmPassword}
                    id="confirmPassword"
                    placeholder="Confirm your password"
                    onChange={this.handleChange}
                  />
                </Col>
                </Row>
                <Row>
                <Col xs={6}>
                  <FormControl
                    type="text"
                    value={this.state.firstname}
                    id="firstname"
                    placeholder="First name"
                    onChange={this.handleChange}
                  />
                </Col>
                </Row>
                <Row>
                <Col xs={6}>
                  <FormControl
                    type="text"
                    value={this.state.lastname}
                    id="lastname"
                    placeholder="Last name"
                    onChange={this.handleChange}
                  />
                </Col>
                </Row>
                  <br />
                  Enter Your Address
                  <br />
                <Row>
                <Col xs={6}>
                  <FormControl
                    type="text"
                    value={this.state.street}
                    id="street"
                    placeholder="Enter your street"
                    onChange={this.handleChange}
                  />
                </Col>
                </Row>
                <Row>
                <Col xs={6}>
                  <FormControl
                    type="text"
                    value={this.state.city}
                    id="city"
                    placeholder="Enter your city"
                    onChange={this.handleChange}
                  />
                </Col>
                </Row>
                <Row>
                <Col xs={6}>
                  <FormControl
                    type="text"
                    value={this.state.state}
                    id="state"
                    placeholder="Enter your state"
                    onChange={this.handleChange}
                  />
                </Col>
                </Row>
                <Row>
                <Col xs={6}>
                  <FormControl
                    type="text"
                    value={this.state.zipcode}
                    id="zipcode"
                    placeholder="Enter your zipcode"
                    onChange={this.handleChange}
                  />
                </Col>
                </Row>
                  <Button
                    disabled={!this.validateForm()}
                    type="submit"
                    value="submit"
                  >
                    Submit
                  </Button>
                </FormGroup>
              </form>
            );
          }}
        </Mutation>
      </div>
    );
  }
}
