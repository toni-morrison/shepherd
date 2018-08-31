import React from 'react';
import { FIND_USER_APPOINTMENTS } from './CalendarQuery.jsx';
import { Query } from 'react-apollo';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import AppointmentModal from './AppointmentModal.jsx';
import CancelModal from './CancelModal.jsx';

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));
let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);

export default class UserCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
      cancelShow: false,
      events: [],
      currentEvent: {}
    };
    this.handleCloseApnt = this.handleCloseApnt.bind(this);
    this.handleCloseCancel = this.handleCloseCancel.bind(this);
    this.handleOpenCancel = this.handleOpenCancel.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleEventCancel = this.handleEventCancel.bind(this);
  }

  handleCloseCancel() {
    this.setState({
      cancelShow: false,
      modalShow: false
    });
  }

  handleOpenCancel() {
    this.setState({ cancelShow: true });
  }

  handleEventCancel() {
    console.log('canceling event ', this.state.currentEvent.appointmentID);
  }

  handleSelect(event) {
    this.setState({ currentEvent: event });
    this.setState({ modalShow: true });
  }

  handleCloseApnt() {
    this.setState({ modalShow: false });
  }

  render() {
    return (
      <Query
        query={FIND_USER_APPOINTMENTS}
        variables={{ userEmail: this.props.user }}
        pollInterval={500}
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
          data.findUserAppointments.map(function(timeInt) {
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
                timeInt.appointment.sitter.user.first_name +
                ' ' +
                timeInt.appointment.sitter.user.last_name
            });
          });

          return (
            <div>
              <BigCalendar
                events={tempData}
                views={allViews}
                step={60}
                showMultiDayTimes
                selectable
                onSelectEvent={this.handleSelect}
              />
              <AppointmentModal
                show={this.state.modalShow}
                handleClose={this.handleCloseApnt}
                currentEvent={this.state.currentEvent}
                handleOpenCancel={this.handleOpenCancel}
              />
              <CancelModal
                show={this.state.cancelShow}
                event={this.state.currentEvent}
                handleClose={this.handleCloseCancel}
                handleEventCancel={this.handleEventCancel}
              />
            </div>
          );
        }}
      </Query>
    );
  }
}
