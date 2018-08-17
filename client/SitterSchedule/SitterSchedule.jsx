import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import SitterRequest from './SitterRequest.jsx';
//import BigCalendar from 'react-big-calendar';
//import moment from 'moment'

export default class SitterSchedule extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      show: false,
      sitterInfo
    }
//    BigCalendar.setLocalizer (BigCalendar.momentLocalizer (moment))
//    this.allViews = Object.keys (BigCalendar.Views).map(k => BigCalendar.Views[k])
//            <BigCalendar 
//          events = {[]}
//          views = {this.allViews}
//          step = {60}
//          showMultiDayTimes
//          Selectable/>
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }
  
  render () {
    return(
      <div>

        <Button onClick={this.handleShow}>SITTER REQUEST</Button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <SitterRequest />
        </Modal>
      </div>
    )
  }
}