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
    super(props);
  }

  render() {
    return (
      <div>
        <Row>
          <Col xs={12}>
            <center>
              <h3>Schedule</h3>
            </center>
            <Well bsSize="large" style={{ width: '100%' }}>
              {days.map(day => {
                return (
                  <div key={day}>
                    <Col xs={2}>
                      <h4>{day}</h4>
                    </Col>

                    <ButtonToolbar>
                      <Col xs={3}>
                        <DropdownButton title="Start" id="dropdown-size-small">
                          {hours.map(hour => {
                            return (
                              <MenuItem key={hour} value={(day, hour)}>
                                {hour}
                              </MenuItem>
                            );
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

                      <Col xs={3}>
                        <DropdownButton title="End" id="dropdown-size-small">
                          {hours.map(hour => {
                            return (
                              <MenuItem key={hour} value={hour}>
                                {hour}
                              </MenuItem>
                            );
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
                );
              })}
              <br />
              <Col xs={9} xsOffset={2}>
                <center>
                  <Button>Submit/Update</Button>
                </center>
              </Col>
              <br />
            </Well>
          </Col>
        </Row>
      </div>
    );
  }
}
