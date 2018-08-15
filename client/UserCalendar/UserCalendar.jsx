import React from 'react'
import BigCalendar from 'react-big-calendar'
import {Modal} from 'react-bootstrap'
import moment from 'moment'
import dates from './dates.js'
import events from './events.js'
import AppointmentModal from './AppointmentModal.jsx'
import CancelModal from './CancelModal.jsx'
export default class UserCalendar extends React.Component {
  constructor (props) {
      super(props)

      this.state = {
        modalShow: false,
        cancelShow: false,
        currentEvent: {}
      }
    BigCalendar.setLocalizer(BigCalendar.momentLocalizer (moment))
    this.allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])
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
      <BigCalendar
        events={events}
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