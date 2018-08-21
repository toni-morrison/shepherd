import gql from 'graphql-tag';

const UPDATE_TODO_LIST_NAME = gql`
  mutation updateListName($id: ID!, $name: String!) {
    updateListName(id: $id, name: $name) {
      id
    }
  }
`;

const CREATE_INSTRUCTION = gql`
  mutation createInstruction(
    $id: ID!
    $time: String!
    $desc: String!
    $list_id: ID!
  ) {
    createInstruction(id: $id, time: $time, desc: $desc, list_id: $list_id) {
      id
    }
  }
`;

const DELETE_INSTRUCTIONS = gql`
  mutation deleteInstructions($id: ID!) {
    deleteInstructions(id: $id) {
      count
    }
  }
`;

module.exports = {
  UPDATE_TODO_LIST_NAME,
  CREATE_INSTRUCTION,
  DELETE_INSTRUCTIONS
};
