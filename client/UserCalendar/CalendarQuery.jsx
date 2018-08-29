import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { ApolloProvider } from "react-apollo";

const FIND_USER_APPOINTMENTS = gql `
  query findUserAppointments ($userEmail: String!) {
    findUserAppointments (userEmail: $userEmail) {
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
        todoList {
          id
        }
        sitterRating
        sitter {
          id
          rates {
            child_rate
            pet_rate
            home_rate
          }
          user {
            email
            first_name
            last_name
          }
        }
        user {
          email
          id
        }
      }
    }
  }
`;
function CalendarQuery (props) {
  console.log ()
  return (<Query 
            query = {FIND_USER_APPOINTMENTS} 
            variables = {{userEmail: props.user}} >
        {
          ({ loading, error, data }) => {
            if (loading) {
              return <span></span>
            }
            if (error) {
              return <span></span>
            }
            console.log ('data, User Query: ', data)
            let tempData = []
            data.findUserAppointments.map (
              function (timeInt) {
                let startMin = timeInt.start % 60;
                let endMin = timeInt.end % 60;
                startMin = (startMin < 10 ? '0' + startMin : '' + startMin)
                endMin = (endMin < 10 ? '0' + endMin : '' + endMin)
                let startHour = Math.floor (timeInt.start / 60);
                let endHour = Math.floor (timeInt.end / 60);
                startHour = (startHour < 10 ? '0' + startHour : '' + startHour)
                endHour = (endHour < 10 ? '0' + endHour : '' + endHour)
                let startTime = timeInt.day + 'T' + startHour + ':' + startMin + ':00'
                let endTime = timeInt.day + 'T' + endHour + ':' + endMin + ':00'
                startTime = new Date (startTime)
                endTime = new Date (endTime)
                console.log ('startTime: ', startTime)
                console.log ('endTime: ', endTime)
                let cost = 0;
                for (var i = 0; i < timeInt.appointment.app_types.length; i++) {
                  cost += ((timeInt.start - timeInt.End) / 60) * timeInt.appointment.sitter.rates [timeInt.appointment.app_types[i] + '_rate']
                }
                tempData.push ({
                  allDay: false,
                  cost: timeInt.appointment.price,
                  appointmentID: timeInt.appointment.id,
                  start: startTime,
                  end: endTime,
                  userID: timeInt.appointment.user.id,
                  sitterID: timeInt.appointment.sitter.id,
                  status: timeInt.appointment.status,
                  username: timeInt.appointment.sitter.user.first_name + ' ' + timeInt.appointment.sitter.user.last_name,
                  instructionID: (timeInt.appointment.todoList !== null ? timeInt.appointment.todoList.id : null),
                  sittername: timeInt.appointment.sitter.user.first_name + ' ' + timeInt.appointment.sitter.user.last_name
                })
              }
            )
            console.log ('tempData, User: ', tempData)
            props.handleQuery (tempData)
        return <span />;
      }}
    </Query>
  );
}
export default CalendarQuery;
