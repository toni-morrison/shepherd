import gql from 'graphql-tag';

const MAKE_PAYMENT = gql`
  mutation updateAppointment($id: ID!, $status: AppStatus!) {
    updateAppointment(id: $id, status: $status) {
      id
    }
  }
`;

module.exports = {
  MAKE_PAYMENT
};
