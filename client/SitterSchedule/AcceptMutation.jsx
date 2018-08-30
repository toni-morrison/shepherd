import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Button } from 'react-bootstrap';

const ACCEPT_APPOINTMENT = gql `
  mutation acceptAppointment ($apntID: String!) {
    acceptAppointment (apntID: $apntID) {
      id
      status
    } 
  }
`

function AcceptMutation (props) {
  return (
    <Mutation mutation = {ACCEPT_APPOINTMENT}>
      {(acceptAppointment, {loading, error, data}) => 
        {
          if (loading) {
            console.log ('Loading...')
            return <span/>
          }
          if (error) {
            console.log ('Error: ', error)
            return <p>Error</p>
          }
 
          return (<Button
                    bsStyle="primary" 
                    bsSize="large"
                    type = "button"
                    onClick = {() => {
                      acceptAppointment ({
                        variables: {
                          apntID: props.apntID
                        }
                      }).then (({ data }) => {
                        console.log (data)
                        props.handleClose();
                      })
              }}>Accept</Button>)
        }
      }
    </Mutation>);
}
export default AcceptMutation;