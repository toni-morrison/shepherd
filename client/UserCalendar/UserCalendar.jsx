import React from 'react'
import BigCalendar from 'react-big-calendar'
import {Modal} from 'react-bootstrap'
import moment from 'moment'
import dates from './dates.js'
import events from './events.js'
import AppointmentModal from './AppointmentModal.jsx'
import CancelModal from './CancelModal.jsx'
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
const FIND_APPOINTMENTS = gql `
  query findAppointments ($userID: String!) {
    findAppointments (userID: $userID) {
      start  
      end
      day
      appointment {
        id
        pending
        app_types
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
            first_name
            last_name
          }
        }
        user {
          id
        }
      }
    }
  }
`;


export default class UserCalendar extends React.Component {
  constructor (props) {
      super(props)

      this.state = {
        modalShow: false,
        cancelShow: false,
        events: events,
        currentEvent: {},
        skipped: false
      }
    BigCalendar.setLocalizer(BigCalendar.momentLocalizer (moment))
    this.allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])
    events.forEach (
      (event) => event.title = event.status + ': ' + event.sittername
    )
    this.handleCloseApnt = this.handleCloseApnt.bind(this)
    this.handleCloseCancel = this.handleCloseCancel.bind(this)
    this.handleOpenCancel = this.handleOpenCancel.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.handleEventCancel = this.handleEventCancel.bind(this)
  }
  
  handleCloseCancel () {
    this.setState ({cancelShow: false})
  }
  handleOpenCancel () {
    console.log ('cancelShow: ', this.state.cancelShow)
    this.setState ({cancelShow: true})
  }
  
  handleEventCancel () {
    console.log ('canceling event ', this.state.currentEvent.appointmentID)
  }
  
  handleSelect (event) {
    this.setState({currentEvent: event})
    this.setState ({modalShow: true})
  }
  
  handleCloseApnt () {
    this.setState({modalShow: false})
  }
  
  

  render () {
    return (<div>
      <Query query = {FIND_APPOINTMENTS} skip = {this.state.skipped} variables = {{userID: "cjl5aqepp6jy80784fhlrlmjb"}} >
        {
          ({ loading, error, data }) => {
            if (loading) {
              return <span></span>
            }
            if (error) {
              return <span></span>
            }
            console.log ('data: ', data)
            let tempData = []
            data.findAppointments.map (
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
                tempData.push ({
                  allDay: false,
                  appointmentID: timeInt.appointment.id,
                  start: startTime,
                  end: endTime,
                  userID: timeInt.appointment.user.id,
                  sitterID: timeInt.appointment.sitter.id,
                  status: timeInt.appointment.pending,
                  username: timeInt.appointment.sitter.user.first_name + ' ' + timeInt.appointment.sitter.user.last_name,
                  instructionID: (timeInt.appointment.todoList !== null ? timeInt.appointment.todoList.id : null)
                })
              }
            )
            console.log ('tempData: ', tempData)
            console.log ('skipped: ', this.state.skipped)
            this.setState ({
              events: tempData    
            })
            return <span></span>
          }
        }
      </Query>
      <BigCalendar
        events={this.state.events}
        views={this.allViews}
        step={60}
        showMultiDayTimes
        selectable
        onSelectEvent={this.handleSelect}
      />
      <AppointmentModal 
        show = {this.state.modalShow} 
        handleClose = {this.handleCloseApnt} 
        currentEvent = {this.state.currentEvent} 
        handleOpenCancel = {this.handleOpenCancel}/>
      <CancelModal 
        show = {this.state.cancelShow} 
        handleClose = {this.handleCloseCancel} 
        handleEventCancel = {this.handleEventCancel}/>
      </div>)
  }
}