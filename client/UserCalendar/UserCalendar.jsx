import React from 'react'
import BigCalendar from 'react-big-calendar'
import {Modal} from 'react-bootstrap'
import moment from 'moment'
import dates from './dates.js'
import events from './events.js'
import AppointmentModal from './AppointmentModal.jsx'
import CancelModal from './CancelModal.jsx'
import CalendarQuery from './CalendarQuery.jsx'
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

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
    this.handleQuery = this.handleQuery.bind(this)
  }
  handleQuery (data) {
    this.setState ({
      events: data,
      skipped: true
    })
  }
  
  handleCloseCancel () {
    this.setState ({cancelShow: false})
  }
  
  handleOpenCancel () {
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
    this.state.events.forEach (
      (event) => event.title = event.status + ': ' + event.sittername
    )
    return (<div>
      {this.state.skipped ? 
          <span></span> 
          : <CalendarQuery handleQuery = {this.handleQuery} user = {this.props.user} />}
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
        event = {this.state.currentEvent}
        handleClose = {this.handleCloseCancel} 
        handleEventCancel = {this.handleEventCancel}/>
      </div>)
  }
}