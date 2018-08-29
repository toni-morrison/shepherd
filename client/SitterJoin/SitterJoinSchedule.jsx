import React from 'react';
import {
  FormGroup,
  FormControl,
  Row,
  Col,
  Well,
  Button
} from 'react-bootstrap';
import { days } from './Days.js';

export default class SitterJoinSchedule extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showErr: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.checkValid = this.checkValid.bind(this);
  }

  handleChange(e, day, start, end) {
    e.target.name = day;
    var currentDay = this.props[e.target.name];
    currentDay =
      currentDay.substring(0, start) +
      e.target.value +
      currentDay.substring(end);
    this.props.handleInput(e, currentDay);
  }

  checkValid(e) {
    var valid = true;
    days.forEach(day => {
      // Convert string to numerical representation in minutes
      var start =
        (parseInt(this.props[day].substring(0, 2)) % 12) * 60 +
        parseInt(this.props[day].substring(3, 5)) +
        (this.props[day].substring(5, 7) === 'PM') * 720;
      var end =
        (parseInt(this.props[day].substring(8, 10)) % 12) * 60 +
        parseInt(this.props[day].substring(11, 13)) +
        (this.props[day].substring(13, 15) === 'PM') * 720;
      if (end < start) {
        valid = false;
      }
    });
    if (!valid) {
      this.setState({ showErr: true });
    } else {
      this.props.handleSubmit();
    }
  }

  render() {
    return (
      <div className="sitterJoinSchedule">
        <Row>
          <Col xs={12}>
            <center>
              <h3>Schedule</h3>
            </center>
            <Well bsSize="large" style={{ width: '100%' }}>
              {days.map(day => {
                return (
                  <Row key={day}>
                    <Col xs={2}>
                      <h4>{day}</h4>
                    </Col>
                    <Col xs={8}>
                      <Col xs={6}>
                        <FormGroup controlId="formControlsSelect">
                          <FormControl
                            componentClass="select"
                            placeholder="Hour"
                            defaultValue="Hour"
                            onChange={e => this.handleChange(e, day, 0, 2)}
                          >
                            {[...Array(12).keys()].map(hour => {
                              return (
                                <option
                                  key={hour}
                                  value={
                                    parseInt(hour) < 10 ? '0' + hour : hour
                                  }
                                >
                                  {parseInt(hour) === 0
                                    ? '12'
                                    : parseInt(hour) < 10
                                      ? '0' + hour
                                      : hour}
                                </option>
                              );
                            })}
                          </FormControl>

                          <FormControl
                            componentClass="select"
                            placeholder="Min"
                            onChange={e => this.handleChange(e, day, 3, 5)}
                          >
                            {[...Array(2).keys()].map(min => {
                              return (
                                <option
                                  key={min}
                                  value={
                                    parseInt(min * 30) < 10
                                      ? '0' + min
                                      : min * 30
                                  }
                                >
                                  {parseInt(min * 30) < 10
                                    ? '0' + min
                                    : min * 30}
                                </option>
                              );
                            })}
                          </FormControl>

                          <FormControl
                            componentClass="select"
                            placeholder="Hour"
                            onChange={e => this.handleChange(e, day, 5, 7)}
                          >
                            <option
                              value="AM"
                              onClick={e => this.handleStartAm(e, { day })}
                            >
                              AM
                            </option>
                            <option
                              value="PM"
                              onClick={e => this.handleStartAm(e, { day })}
                            >
                              PM
                            </option>
                          </FormControl>
                        </FormGroup>
                      </Col>

                      <Col xs={6}>
                        <FormGroup controlId="formControlsSelect">
                          <FormControl
                            componentClass="select"
                            placeholder="Hour"
                            onChange={e => this.handleChange(e, day, 8, 10)}
                          >
                            {[...Array(12).keys()].map(hour => {
                              return (
                                <option
                                  key={hour}
                                  value={
                                    parseInt(hour) < 10 ? '0' + hour : hour
                                  }
                                >
                                  {parseInt(hour) === 0
                                    ? '12'
                                    : parseInt(hour) < 10
                                      ? '0' + hour
                                      : hour}
                                </option>
                              );
                            })}
                          </FormControl>

                          <FormControl
                            componentClass="select"
                            placeholder="Min"
                            onChange={e => this.handleChange(e, day, 11, 13)}
                          >
                            {[...Array(2).keys()].map(min => {
                              return (
                                <option
                                  key={min}
                                  value={
                                    parseInt(min * 30) < 10
                                      ? '0' + min
                                      : min * 30
                                  }
                                >
                                  {parseInt(min * 30) < 10
                                    ? '0' + min
                                    : min * 30}
                                </option>
                              );
                            })}
                          </FormControl>

                          <FormControl
                            componentClass="select"
                            placeholder="Hour"
                            onChange={e => this.handleChange(e, day, 13, 15)}
                          >
                            <option
                              value="AM"
                              onClick={e => this.handleStartAm(e, { day })}
                            >
                              AM
                            </option>
                            <option
                              value="PM"
                              onClick={e => this.handleStartAm(e, { day })}
                            >
                              PM
                            </option>
                          </FormControl>
                        </FormGroup>
                      </Col>
                    </Col>
                  </Row>
                );
              })}
              <Button
                name="schedule"
                bsStyle="default"
                type="button"
                onClick={this.props.handleNavPrev}
              >
                Prev
              </Button>
              <Button
                name="schedule"
                bsStyle="primary"
                type="button"
                onClick={this.checkValid}
                style={{ float: 'right' }}
              >
                Submit
              </Button>
            </Well>
          </Col>
        </Row>
      </div>
    );
  }
}
