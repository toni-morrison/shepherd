import React from 'react';
import { Row, Col, Well, Button } from 'react-bootstrap';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import SitterSetSchedule from './SitterSetSchedule.jsx';

let days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

const GET_SITTER_SCHEDULE = gql`
  query getSitterSchedule(
    $id: String!
  ) {
    getSitterSchedule(
      id: $id
    ) {
      day
      start
      end
    }
  }
`

export default class SitterViewSchedule extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      set: false
    }

    this.handleSetSchedule = this.handleSetSchedule.bind(this)
  }
  
  handleSetSchedule() {
    this.setState({ set: !this.state.set })
  }

  render() {
    return (
      <Query query={GET_SITTER_SCHEDULE}
      variables={{id: this.props.id}}
      pollInterval={500}>
        {({ loading, error, data }) => {
          if (loading) {
            return <p>Loading...</p>;
          }
          if (error) {
            return <p>Error</p>;
          }
          if (this.state.set === false) {
            return (
              <div>
                <Row>
                  <Col xs={12}>
                    <center><h3>Schedule</h3></center>
                      <Well bsSize="large" style={{ width:'100%' }}>
                      {data.getSitterSchedule.map((day) => {
                        let startHour, startMin, startAm, endHour, endMin, endAm;

                        (Math.floor(day.start/60) % 12 === 0) ? startHour = 12 : startHour = Math.floor(day.start/60) % 12;
                        startMin = day.start % 60;
                        (startMin === 0) ? startMin = '00' : startMin = '30';
                        (day.start <= 719) ? startAm = 'AM' : startAm = 'PM';

                        (Math.floor(day.end/60) % 12 === 0) ? endHour = 12 : endHour = Math.floor(day.end/60) % 12;
                        endMin = day.end % 60;
                        (endMin === 0) ? endMin = '00' : endMin = '30';
                        (day.end <= 719) ? endAm = 'AM' : endAm = 'PM';

                        return(
                          <div key={day.day}>
                          <Row>
                          <Col xs={2}>
                            <h4>{day.day}</h4>
                          </Col>

                          <Col xs={2}>
                            <h4> {startHour} : {startMin} {startAm}</h4>
                          </Col>

                          <Col xs={1}>
                            <h4>TO</h4>
                          </Col>

                          <Col xs={2}>
                            <h4> {endHour} : {endMin} {endAm}</h4>
                          </Col>
                          </Row>
                          </div>
                        )
                      })}
                        <br/>
                          <Button onClick={this.handleSetSchedule}>Click to Update</Button>
                        <br/>
                      </Well>
                  </Col>
                </Row>
              </div>
            )
          } else {
            return (
              <SitterSetSchedule
              id={this.props.id}
              handleSetSchedule={this.handleSetSchedule}
              schedule={data.getSitterSchedule}/>
            )
          }
        }}
      </Query>
    )
  }
}
