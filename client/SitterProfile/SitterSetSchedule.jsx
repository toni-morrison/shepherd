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

var days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];
var hours = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

export default class SitterSetSchedule extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      Sunday: ['Start'],
      Monday: ['Start'],
      Tuesday: ['Start'],
      Wednesday: ['Start'],
      Thursday: ['Start'],
      Friday: ['Start'],
      Saturday: ['Start']
    }

    this.handleDatStartHour = this.handleDayStartHour.bind(this)
    this.handleStartMin = this.handleStartMin.bind(this)
  }

  handleDayStartHour(e, obj) {
    this.setState({
      [obj.day]: obj.hour
    })
  }

  handleStartMin(e, obj) {
    console.log('hitting')
    console.log(e.target.text)
    console.log(obj)
    // let spliced = this.state[obj.day].splice
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
                          <DropdownButton title={this.state[day][0]} id="dropdown-size-small">
                            {hours.map((hour) => {
                              return(
                                <MenuItem key={(day, hour)} value={hour} onClick={(e) => this.handleDayStartHour(e, {day, hour})}>{hour}</MenuItem>
                              )
                            })}
                          </DropdownButton>

                          <DropdownButton title="00" id="dropdown-size-small">
                            <MenuItem value="00" onClick={(e) => this.handleStartMin(e, {day})}>00</MenuItem>
                            <MenuItem value="30">30</MenuItem>
                          </DropdownButton>
                
                          <DropdownButton title="AM" id="dropdown-size-small">
                            <MenuItem value="AM">AM</MenuItem>
                            <MenuItem value="PM">PM</MenuItem>
                          </DropdownButton>
                        </Col>

                        <Col xs={3}>
                          <DropdownButton title="End" id="dropdown-size-small">
                            {hours.map((hour) => {
                              return(
                                <MenuItem key={hour} value={hour}>{hour}</MenuItem>
                              )
                            })}
                          </DropdownButton>
                
                          <DropdownButton title="00" id="dropdown-size-small">
                            <MenuItem value="00">00</MenuItem>
                            <MenuItem value="30">30</MenuItem>
                          </DropdownButton>
                
                          <DropdownButton title="AM" id="dropdown-size-small">
                            <MenuItem value="AM">AM</MenuItem>
                            <MenuItem value="PM">PM</MenuItem>
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
