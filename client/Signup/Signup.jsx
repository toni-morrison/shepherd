import React from 'react';
import firebase from '../../server/firebase/firebase.js';
import { getSignedUrls } from '../../server/s3/s3';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import axios from 'axios';
import Geosuggest from 'react-geosuggest';
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  Col,
  Row,
  HelpBlock
} from 'react-bootstrap';

const SIGNUP = gql`
  mutation SignUp(
    $email: String!
    $first_name: String!
    $last_name: String!
    $address: String!
    $long: Float!
    $lat: Float!
    $pic_url: String
  ) {
    signup(
      email: $email
      first_name: $first_name
      last_name: $last_name
      address: $address
      long: $long
      lat: $lat
      pic_url: $pic_url
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
      address: '',
      long: undefined,
      lat: undefined,
      badFile: false
    };
    this.validateForm = this.validateForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.handleSignupSubmit = this.handleSignupSubmit.bind(this);
    this.handleSuggest = this.handleSuggest.bind(this);
  }

  validateForm() {
    return (
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword &&
      this.state.address.length > 0
    );
  }

  handleFileUpload() {
    const file = document.getElementById('signupPropic');
    const ext = ['.jpg', '.png', '.gif'];
    if (
      !(
        file.value.length > 4 &&
        ext.includes(file.value.substring(file.value.length - 4))
      )
    ) {
      document.getElementById('signupPropic').value = '';
      this.setState({
        badFile: true
      });
    }
  }

  async handleSignupSubmit(e, signup) {
    e.preventDefault();
    //pass email and password to firebase auth
    //grab the User uid from firebase and add it to info being passed to db
    //pass all information to db USER and save
    //redirect to dashboard
    await getSignedUrls(document, 'signupPropic', (err, url) => {
      if (err) {
        console.log(err);
      } else {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.state.email, this.state.password)
          .then(result => {
            signup({
              variables: {
                email: this.state.email,
                first_name: this.state.firstname,
                last_name: this.state.lastname,
                address: this.state.address,
                long: this.state.long,
                lat: this.state.lat,
                pic_url: url
              }
            })
              .then(() => {
                this.props.handleToggleSignup();
                window.location.reload();
              })
              .catch(err => {
                console.log(err);
              });
          })
          .catch(err => {
            console.log('ERROR:', err);
          });
      }
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleSuggest(suggest) {
    if (suggest) {
      this.setState({
        address: suggest.gmaps.formatted_address,
        long: suggest.location.lng,
        lat: suggest.location.lat
      });
    } else {
      this.setState({
        address: '',
        long: undefined,
        lat: undefined
      });
    }
  }

  render() {
    return (
      <div className="auth-form">
        <Mutation mutation={SIGNUP}>
          {(signup, { loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;

            return (
              <div className="signup">
                <Row>Signup</Row>
                <Form
                  horizontal
                  onSubmit={e => this.handleSignupSubmit(e, signup)}
                >
                  <FormGroup>
                    <Col xs={6} xsOffset={3}>
                      <FormControl
                        type="email"
                        value={this.state.email}
                        id="email"
                        placeholder="Enter your email"
                        onChange={this.handleChange}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup>
                    <Col xs={5} xsOffset={1}>
                      <FormControl
                        type="password"
                        value={this.state.password}
                        id="password"
                        placeholder="Enter your password"
                        onChange={this.handleChange}
                      />
                    </Col>
                    <Col xs={5}>
                      <FormControl
                        type="password"
                        value={this.state.confirmPassword}
                        id="confirmPassword"
                        placeholder="Confirm your password"
                        onChange={this.handleChange}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup>
                    <Col xs={5} xsOffset={1}>
                      <FormControl
                        type="text"
                        value={this.state.firstname}
                        id="firstname"
                        placeholder="First name"
                        onChange={this.handleChange}
                      />
                    </Col>
                    <Col xs={5}>
                      <FormControl
                        type="text"
                        value={this.state.lastname}
                        id="lastname"
                        placeholder="Last name"
                        onChange={this.handleChange}
                      />
                    </Col>
                  </FormGroup>
                  <Row>Enter Your Address</Row>
                  <FormGroup>
                    <Col xs={10} xsOffset={1}>
                      <Geosuggest
                        style={{ width: '100%' }}
                        placeholder="Address"
                        id="address"
                        onSuggestSelect={this.handleSuggest}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup>
                    <Col xs={10} xsOffset={1}>
                      <FormControl
                        type="file"
                        value={this.state.proPic}
                        id="signupPropic"
                        label="Profile Picture"
                        onChange={this.handleFileUpload}
                      />
                      <HelpBlock>
                        Valid file types: .jpg, .png, .gif, files must be less
                        than 1 MB in size
                      </HelpBlock>
                      {this.state.badFile && (
                        <HelpBlock>Invalid file upload!</HelpBlock>
                      )}
                    </Col>
                  </FormGroup>
                  <FormGroup>
                    <Col xs={10} xsOffset={1}>
                      <Button
                        bsStyle="primary"
                        style={{ float: 'right' }}
                        disabled={!this.validateForm()}
                        type="submit"
                        value="submit"
                      >
                        Submit
                      </Button>
                    </Col>
                  </FormGroup>
                </Form>
              </div>
            );
          }}
        </Mutation>
      </div>
    );
  }
}
