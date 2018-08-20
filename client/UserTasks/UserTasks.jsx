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
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const CREATE_LIST = gql`
  mutation createList($email: String!, $name: String!) {
    createList(email: $email, name: $name) {
      id
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
      showInstructions: false
    };
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleTasksSelect = this.handleTasksSelect.bind(this);
    this.handleTasksEdit = this.handleTasksEdit.bind(this);
    this.handleCloseInstructions = this.handleCloseInstructions.bind(this);
    this.handleOpenInstructions = this.handleOpenInstructions.bind(this);
  }

  handleTasksSelect(instructions, ID) {
    this.setState({
      modalShow: true,
      currentInstruction: instructions,
      currentListId: ID,
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
        email: 'daniel.guan.bca@gmail.com',
        name: 'testFromJS'
      }
    }).then(({ data }) => {
      this.setState(
        {
          currentListId: data.createList.id
        },
        () => {
          this.handleOpenInstructions();
        }
      );
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
                  {instructions.map(instructionSet => (
                    <Col key={instructionSet.title} md={4}>
                      <Button
                        bsSize="large"
                        block
                        onClick={function() {
                          this.handleTasksSelect(
                            instructionSet.instructions,
                            instructionSet.instructionID
                          );
                        }.bind(this)}
                      >
                        {instructionSet.title}
                      </Button>
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
                  <Modal.Title>Add Instructions</Modal.Title>
                </Modal.Header>
                <div>
                  <InstructionMaker
                    currentInstruction={this.state.currentInstruction}
                    currentListId={this.state.currentListId}
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
