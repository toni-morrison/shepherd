import React from 'react';
import { Button, Row, Col, Well } from 'react-bootstrap';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import SitterSetPrices from './SitterSetPrices.jsx';

const GET_USER_INFO = gql`
  query getUserInfo(
    $email: String!
  ) {
    getUserInfo(
      email: $email
    ) {
      sitter {
        id
        rates {
          child_rate
          child_addl
          pet_rate
          pet_addl
          home_rate
        }
      }
    }
  }
`

export default class SitterPrices extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = { set: false }

    this.handleSetPrices = this.handleSetPrices.bind(this)
  }

  handleSetPrices() {
    this.setState({ set: !this.state.set })
  }

  render() {
    return(
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
          let sitter = data.getUserInfo.sitter.rates
          if (this.state.set === false ) {
            return (
              <div>
                <Row>
                  <Col xs={12}>
                    <center><h3>Pricing</h3></center>
                      <Well bsSize="large" style={{ width:'100%' }}>
                        <Row>
                          <Col xs={1}>
                          <h4>Child:</h4> 
                          </Col>

                          <Col xs={2}>
                            <h4>${sitter.child_rate} per hour</h4>
                          </Col>

                          <Col xs={2} xsOffset={2}>
                          <h4>Additional Child:</h4><br/>
                          </Col>

                          <Col xs={2}>
                            <h4>${sitter.child_addl} per hour</h4>
                          </Col>
                        </Row>

                        <Row>
                          <Col xs={1}>
                          <h4>Pet:</h4> 
                          </Col>

                          <Col xs={2}>
                            <h4>${sitter.pet_rate} per day</h4>
                          </Col>

                          <Col xs={2} xsOffset={2}>
                          <h4>Additional Pet:</h4><br/>
                          </Col>

                          <Col xs={2}>
                            <h4>${sitter.pet_addl} per day</h4>
                          </Col>
                        </Row>


                        <Row>
                          <Col xs={1}>
                          <h4>House:</h4> 
                          </Col>

                          <Col xs={2}>
                            <h4>${sitter.home_rate} per day</h4>
                          </Col>
                        </Row>
                        <br/>
                        <Button onClick={this.handleSetPrices}>Click to Update</Button>
                      </Well>
                  </Col>
                </Row>
              </div>
            )
          } else {
            return (
              <SitterSetPrices
                child={sitter.child_rate}
                child_addl={sitter.child_addl}
                pet={sitter.pet_rate}
                pet_addl={sitter.pet_addl}
                home={sitter.home_rate}
                handleSetPrices={this.handleSetPrices} 
                sitterId={this.props.sitterId} />
            )
          }
        }}
      </Query>
    )
  }
}
