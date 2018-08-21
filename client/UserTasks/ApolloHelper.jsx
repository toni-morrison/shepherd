import gql from 'graphql-tag';

const DELETE_INSTRUCTIONS = gql`
  mutation deleteInstructions($id: ID!) {
    deleteInstructions(id: $id) {
      count
    }
  }
`;

const CREATE_LIST = gql`
  mutation createList($email: String!, $name: String!) {
    createList(email: $email, name: $name) {
      id
    }
  }
`;

const FIND_INSTRUCTIONS = gql`
  query findInstructions($id: ID!) {
    findInstructions(id: $id) {
      id
      time
      desc
    }
  }
`;

const DELETE_TODO = gql`
  mutation deleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      id
    }
  }
`;

module.exports = {
  DELETE_INSTRUCTIONS,
  FIND_INSTRUCTIONS,
  CREATE_LIST,
  DELETE_TODO
};
