import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import CancelMutation from './CancelMutation.jsx';

function CancelModal(props) {
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Body>Are you sure you want to cancel this appointment?</Modal.Body>
      <CancelMutation apntID={props.apntID} handleClose={props.handleClose} />
      <Button onClick={props.handleClose}>No, Do Not Cancel</Button>
    </Modal>
  );
}
export default CancelModal;
