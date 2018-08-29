import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Button } from 'react-bootstrap';

const CANCEL_APPOINTMENT = gql `
  mutation cancelAppointment ($apntID: String!) {
    cancelAppointment (apntID: $apntID) {
      id
    } 
  }
`

function CancelMutation (props) {
  return (
    <Mutation mutation = {CANCEL_APPOINTMENT}>
      {(cancelAppointment, {loading, error, data}) => 
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
                    type = "button"
                    onClick = {() => {
                      cancelAppointment ({
                        variables: {
                          apntID: props.apntID
                        }
                      }).then (props.handleClose)
              }}>Yes, Cancel It</Button>)
        }
      }
    </Mutation>);
}
export default CancelMutation;
