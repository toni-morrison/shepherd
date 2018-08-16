import React from 'react';
import { ButtonToolbar, Grid, Row, Col, Well, DropdownButton, MenuItem } from 'react-bootstrap';



export default class SitterSetSchedule extends React.Component {
  constructor(props) {
    super(props);
  }
  
  
  render() {
    var hours = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'] 
    return(
      <div>
        <Grid>
          <Row inline>
            <Col xs={12}>
            <center><h3>Schedule</h3></center>}
            </Col>
              <Well bsSize="large" style={{ width:'100%' }}>
              <Col xs={1}>
                <h4>Sunday:</h4>
                </Col>
                <ButtonToolbar>
                <Col xs={3}>
                    <DropdownButton title="Start" id="dropdown-size-small">
                      {hours.map((hour) => {
                        return(
                          <MenuItem value={hour}>{hour}</MenuItem>
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
                <Col xs={3}>
                    <DropdownButton title="Finish" id="dropdown-size-small">
                      {hours.map((hour) => {
                        return(
                          <MenuItem value={hour}>{hour}</MenuItem>
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
                  <br/>
                <h4>Monday:</h4> 
                  <br/>
                <h4>Tuesday:</h4> 
                  <br/>
                <h4>Wednesday:</h4> 
                  <br/>
                <h4>Thursday:</h4> 
                  <br/>
                <h4>Friday:</h4> 
                  <br/>
                <h4>Saturday:</h4> 
                  <br/>
                {/* <Button onClick={this.handleInfoUpdate}>Click to Update</Button> */}
              </Well>
          </Row>
        </Grid>
      </div>
    )
  }
}
