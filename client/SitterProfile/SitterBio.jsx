import React from 'react'
import { Button, Row, Col, Well } from 'react-bootstrap';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const GET_USER_INFO = gql`
  query getUserInfo($email: String!) {
    getUserInfo(email: $email) {
      sitter {
        id
        bio
      }
    }
  }
`;

export default class SitterBio extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      update: false
    }

    this.handleBioUpdate = this.handleBioUpdate.bind(this)
  }

  handleBioUpdate() {
    this.setState({
      update: !this.state.update
    })
  }

  render() {
    return (
      <Query query={GET_USER_INFO}
        variables={{email: this.props.user}}>
          {({ loading, error, data }) => {
            if (loading) {
              return <p>Loading...</p>;
            }
            if (error) {
              return <p>Error</p>;
            }
          if (this.state.update===false) {
            return(
              <Row>
                <Col xs={12}>
                <center><h3>About Me</h3></center>
                  <Well bsSize="large" style={{ width:'100%' }}>
                    <Row>
                      <Col xs={12}>
                        <h4><strong>Bio: </strong>{data.getUserInfo.sitter.bio}</h4>
                      </Col>
                    </Row>
                    <br/>
                    <Button onClick={this.handleInfoUpdate}>Click to Update</Button>
                  </Well>
                </Col>
              </Row>
            )
          }
        }}
      </Query>
    )
  }
}