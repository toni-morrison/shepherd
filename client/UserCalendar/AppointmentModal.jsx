import React from 'react'
import {Modal} from 'react-bootstrap'
function AppointmentModal (props) {
  let trackerObj = ''
  if (props.currentEvent.instructions) {
    props.currentEvent.instructions.forEach ((instruction) => trackerObj += instruction)
  }
  console.log (trackerObj)
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
                : <li>Instruction Here</li>
            }
          </ul>
        </div>
      </Modal.Body>
      
    </Modal>
  )
}
export default AppointmentModal