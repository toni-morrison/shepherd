import React from 'react';
import {
  Button,
  ButtonToolbar,
  Modal,
  Popover,
  OverlayTrigger
} from 'react-bootstrap';

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
        src="https://secure.gravatar.com/avatar/d850b1b3ba6566142f958048a998cf0a?s=96&d=mm&r=g"
      />
    );

    const namePopover = (
      <Popover id="modal-popover" title="Debbie Childparent">
        {sitterPic}
        <br />
        Other sitters have rated her 4.5/5
      </Popover>
    );

    const listPopover = (
      <Popover id="modal-popover" title="Instructions List">
        <div>
          <ul>
              {
                this.props.currentEvent.instructions.map (
                  (instruction) => <li>{instruction}</li>)
              }
          </ul>
        </div>
      </Popover>
    );

    const messagePopover = (
      <Popover id="modal-popover" title="Message">
        <p>
          Thank you so much for doing this! If you want anything to eat, please
          order a pizza on us!
        </p>
      </Popover>
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
          <h3>Total Price: $175 </h3>

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
          {this.props.currentEvent.status === 'PENDING' ? <div><Button bsStyle="primary" bsSize="large" onClick={this.props.handleAccept}>
            Accept
          </Button>
            <Button bsStyle="primary" bsSize="large" onClick={this.props.handleReject}>
            Decline
          </Button></div> : <Button>Cancel Appointment</Button>}
      </div>
    );
  }
}