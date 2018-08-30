import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import CancelMutation from './CancelMutation.jsx';

function CancelModal(props) {
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Body>
        {props.event.status === 'Rejected'
          ? 'Are you sure you want to remove this appointment?'
          : 'Are you sure you want to cancel this appointment?'}
      </Modal.Body>
      <CancelMutation
        apntID={props.event.appointmentID}
        handleClose={props.handleClose}
      />
      <Button onClick={props.handleClose}>
        {props.event.status === 'Rejected'
          ? 'No, do not remove'
          : 'No, do not cancel'}
      </Button>
    </Modal>
  );
}
export default CancelModal;
