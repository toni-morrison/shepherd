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

function RejectMutation (props) {
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
                    bsStyle="primary" 
                    bsSize="large"
                    type = "button"
                    onClick = {() => {
                      cancelAppointment ({
                        variables: {
                          apntID: props.apntID
                        }
                      }).then (({ data }) => {
                        console.log (data)
                        props.handleClose();
                      })
              }}>Reject</Button>)
        }
      }
    </Mutation>);
}
export default RejectMutation;
