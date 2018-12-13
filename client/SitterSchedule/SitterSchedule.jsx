import React from 'react';
import { Modal } from 'react-bootstrap';
import SitterRequest from './SitterRequest.jsx';
import BigCalendar from 'react-big-calendar';
import { Query } from 'react-apollo';
import { FIND_SITTER_APPOINTMENTS } from './CalendarQuery.jsx';
import CancelModal from './CancelModal.jsx';
import moment from 'moment';
import events from './events.js';

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));
let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);

export default class SitterSchedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      events: [],
      currentEvent: {},
      cancelShow: false
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleCloseCancel = this.handleCloseCancel.bind(this);
    this.handleOpenCancel = this.handleOpenCancel.bind(this);
  }

  handleCloseCancel() {
    this.setState({
      cancelShow: false,
      show: false
    });
  }

  handleOpenCancel() {
    this.setState({
      cancelShow: true
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
    return (
      <Query
        query={FIND_SITTER_APPOINTMENTS}
        variables={{ sitterEmail: this.props.user }}
        pollInterval={50}
      >
        {({ loading, error, data }) => {
          if (loading) {
            return <span />;
          }
          if (error) {
            console.log(error);
            return <span />;
          }

          let tempData = [];
          if (data) {
            data.findSitterAppointments.map(function(timeInt) {
              let startMin = timeInt.start % 60;
              let endMin = timeInt.end % 60;
              startMin = startMin < 10 ? '0' + startMin : '' + startMin;
              endMin = endMin < 10 ? '0' + endMin : '' + endMin;
              let startHour = Math.floor(timeInt.start / 60);
              let endHour = Math.floor(timeInt.end / 60);
              startHour = startHour < 10 ? '0' + startHour : '' + startHour;
              endHour = endHour < 10 ? '0' + endHour : '' + endHour;
              let startTime =
                timeInt.day + 'T' + startHour + ':' + startMin + ':00';
              let endTime = timeInt.day + 'T' + endHour + ':' + endMin + ':00';
              startTime = new Date(startTime);
              endTime = new Date(endTime);

              tempData.push({
                allDay: false,
                cost: timeInt.appointment.price,
                appointmentID: timeInt.appointment.id,
                start: startTime,
                end: endTime,
                userID: timeInt.appointment.user.id,
                sitterID: timeInt.appointment.sitter.id,
                status: timeInt.appointment.status,
                username:
                  timeInt.appointment.user.first_name +
                  ' ' +
                  timeInt.appointment.user.last_name,
                sittername:
                  timeInt.appointment.sitter.user.first_name +
                  ' ' +
                  timeInt.appointment.sitter.user.last_name,
                instructionsID: timeInt.appointment.todoList
                  ? timeInt.appointment.todoList.id
                  : undefined,
                instructionsName: timeInt.appointment.todoList
                  ? timeInt.appointment.todoList.name
                  : undefined,
                comment: timeInt.appointment.comment,
                userAppRating: timeInt.appointment.userRating,
                userAppReview: timeInt.appointment.userReview,
                sitterAppRating: timeInt.appointment.sitterRating,
                sitterAppReview: timeInt.appointment.sitterReview,
                sitterRating: timeInt.appointment.sitter.rating,
                userRating: timeInt.appointment.user.rating,
                sitterRating: timeInt.appointment.sitter.rating,
                pic_url: timeInt.appointment.user.pic_url,
                sitter_pic_url: timeInt.appointment.sitter.user.pic_url,
                title:
                  timeInt.appointment.status +
                  ': ' +
                  timeInt.appointment.user.first_name +
                  ' ' +
                  timeInt.appointment.user.last_name
              });
            });
          }
          return (
            <div>
              <BigCalendar
                events={tempData}
                views={allViews}
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
        }}
      </Query>
    );
  }
}
