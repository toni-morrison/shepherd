import React from 'react';
import { Modal } from 'react-bootstrap';

class InstructionsModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal show={this.props.showModal} onHide={this.props.toggleModal}>
        <Modal.Header>{this.props.name}</Modal.Header>
        <Modal.Body>
          <ul>
            {this.props.instructions ? (
              this.props.instructions.map(instruction => (
                <li key={instruction.time + instruction.desc}>
                  {instruction.time}: {instruction.desc}
                </li>
              ))
            ) : (
              <li>No Instructions Given</li>
            )}
          </ul>
        </Modal.Body>
      </Modal>
    );
  }
}

export default InstructionsModal;
