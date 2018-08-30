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
        <div> Status: {props.currentEvent.status} </div>
        <div>
          {' '}
          Start Time:{' '}
          {props.currentEvent.start
            ? props.currentEvent.start.toLocaleDateString() +
              ', ' +
              props.currentEvent.start.toLocaleTimeString()
            : ''}{' '}
        </div>
        <div> Cost: ${props.currentEvent.cost}</div>
        <div>
          {' '}
          Instructions:
          {props.currentEvent.instructionsName ? (
            <InstructionsQuery
              id={props.currentEvent.instructionsID}
              name={props.currentEvent.instructionsName}
            />
          ) : (
            'N/A'
          )}
        </div>
      </Modal.Body>
      <Button 
        bsStyle="primary" 
        bsSize="large"
        onClick={props.handleOpenCancel}>
        Cancel Appointment</Button>
    </Modal>
  );
}
export default AppointmentModal;
