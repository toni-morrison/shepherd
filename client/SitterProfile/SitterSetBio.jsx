import React from 'react'
import { Button, Row, Col, Well, FormGroup, FormControl } from 'react-bootstrap';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const UPDATE_SITTER = gql`
  mutation updateSitter(
    $id: ID!,
    $bio: String,
    ) {
      updateSitter(
        id: $id,
        bio: $bio,
      ) {
        id
        bio
      }
    }
`

export default class SitterSetBio extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      bio: this.props.bio
    }

    this.handleBioUpdate = this.handleBioUpdate.bind(this)
    this.handleChangeInput = this.handleChangeInput.bind(this)
  }

  handleBioUpdate(updateSitter) {
    if (this.state.bio.length > 0) {
      updateSitter({
        variables: {
          id: this.props.sitterId,
          bio: this.state.bio
        }
      }).then(({ data }) => {
        this.props.handleSetBio();
      })
    } else {
      alert('Please enter a little something about yourself')
    }
  }

  handleChangeInput(e) {
    this.setState({
      bio: e.target.value
    })
  }

  render() {
    return (
      <Mutation mutation={UPDATE_SITTER}>
        {(updateSitter, { loading, error, data }) => {
          if (loading) {
            return <p>Loading...</p>;
          }
          if (error) {
            return <p>Error</p>;
          }
          return(
            <Row>
              <Col xs={12}>
              <center><h3>About Me</h3></center>
                <Well bsSize="large" style={{ width:'100%' }}>
                  <Row>
                    <Col xs={1}>
                      <h4><strong>Bio: </strong></h4>
                    </Col>
                    <Col xs={10}>
                      <FormGroup controlId="formControlsTextarea">
                        <FormControl
                        componentClass="textarea"
                        placeholder="Introduce yourself and let them know why you're the best sitter."
                        value={this.state.bio}
                        onChange={this.handleChangeInput}/>
                      </FormGroup>
                    </Col>
                  </Row>
                  <br/>
                  <Button onClick={() => this.handleBioUpdate(updateSitter)}>Click to Update</Button>
                </Well>
              </Col>
            </Row>
          )
        }}
      </Mutation>
    )
  }
}