import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Mutation, Query } from 'react-apollo';
import { DELETE_INSTRUCTIONS, DELETE_TODO } from './ApolloHelper.jsx';

export default class TasksModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(deleteInstructions, deleteTodo) {
    deleteInstructions({
      variables: {
        id: this.props.currentListId
      }
    }).then(({ data }) => {
      console.log(data);
      deleteTodo({
        variables: {
          id: this.props.currentListId
        }
      }).then(({ data }) => {
        this.props.closeModal();
        console.log(data);
      });
    });
  }
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Body>
          <ul>
            {this.props.instructions.map(instruction => {
              return (
                <li>
                  {instruction[0]} : {instruction[1]}
                </li>
              );
            })}
          </ul>
          <Button onClick={this.props.handleEdit}>Edit Tasks</Button>
          <Mutation mutation={DELETE_INSTRUCTIONS}>
            {(deleteInstructions, { loading, error, data }) => {
              if (loading) {
                return <p>Loading</p>;
              }
              if (error) {
                return <p>Error</p>;
              }
              return (
                <Mutation mutation={DELETE_TODO}>
                  {(deleteTodo, { loading, error, data }) => {
                    if (loading) {
                      return <p>Loading</p>;
                    }
                    if (error) {
                      return <p>Error</p>;
                    }
                    return (
                      <Button
                        type="button"
                        onClick={() => {
                          this.handleDelete(deleteInstructions, deleteTodo);
                        }}
                      >
                        Delete
                      </Button>
                    );
                  }}
                </Mutation>
              );
            }}
          </Mutation>
        </Modal.Body>
      </Modal>
    );
  }
}
