import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import SitterRequest from './SitterRequest.jsx';
import BigCalendar from 'react-big-calendar';
import moment from 'moment'
import events from './events.js'

export default class SitterSchedule extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      show: false,
      currentEvent: {},
    }
    BigCalendar.setLocalizer (BigCalendar.momentLocalizer (moment))
    this.allViews = Object.keys (BigCalendar.Views).map(k => BigCalendar.Views[k])
    events.forEach (
      (event) => event.title = event.status + ': ' + event.username
    )
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleAccept = this.handleAccept.bind(this)
    this.handleReject = this.handleReject.bind(this)
  }
  
  handleAccept () {
    
  }
  
  handleReject () {
    
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow(event) {
    this.setState({ show: true,
                    currentEvent: event});
    
  }
  
  render () {
    return(
      <div>
        <BigCalendar 
          events = {events}
          views = {this.allViews}
          step = {60}
          showMultiDayTimes
          Selectable
          onSelectEvent = {this.handleShow}/>
        <Button onClick={this.handleShow}>SITTER REQUEST</Button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <SitterRequest currentEvent = {this.state.currentEvent}/>
        </Modal>
      </div>
    )
  }
}