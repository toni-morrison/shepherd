import React from 'react';
import { Button, ButtonToolbar, Modal, Popover } from 'react-bootstrap';


const SitterRequest = props => (
  <div className="request-modal">
    <Modal.Dialog>
      <Modal.Header closeButton>
        <Modal.Title>Pending Request</Modal.Title>
      </Modal.Header>

      <h3>name: (props.name)</h3>
      <h3>date: (props.date)</h3>
      <h3>time: (props.time)</h3>
      <h3>total price: (props.price)</h3>
      <h3>lists: (props.list)</h3>
      <h3>message: (props.message)</h3>
      <button type="button">Accept</button>
      <button type="button">Decline</button>
    </Modal.Dialog>
    //will add tooltip on hover //of name;
  </div>
);


export default SitterRequest;
