import React from 'react'
import {
  Modal,
  Button}
from 'react-bootstrap'
function AppointmentModal (props) {
  return (
    <Modal show = {props.show} onHide = {props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{props.currentEvent.username}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div> Status:     {props.currentEvent.status} </div>
        <div> Start Time: {props.currentEvent.start ? props.currentEvent.start.toLocaleDateString () + ', ' + props.currentEvent.start.toLocaleTimeString () : ''} </div>
        <div> Cost:       ${props.currentEvent.cost}</div>  
        <div> Instructions:
          <ul>
            {  
              (props.currentEvent.instructions) ?
                props.currentEvent.instructions.map (function (instruction) {return (<li>{instruction}</li>)})
                : <li>No Instructions</li>
            }
          </ul>
        </div>
      </Modal.Body>
      <Button onClick = {props.handleOpenCancel}>Cancel Appointment</Button>
    </Modal>
  )
}
export default AppointmentModal