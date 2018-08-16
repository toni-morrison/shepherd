import React from 'react';
import {
  Modal
} from 'react-bootstrap'
function TasksModal (props) {
  return (
    <Modal show = {props.show} onHide = {props.handleClose}>
      <Modal.Body>Are you sure you want to cancel this appointment?</Modal.Body>
    </Modal>
  )
}
export default TasksModal