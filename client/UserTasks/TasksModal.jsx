import React from 'react';
import {
  Modal,
  Button
} from 'react-bootstrap'
function TasksModal (props) {
  console.log (props.instructions)
  return (
    <Modal show = {props.show} onHide = {props.handleClose}>
      <Modal.Body>
        <ul>
          {props.instructions.map (function (instruction) { return (<li>{instruction[0]} : {instruction[1]}</li>)})}
        </ul>
        <Button></Button>
      </Modal.Body>
    </Modal>
  )
}
export default TasksModal