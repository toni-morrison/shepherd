import React from 'react';
import {
  Button,
  Modal,
  Popover,
  OverlayTrigger,
  Row,
  Image
} from 'react-bootstrap';
import AcceptMutation from './AcceptMutation.jsx';
import RejectMutation from './RejectMutation.jsx';
import InstructionsQuery from './InstructionsQuery.jsx';

export default class SitterRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      startDate: new Date(props.currentEvent.start),
      endDate: new Date(props.currentEvent.end)
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
    const namePopover = (
      <Popover id="modal-popover" title={this.props.currentEvent.username}>
        <Image
          src={this.props.currentEvent.pic_url}
          style={{ width: '20vh', maxHeight: '20vh' }}
        />
        <br />
        {this.props.currentEvent.userRating
          ? 'Other sitters have rated ' +
            this.props.currentEvent.username +
            ' ' +
            this.props.currentEvent.userRating +
            '/5'
          : 'This user has not yet been rated!'}
      </Popover>
    );

    return (
      <div className="request-modal">
        <Modal.Header closeButton>
          <Modal.Title>{this.props.currentEvent.status} Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <h3>
              Name:{' '}
              <OverlayTrigger overlay={namePopover}>
                <a href="#popover">{this.props.currentEvent.username}</a>
              </OverlayTrigger>
            </h3>
          </Row>
          <Row>
            <h3>
              Date: {new Date(this.props.currentEvent.start).toDateString()}
            </h3>
          </Row>
          <Row>
            <h3>
              Time:{' '}
              {new Date(this.props.currentEvent.start).toLocaleTimeString(
                'en-US'
              )}{' '}
              to{' '}
              {new Date(this.props.currentEvent.end).toLocaleTimeString(
                'en-US'
              )}
            </h3>
          </Row>
          <Row>
            <h3>Total Price: ${this.props.currentEvent.cost} </h3>
          </Row>
          <Row>
            <h3>List: </h3>
            {this.props.currentEvent.instructionsName ? (
              <InstructionsQuery
                id={this.props.currentEvent.instructionsID}
                name={this.props.currentEvent.instructionsName}
              />
            ) : (
              'N/A'
            )}
          </Row>
          <Row>
            <h3>Message: {this.props.currentEvent.comment}</h3>
          </Row>
          <Row>
            <h3>User's Rating: {this.props.currentEvent.userRating}</h3>
          </Row>
          {this.props.currentEvent.status === 'Pending' ? (
            <Row>
              <AcceptMutation
                apntID={this.props.currentEvent.appointmentID}
                handleClose={this.props.handleClose}
              />
              <RejectMutation
                apntID={this.props.currentEvent.appointmentID}
                handleClose={this.props.handleClose}
              />
            </Row>
          ) : (
            <Button
              bsStyle="primary"
              bsSize="large"
              onClick={this.props.handleOpenCancel}
            >
              Cancel Appointment
            </Button>
          )}
        </Modal.Body>
      </div>
    );
  }
}
