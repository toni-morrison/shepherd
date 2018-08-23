import React from 'react';
import { Button, Grid, Row, Col, FormGroup, FormControl, ControlLabel, Form } from 'react-bootstrap';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const UPDATE_USER = gql`
  mutation updateUser(
    $email: String!,
    $first_name: String,
    $last_name: String,
    $street_address: String,
    $city: String,
    $state: String,
    $zip_code: String,
    ) {
      updateUser(
        email: $email,
        first_name: $first_name,
        last_name: $last_name,
        street_address: $street_address,
        city: $city,
        state: $state,
        zip_code: $zip_code 
      ) {
        email
      }
    }
`

export default class UserProfileUpdate extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      first_name: this.props.first_name,
      last_name: this.props.last_name,
      street_address: this.props.address,
      city: this.props.city,
      state: this.props.state,
      zip_code: this.props.zip

    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(updateUser) {
    updateUser({
      variables: {
        email: this.props.user,
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        street_address: this.state.street_address,
        city: this.state.city,
        state: this.state.state,
        zip_code: this.state.zip_code
      }
    }).then(({ data }) => {
      this.props.handleUpdate();
    })
  }


  handleChangeInput(e) {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  
  render () {
    return(
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
              <Form >
                <Col xs={3} >
                  <FormGroup>
                    <ControlLabel>First Name</ControlLabel>{' '}
                    <FormControl
                    type="text"
                    defaultValue={this.state.first_name}
                    id='first_name'
                    onChange={this.handleChangeInput}/>
                  </FormGroup>{' '}
                </Col>

                <Col xs={3}>
                  <FormGroup>
                    <ControlLabel>Last Name</ControlLabel>{' '}
                    <FormControl
                    type="text"
                    defaultValue={this.state.last_name}
                    id='last_name'
                    onChange={this.handleChangeInput}/>
                  </FormGroup>{' '}
                </Col>
              </Form>
            </Row>
            <br/>
            <Row>
              <Form >
                <Col xs={3} >
                  <FormGroup>
                    <ControlLabel>Address</ControlLabel>{' '}
                    <FormControl
                    type="text"
                    defaultValue={this.state.street_address}
                    id='street_address'
                    onChange={this.handleChangeInput}/>
                  </FormGroup>{' '}
                </Col>

                <Col xs={3}>
                  <FormGroup>
                    <ControlLabel>City</ControlLabel>{' '}
                    <FormControl
                    type="text"
                    defaultValue={this.state.city}
                    id='city'
                    onChange={this.handleChangeInput}/>
                  </FormGroup>{' '}
                </Col>

                <Col xs={2}>
                  <FormGroup>
                    <ControlLabel>State</ControlLabel>{' '}
                    <FormControl
                    type="text"
                    style={{ width:'50%' }}
                    defaultValue={this.state.state}
                    id='state'
                    onChange={this.handleChangeInput}/>
                  </FormGroup>{' '}
                </Col>

                <Col xs={2}>
                  <FormGroup>
                    <ControlLabel>Zip Code</ControlLabel>{' '}
                    <FormControl
                    type="text"
                    style={{ width:'50%' }}
                    defaultValue={this.state.zip}
                    id='zip_code'
                    onChange={this.handleChangeInput}/>
                  </FormGroup>{' '}
                </Col>
              </Form>
            </Row>
            <br/>
            <Row >
              <Col xs={3}>
                <h5>Upload Photo</h5><input id="image-file" type="file" />
              </Col>
            </Row>
            <br/>
            <Row>
              <Col xs={3}>
                  <Button onClick={() => this.handleSubmit(updateUser)} style={{marginTop: '5%'}}>Submit/Update</Button>
              </Col>
            </Row>
          </Grid>
        </div>
        )
      }}
      </Mutation>
    )
  }
}