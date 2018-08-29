import React from 'react';
import {
  Button,
  Grid,
  Row,
  Col,
  FormGroup,
  FormControl,
  ControlLabel,
  Form
} from 'react-bootstrap';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { getSignedUrls } from '../../server/s3/s3.js';
import Geosuggest from 'react-geosuggest';

const UPDATE_USER = gql`
  mutation updateUser(
    $email: String!
    $first_name: String
    $last_name: String
    $address: String
    $long: Float
    $lat: Float
    $pic_url: String
  ) {
    updateUser(
      email: $email
      first_name: $first_name
      last_name: $last_name
      address: $address
      long: $long
      lat: $lat
      pic_url: $pic_url
    ) {
      email
    }
  }
`;

export default class UserProfileUpdate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: this.props.first_name,
      last_name: this.props.last_name,
      address: this.props.address,
      long: undefined,
      lat: undefined
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleSuggest = this.handleSuggest.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  async handleSubmit(updateUser) {
    await getSignedUrls(document, 'image-file', (err, url) => {
      if (err) {
        console.log(err);
      } else {
        updateUser({
          variables: {
            email: this.props.user,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            address: this.state.address,
            long: this.state.long,
            lat: this.state.lat,
            pic_url: url || undefined
          }
        }).then(({ data }) => {
          this.props.handleUpdate();
        });
      }
    });
  }

  handleChangeInput(e) {
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
        address: undefined,
        long: undefined,
        lat: undefined
      });
    }
  }

  validateForm() {
    return (
      this.state.email &&
      this.state.first_name &&
      this.state.last_name &&
      this.state.address
    );
  }

  render() {
    return (
      <Mutation mutation={UPDATE_USER}>
        {(updateUser, { loading, error, data }) => {
          if (loading) {
            return <p>Loading...</p>;
          }
          if (error) {
            return <p>Error</p>;
          }
          return (
            <div>
              <Grid>
                <Row>
                  <Form>
                    <Col xs={3}>
                      <FormGroup>
                        <ControlLabel>First Name</ControlLabel>{' '}
                        <FormControl
                          type="text"
                          defaultValue={this.props.first_name}
                          id="first_name"
                          onChange={this.handleChangeInput}
                        />
                      </FormGroup>{' '}
                    </Col>

                    <Col xs={3}>
                      <FormGroup>
                        <ControlLabel>Last Name</ControlLabel>{' '}
                        <FormControl
                          type="text"
                          defaultValue={this.props.last_name}
                          id="last_name"
                          onChange={this.handleChangeInput}
                        />
                      </FormGroup>{' '}
                    </Col>
                  </Form>
                </Row>
                <br />
                <Row>
                  <Form>
                    <Col xs={3}>
                      <FormGroup>
                        <ControlLabel>Address</ControlLabel>{' '}
                        <Geosuggest
                          style={{ width: '100%' }}
                          placeholder="Address"
                          id="address"
                          onSuggestSelect={this.handleSuggest}
                        />
                      </FormGroup>{' '}
                    </Col>
                  </Form>
                </Row>
                <br />
                <Row>
                  <Col xs={3}>
                    <h5>Upload Photo</h5>
                    <input id="image-file" type="file" />
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col xs={3}>
                    <Button
                      onClick={() => this.handleSubmit(updateUser)}
                      style={{ marginTop: '5%' }}
                      disabled={this.validateForm()}
                    >
                      Submit/Update
                    </Button>
                  </Col>
                </Row>
              </Grid>
            </div>
          );
        }}
      </Mutation>
    );
  }
}
