import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const FIND_SITTER_APPOINTMENTS = gql`
  query findSitterAppointments($sitterEmail: String!) {
    findSitterAppointments(sitterEmail: $sitterEmail) {
      start
      end
      day
      appointment {
        id
        price
        children
        pets
        comment
        app_types
        status
        userRating
        userReview
        sitterRating
        sitterReview
        todoList {
          id
          name
        }
        sitter {
          id
          rating
          rates {
            child_rate
            pet_rate
            home_rate
          }
          user {
            id
            email
            first_name
            last_name
            rating
            pic_url
          }
        }
        user {
          id
          first_name
          last_name
          email
          rating
          pic_url
        }
      }
    }
  }
`;

function CalendarQuery(props) {
  return (
    <Query
      query={FIND_SITTER_APPOINTMENTS}
      variables={{ sitterEmail: props.user }}
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
            sitter_pic_url: timeInt.appointment.sitter.user.pic_url
          });
        });
        props.handleQuery(tempData);
        return <span />;
      }}
    </Query>
  );
}
export default CalendarQuery;
