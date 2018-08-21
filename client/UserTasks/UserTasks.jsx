import React from 'react';
import InstructionMaker from '../InstructionList/InstructionMaker.jsx';
import {
  Image,
  Button,
  Thumbnail,
  Grid,
  Row,
  Col,
  Modal
} from 'react-bootstrap';
import instructions from './instructions.js';
import TasksModal from './TasksModal.jsx';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';

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

export default class UserTasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentInstruction: [],
      currentListId: '',
      modalShow: false,
      showInstructions: false,
      name: 'Untitled',
      data: []
    };
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleTasksSelect = this.handleTasksSelect.bind(this);
    this.handleTasksEdit = this.handleTasksEdit.bind(this);
    this.handleCloseInstructions = this.handleCloseInstructions.bind(this);
    this.handleOpenInstructions = this.handleOpenInstructions.bind(this);
    this.changeName = this.changeName.bind(this);
  }

  handleTasksSelect(data, id, name) {
    var result = [];
    for (var i = 0; i < data.findInstructions.length; i++) {
      var item = data.findInstructions[i];
      result.push([item.time, item.desc, item.id]);
    }

    this.setState({
      modalShow: true,
      currentInstruction: result,
      currentListId: id,
      name: name,
      showInstructions: false
    });
  }

  handleTasksEdit() {
    console.log('Editing Tasks ID: ', this.state.currentListId);
  }

  handleModalClose() {
    this.setState({
      modalShow: false
    });
  }

  handleCloseInstructions() {
    this.setState({
      showInstructions: false
    });
  }

  handleOpenInstructions() {
    this.setState({
      showInstructions: true
    });
  }

  handleCreateInstructions(createList) {
    createList({
      variables: {
        email: 'debbie@hr.com',
        name: this.state.name
      }
    }).then(({ data }) => {
      this.setState(
        {
          currentListId: data.createList.id,
          name: 'Untitled'
        },
        () => {
          this.handleOpenInstructions();
        }
      );
    });
  }

  changeName(newName) {
    this.setState({
      name: newName
    });
  }

  render() {
    return (
      <Mutation mutation={CREATE_LIST}>
        {(createList, { loading, error, data }) => {
          if (loading) {
            return <p>Loading...</p>;
          }
          if (error) {
            return <p>Error :(</p>;
          }

          return (
            <div>
              <Grid>
                <Row>
                  {this.props.data.findTodoLists.map(instructionSet => (
                    <Col key={instructionSet.id} md={4}>
                      <Query
                        query={FIND_INSTRUCTIONS}
                        variables={{ id: instructionSet.id }}
                        pollInterval={500}
                      >
                        {({
                          loading,
                          error,
                          data,
                          startPolling,
                          stopPolling
                        }) => {
                          if (loading) {
                            return <p>loading</p>;
                          }
                          if (error) {
                            return <p>error</p>;
                          }
                          return (
                            <Button
                              bsSize="large"
                              block
                              onClick={() =>
                                this.handleTasksSelect(
                                  data,
                                  instructionSet.id,
                                  instructionSet.name
                                )
                              }
                            >
                              {instructionSet.name}
                            </Button>
                          );
                        }}
                      </Query>
                    </Col>
                  ))}
                  <Col md={4}>
                    <Button
                      type="button"
                      onClick={() => this.handleCreateInstructions(createList)}
                      bsSize="large"
                      block
                    >
                      +
                    </Button>
                  </Col>
                </Row>
              </Grid>

              <TasksModal
                instructions={this.state.currentInstruction}
                handleClose={this.handleModalClose}
                show={this.state.modalShow}
                handleEdit={this.handleOpenInstructions}
                currentListId={this.state.currentListId}
              />
              <Modal
                show={this.state.showInstructions}
                onHide={this.handleCloseInstructions}
              >
                <Modal.Header closeButton>
                  <Modal.Title>{this.state.name}</Modal.Title>
                </Modal.Header>
                <div>
                  <InstructionMaker
                    closeInstructions={this.handleCloseInstructions}
                    closeModal={this.handleModalClose}
                    changeName={this.changeName}
                    currentInstruction={this.state.currentInstruction}
                    currentListId={this.state.currentListId}
                    name={this.state.name}
                  />
                </div>
              </Modal>
            </div>
          );
        }}
      </Mutation>
    );
  }
}
