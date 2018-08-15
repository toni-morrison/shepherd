import React from 'react'
import {Modal} from 'react-bootstrap'
function AppointmentModal (props) {
  return (
    <Modal show = {props.show} onHide = {props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{props.currentEvent.username}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Status:     {props.currentEvent.status}
        Start Time: {props.currentEvent.start}
        Cost:       ${props.currentEvent.cost}
      </Modal.Body>
    </Modal>
  )
}
export default AppointmentModal