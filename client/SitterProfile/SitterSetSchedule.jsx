import React from 'react';
import {
  ButtonToolbar,
  Grid,
  Row,
  Col,
  Well,
  DropdownButton,
  MenuItem,
  Button
} from 'react-bootstrap';

let days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];
let hours = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

export default class SitterSetSchedule extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      Sunday: {startHour: 'Start', startMin: '00', startAm: 'AM', endHour: 'End', endMin: '00', endAm: 'AM'},
      Monday: {startHour: 'Start', startMin: '00', startAm: 'AM', endHour: 'End', endMin: '00', endAm: 'AM'},
      Tuesday: {startHour: 'Start', startMin: '00', startAm: 'AM', endHour: 'End', endMin: '00', endAm: 'AM'},
      Wednesday: {startHour: 'Start', startMin: '00', startAm: 'AM', endHour: 'End', endMin: '00', endAm: 'AM'},
      Thursday: {startHour: 'Start', startMin: '00', startAm: 'AM', endHour: 'End', endMin: '00', endAm: 'AM'},
      Friday: {startHour: 'Start', startMin: '00', startAm: 'AM', endHour: 'End', endMin: '00', endAm: 'AM'},
      Saturday: {startHour: 'Start', startMin: '00', startAm: 'AM', endHour: 'End', endMin: '00', endAm: 'AM'}
    }

    this.handleDayStartHour = this.handleDayStartHour.bind(this)
    this.handleStartMin = this.handleStartMin.bind(this)
    this.handleStartAm = this.handleStartAm.bind(this)
    this.handleDayEndHour = this.handleDayEndHour.bind(this)
    this.handleEndMin = this.handleEndMin.bind(this)
    this.handleEndAm = this.handleEndAm.bind(this)
  }

  handleDayStartHour(e, obj) {
    var currentDay = Object.assign(this.state[obj.day])
    currentDay.startHour = obj.hour
    this.setState({
      [obj.day]: currentDay
    })
  }

  handleStartMin(e, obj) {
    var currentDay = Object.assign(this.state[obj.day])
    currentDay.startMin = e.target.text
    this.setState({
      [obj.day]: currentDay
    })
  }

  handleStartAm(e, obj) {
    var currentDay = Object.assign(this.state[obj.day])
    currentDay.startAm = e.target.text
    this.setState({
      [obj.day]: currentDay
    })
  }

  handleDayEndHour(e, obj) {
    var currentDay = Object.assign(this.state[obj.day])
    currentDay.endHour = obj.hour
    this.setState({
      [obj.day]: currentDay
    })
  }

  handleEndMin(e, obj) {
    var currentDay = Object.assign(this.state[obj.day])
    currentDay.endMin = e.target.text
    this.setState({
      [obj.day]: currentDay
    })
  }

  handleEndAm(e, obj) {
    var currentDay = Object.assign(this.state[obj.day])
    currentDay.endAm = e.target.text
    this.setState({
      [obj.day]: currentDay
    })
  }


  render() {
    return (
      <div>
        <Row>
          <Col xs={12}>
            <center><h3>Schedule</h3></center>
              <Well bsSize="large" style={{ width:'100%' }}>
                {days.map((day) => {
                  return(
                    <div key={day}>
                      <Col xs={2}>
                        <h4>{day}</h4>
                      </Col>

                      <ButtonToolbar>
                        <Col xs={3}>
                          <DropdownButton title={this.state[day]['startHour']} id="dropdown-size-small">
                            {hours.map((hour) => {
                              return(
                                <MenuItem key={(day, hour)} onClick={(e) => this.handleDayStartHour(e, {day, hour})}>{hour}</MenuItem>
                              )
                            })}
                          </DropdownButton>

                          <DropdownButton title={this.state[day]['startMin']} id="dropdown-size-small">
                            <MenuItem value="00" onClick={(e) => this.handleStartMin(e, {day})}>00</MenuItem>
                            <MenuItem value="30" onClick={(e) => this.handleStartMin(e, {day})}>30</MenuItem>
                          </DropdownButton>
                
                          <DropdownButton title={this.state[day]['startAm']} id="dropdown-size-small">
                            <MenuItem value="AM" onClick={(e) => this.handleStartAm(e, {day})}>AM</MenuItem>
                            <MenuItem value="PM" onClick={(e) => this.handleStartAm(e, {day})}>PM</MenuItem>
                          </DropdownButton>
                        </Col>

                        <Col xs={3}>
                          <DropdownButton title={this.state[day]['endHour']} id="dropdown-size-small">
                            {hours.map((hour) => {
                              return(
                                <MenuItem key={(day, hour)} onClick={(e) => this.handleDayEndHour(e, {day, hour})}>{hour}</MenuItem>
                              )
                            })}
                          </DropdownButton>
                
                          <DropdownButton title={this.state[day]['endMin']} id="dropdown-size-small">
                            <MenuItem value="00" onClick={(e) => this.handleEndMin(e, {day})}>00</MenuItem>
                            <MenuItem value="30" onClick={(e) => this.handleEndMin(e, {day})}>30</MenuItem>
                          </DropdownButton>
                
                          <DropdownButton title={this.state[day]['endAm']}  id="dropdown-size-small">
                            <MenuItem value="AM" onClick={(e) => this.handleEndAm(e, {day})}>AM</MenuItem>
                            <MenuItem value="PM" onClick={(e) => this.handleEndAm(e, {day})}>PM</MenuItem>
                          </DropdownButton>
                        </Col>
                      </ButtonToolbar>
                    </div>
                  )
                })}
                <br/>
                  <Button>Click to Update</Button>
                <br/>
              </Well>
          </Col>
        </Row>
      </div>
    );
  }
}
