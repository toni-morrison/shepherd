import React from 'react'
import {
  Modal,
  Button}
from 'react-bootstrap'
function CancelModal (props) {
  return (
    <Modal show = {props.show} onHide = {props.handleClose}>
      <Modal.Body>Are you sure you want to cancel this appointment?</Modal.Body>
      <Button>Yes, Cancel It</Button>
      <Button>No, Do Not Cancel</Button>
    </Modal>
  )
}
export default CancelModal