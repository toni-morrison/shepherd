import React from 'react';
import {
  Button,
  ButtonToolbar,
  Modal,
  Popover,
  OverlayTrigger
} from 'react-bootstrap';
import AcceptMutation from './AcceptMutation.jsx'

export default class SitterRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      startDate: new Date (props.currentEvent.start),
      endDate: new Date (props.currentEvent.end)
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);

  }

  handleClose() {
    this.setState({
      show: false
    });
  }
  handleShow() {
    this.setState({
      show: true
    });
  }


  
  render() {
    //all information will passed to this component, for now dummy data
    const sitterPic = (
      <img
        id="sitterPicture"
        src={this.props.currentEvent.pic_url}
      />
    );
    const sitterRating = this.props.currentEvent.rating;
    const userComment = this.props.currentEvent.comment
    const namePopover = (
      <Popover id="modal-popover" title={this.props.currentEvent.username}>
        {sitterPic}
        <br />
        {sitterRating ? ("Other sitters have rated her" + sitterRating + "//5") : ""}
      </Popover>
    );

    const listPopover = (
      <Popover id="modal-popover" title="Instructions List">
        <div>
          <ul>
              {
                this.props.currentEvent.instructions ? this.props.currentEvent.instructions.map (
                  (instruction) => <li>{instruction}</li>) : <li>No Instructions Given</li>
              }
          </ul>
        </div>
      </Popover>
    );

    const messagePopover = (
      this.props.currentEvent.comment ? 
      (<Popover id="modal-popover" title="Message">
        <p>
          {this.props.currentEvent.comment}
        </p>
      </Popover>)
      : (<span />)

    );

    return (
      <div className="request-modal">
          <Modal.Header closeButton>
            <Modal.Title>{this.props.currentEvent.status} Request</Modal.Title>
          </Modal.Header>

          <h3>
            Name:{' '}
            <OverlayTrigger overlay={namePopover}>
              <a href="#popover">{this.props.currentEvent.username}</a>
            </OverlayTrigger>
          </h3>
          <h3>Date: {new Date (this.props.currentEvent.start).toDateString()}</h3>
          <h3>Time: {new Date (this.props.currentEvent.start).toLocaleTimeString('en-US')} to {new Date (this.props.currentEvent.end).toLocaleTimeString('en-US')}</h3>
          <h3>Total Price: ${this.props.currentEvent.cost} </h3>

          <h3>
            List:{' '}
            <OverlayTrigger overlay={listPopover}>
              <a href="#popover">Instructions</a>
            </OverlayTrigger>
          </h3>
          <h3>
            Message:{' '}
            <OverlayTrigger overlay={messagePopover}>
              <a href="#popover">Thank you!</a>
            </OverlayTrigger>
          </h3>
          {this.props.currentEvent.status === 'Pending' ? <div>
            <AcceptMutation 
              apntID = {this.props.currentEvent.appointmentID}
              handleClose = {this.props.handleClose}
              />
            <Button bsStyle="primary" bsSize="large" onClick={this.props.handleReject}>
            Decline
          </Button></div> 
          : <Button
              bsStyle="primary" 
              bsSize="large"
              onClick = {this.props.handleOpenCancel}>
          Cancel Appointment</Button>}
      </div>
    );
  }
}