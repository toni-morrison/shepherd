import React from 'react'
import BigCalendar from 'react-big-calendar'
import {Modal} from 'react-bootstrap'
import moment from 'moment'
import dates from './dates.js'
import events from './events.js'
import AppointmentModal from './AppointmentModal.jsx'
export default class UserCalendar extends React.Component {
  constructor (props) {
    super(props)
    
    this.state = {
      modalShow: false,
      currentEvent: {}
    }
  BigCalendar.setLocalizer(BigCalendar.momentLocalizer (moment))
  this.allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])
  this.handleClose = this.handleClose.bind(this)
  this.handleSelect = this.handleSelect.bind(this)
  }
  
  handleSelect (event) {
    this.setState({currentEvent: event})
    this.setState ({modalShow: true})
  }
  
  handleClose () {
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
      <AppointmentModal show = {this.state.modalShow} handleClose = {this.handleClose} currentEvent = {this.state.currentEvent}/>
      </div>)
  }
}