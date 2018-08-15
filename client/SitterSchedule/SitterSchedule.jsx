import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import SitterRequest from './SitterRequest.jsx';

export default class SitterSchedule extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      show: false
    }

    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }
  
  render () {
    return(
      <div>
        <p>SITTER SCHEDULE COMPONENT CONNECTED</p>
        <Button onClick={this.handleShow}>SITTER REQUEST</Button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <SitterRequest />
        </Modal>
      </div>
    )
  }
}