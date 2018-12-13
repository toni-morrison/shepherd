import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import InstructionsQuery from '../SitterSchedule/InstructionsQuery.jsx';

function AppointmentModal(props) {
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{props.currentEvent.sittername}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <h3>Status: {props.currentEvent.status}</h3>
        </div>
        <div>
          <h3>
            Start Time:{' '}
            {props.currentEvent.start
              ? props.currentEvent.start.toLocaleDateString() +
                ', ' +
                props.currentEvent.start.toLocaleTimeString()
              : ''}
          </h3>
        </div>
        <div>
          <h3>Cost: ${props.currentEvent.cost}</h3>
        </div>
        <div>
          {' '}
          <h3>
            Instructions:{' '}
            {props.currentEvent.instructionsName ? (
              <InstructionsQuery
                id={props.currentEvent.instructionsID}
                name={props.currentEvent.instructionsName}
              />
            ) : (
              'N/A'
            )}
          </h3>
        </div>
      </Modal.Body>
      <Button
        disabled={
          props.currentEvent.status === 'Paid' ||
          props.currentEvent.status === 'Complete'
        }
        bsStyle="primary"
        bsSize="large"
        onClick={props.handleOpenCancel}
      >
        {props.currentEvent.status === 'Rejected'
          ? 'Remove Appointment'
          : 'Cancel Appointment'}
      </Button>
    </Modal>
  );
}
export default AppointmentModal;
