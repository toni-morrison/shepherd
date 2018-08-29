import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const CANCEL_APPOINTMENT = gql `
  mutation cancelAppointment ($apntID: String!) {
    cancelAppointment ($)  
  }
`



const CANCEL_APPOINTMENT = gql `
  query findUserAppointments ($userEmail: String!) {
    findUserAppointments (userEmail: $userEmail) {
      start  
      end
      day
      appointment {
        id
        price
        children
        pets
        comment
        app_types
        status
        todoList {
          id
        }
        sitterRating
        sitter {
          id
          rates {
            child_rate
            pet_rate
            home_rate
          }
          user {
            email
            first_name
            last_name
          }
        }
        user {
          email
          id
        }
      }
    }
  }
`;
function CancelMutation (props) {
  return (
  );
}
export default CancelMutation;
