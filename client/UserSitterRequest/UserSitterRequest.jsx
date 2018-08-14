import React from 'react';
import {
  Button,
  ButtonToolbar,
  Modal,
  Popover,
  OverlayTrigger
} from 'react-bootstrap';

export default class UserSitterRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
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
        id="userPicture"
        src="https://d7n0myfi538ky.cloudfront.net/production/users/2971/small/image1_1491361573.JPG?1491361573"
      />
    );

    const namePopover = (
      <Popover id="modal-popover" title="Joana BabbyCarer">
        {sitterPic}
        <br />
        Other users have rated her 4.5/5
      </Popover>
    );

    const listPopover = (
      <Popover id="modal-popover" title="Instructions List">
        <div>
          <ul>
            <li>Take out the dog</li>
            <li>Give Mikey medicine</li>
            <li>Take the kids to the park with the dog</li>
            <li>Watch TV </li>
            <li>Put Mikey to bed at 8:30</li>
            <li>Put Tracey to bed at 9:30</li>
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
        <Button bsStyle="primary" bsSize="large" onClick={this.handleShow}>
          Show Request
        </Button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Pending Request</Modal.Title>
          </Modal.Header>

          <h3>
            Name:{' '}
            <OverlayTrigger overlay={namePopover}>
              <a href="#popover">Joana BabbyCarer</a>
            </OverlayTrigger>
          </h3>
          <h3>Date: August, 21st 2018</h3>
          <h3>Time: 5:30pm to 10:00pm</h3>
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
          <Button bsStyle="primary" bsSize="large" onClick={this.handleClose}>
            Accept
          </Button>
          <Button bsStyle="primary" bsSize="large" onClick={this.handleClose}>
            Decline
          </Button>
        </Modal>
      </div>
    );
  }
}
