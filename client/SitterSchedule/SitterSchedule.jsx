import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import SitterRequest from './SitterRequest.jsx';
import BigCalendar from 'react-big-calendar';
import CalendarQuery from './CalendarQuery.jsx';
import CancelModal from './CancelModal.jsx';
import moment from 'moment';
import events from './events.js';
export default class SitterSchedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      skipped: false,
      events: [],
      currentEvent: {},
      cancelShow: false
    };
    BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));
    this.allViews = Object.keys(BigCalendar.Views).map(
      k => BigCalendar.Views[k]
    );
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleQuery = this.handleQuery.bind(this);
    this.handleCloseCancel = this.handleCloseCancel.bind(this);
    this.handleOpenCancel = this.handleOpenCancel.bind(this);
  }

  handleCloseCancel() {
    this.setState({
      cancelShow: false,
      skipped: true
    });
  }

  handleOpenCancel() {
    this.setState({
      cancelShow: true
    });
  }

  handleQuery(data) {
    this.setState({
      events: data,
      skipped: true
    });
  }

  handleReject() {
    for (var i = 0; i < events.length; i++) {
      if (events[i].id === this.state.currentEvent.id) {
        events.splice(i, 1);
        break;
      }
    }
    this.setState({
      currentEvent: {
        instructions: []
      },
      show: false
    });
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow(event) {
    this.setState({
      show: true,
      currentEvent: event
    });
  }

  render() {
    this.state.events.forEach(
      event => (event.title = event.status + ': ' + event.username)
    );
    return (
      <div>
        {this.state.skipped ? (
          <span />
        ) : (
          <CalendarQuery
            handleQuery={this.handleQuery}
            user={this.props.user}
          />
        )}
        <BigCalendar
          events={this.state.events}
          views={this.allViews}
          step={60}
          showMultiDayTimes
          Selectable
          onSelectEvent={this.handleShow}
        />
        <Modal show={this.state.show} onHide={this.handleClose}>
          <SitterRequest
            currentEvent={this.state.currentEvent}
            handleClose={this.handleClose}
            handleOpenCancel={this.handleOpenCancel}
          />
        </Modal>
        <CancelModal
          show={this.state.cancelShow}
          event={this.state.currentEvent}
          handleClose={this.handleCloseCancel}
          apntID={this.state.currentEvent.appointmentID}
        />
      </div>
    );
  }
}
