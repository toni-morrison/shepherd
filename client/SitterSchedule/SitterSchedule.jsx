import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import SitterRequest from './SitterRequest.jsx';
import BigCalendar from 'react-big-calendar';
import CalendarQuery from './CalendarQuery.jsx';
import moment from 'moment'
import events from './events.js'
export default class SitterSchedule extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      show: false,
      skipped: false,
      events: [],
      currentEvent: {},
    }
    BigCalendar.setLocalizer (BigCalendar.momentLocalizer (moment))
    this.allViews = Object.keys (BigCalendar.Views).map(k => BigCalendar.Views[k])

    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleAccept = this.handleAccept.bind(this)
    this.handleReject = this.handleReject.bind(this)
    this.handleQuery = this.handleQuery.bind(this);
  }
  
  handleAccept () {
    this.state.currentEvent.status = 'ACCEPTED';
    this.state.currentEvent.title = this.state.currentEvent.status + ': ' + this.state.currentEvent.username
    this.setState ({currentEvent: this.state.currentEvent})
  }
  
  handleQuery (data) {
    this.setState ({
      events: data,
      skipped: true
    })
  }
  
  handleReject () {
    for (var i = 0; i < events.length; i++) {
      if (events[i].id === this.state.currentEvent.id) {
        events.splice (i, 1)
        break;
      }
    }
    this.setState ({
      currentEvent: {
        instructions: []
      },
      show: false
    })
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow(event) {
    this.setState({ show: true,
                    currentEvent: event});
    
  }
  
  
  render () {
    this.state.events.forEach (
      (event) => event.title = event.status + ': ' + event.username
    )
    return(
      <div>
        {this.state.skipped ? 
          <span></span> 
          : <CalendarQuery handleQuery = {this.handleQuery} user = {this.props.user} />}
        <BigCalendar 
          events = {this.state.events}
          views = {this.allViews}
          step = {60}
          showMultiDayTimes
          Selectable
          onSelectEvent = {this.handleShow}/>
        <Button onClick={this.handleShow}>SITTER REQUEST</Button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <SitterRequest currentEvent = {this.state.currentEvent} handleAccept = {this.handleAccept} handleReject = {this.handleReject}/>
        </Modal>
      </div>
    )
  }
}