import React from 'react'
import { Button, Row, Col, Well } from 'react-bootstrap';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import SitterSetBio from './SitterSetBio.jsx';

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

    this.handleSetBio = this.handleSetBio.bind(this)
  }

  handleSetBio() {
    this.setState({
      update: !this.state.update
    })
  }

  render() {
    return (
      <Query query={GET_USER_INFO}
        variables={{email: this.props.user}}
        pollInterval={500}>
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
                    <Button onClick={this.handleSetBio}>Click to Update</Button>
                  </Well>
                </Col>
              </Row>
            )
          } else {
            return (
              <SitterSetBio
              handleSetBio={this.handleSetBio}
              bio={data.getUserInfo.sitter.bio}
              sitterId={this.props.sitterId}/>
            )
          }
        }}
      </Query>
    )
  }
}