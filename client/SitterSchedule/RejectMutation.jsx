import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Button } from 'react-bootstrap';

const CANCEL_APPOINTMENT = gql`
  mutation rejectAppointment($apntID: String!) {
    rejectAppointment(apntID: $apntID) {
      id
    }
  }
`;

function RejectMutation(props) {
  return (
    <Mutation mutation={CANCEL_APPOINTMENT}>
      {(rejectAppointment, { loading, error, data }) => {
        if (loading) {
          return <span />;
        }
        if (error) {
          console.log('Error: ', error);
          return <p>Error</p>;
        }

        return (
          <Button
            bsStyle="primary"
            bsSize="large"
            type="button"
            onClick={() => {
              rejectAppointment({
                variables: {
                  apntID: props.apntID
                }
              }).then(({ data }) => {
                props.handleClose();
              });
            }}
          >
            Reject
          </Button>
        );
      }}
    </Mutation>
  );
}
export default RejectMutation;
