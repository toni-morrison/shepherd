import gql from 'graphql-tag';

const UPDATE_TODO_LIST = gql`
  mutation updateListName(
    $id: ID!
    $name: String
    $startTime: String
    $endTime: String
  ) {
    updateListName(
      id: $id
      name: $namegit
      startTime: $startTime
      endTime: $endTime
    ) {
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
  UPDATE_TODO_LIST,
  CREATE_INSTRUCTION,
  DELETE_INSTRUCTIONS
};
