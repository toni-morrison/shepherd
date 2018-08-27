import React from 'react';
import {
  Button,
  Grid,
  Row,
  Col,
  ToggleButtonGroup,
  ToggleButton,
  FormGroup,
  FormControl
} from 'react-bootstrap';
import UserSearchResults from './UserSearchResults.jsx';
import Datetime from 'react-datetime';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const FIND_SITTERS = gql`
  query findSitters(
    $day: String!
    $start: Int!
    $end: Int!
    $baby: Boolean!
    $pet: Boolean!
    $home: Boolean!
  ) {
    findSitters(
      day: $day
      start: $start
      end: $end
      baby: $baby
      pet: $pet
      home: $home
    ) {
      day
      sitter {
        id
        bio
        rating
        rates {
          child_rate
          child_addl
          pet_rate
          pet_addl
          home_rate
        }
        user {
          first_name
          last_name
        }
      }
    }
  }
`;
export default class UserSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: false,
      currentResults: [],
      findValues: [],
      currentDay: 'NonDay',
      currentStart: 0,
      currentEnd: 0,
      value: []
    };

    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.handleStartChange = this.handleStartChange.bind(this);
    this.handleEndChange = this.handleEndChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.dateObj = {
      0: 'Sunday',
      1: 'Monday',
      2: 'Tuesday',
      3: 'Wednesday',
      4: 'Thursday',
      5: 'Friday',
      6: 'Saturday'
    };
  }

  // changes searchResults to true/false for conditional render
  handleSearchClick(data) {
    this.setState({
      searchResults: !this.state.searchResults
    });
  }

  handleChange(e) {
    this.setState({ value: e });
  }

  handleStartChange(newDate) {
    let newMinutes = newDate._d.getHours() * 60 + newDate._d.getMinutes();
    let newDay = newDate._d.getDay();
    this.setState({
      currentStart: newMinutes,
      currentDay: this.dateObj[newDay]
    });
  }
  handleEndChange(newDate) {
    let newMinutes = newDate._d.getHours() * 60 + newDate._d.getMinutes();
    this.setState({
      currentEnd: newMinutes
    });
  }

  handleFindSelection(e) {
    this.setState({ value: e });
  }

  render() {
    if (this.state.searchResults === false) {
      return (
        <div>
          
          <Grid>
            <Row>
              <Col xs={6} xsOffset={3}>
                <center>
                  <h2>FIND A</h2>
                  <p>
                    <i>select all that apply</i>
                  </p>
                  <ToggleButtonGroup
                    type="checkbox"
                    value={this.state.value}
                    onChange={this.handleChange}
                  >
                    <ToggleButton value={'baby'}>Baby Sitter</ToggleButton>
                    <ToggleButton value={'pet'}>Pet Sitter</ToggleButton>
                    <ToggleButton value={'house'}>House Sitter</ToggleButton>
                  </ToggleButtonGroup>
                </center>
              </Col>
            </Row>
            <Row>
              <Col xs={6} xsOffset={3}>
                <center>
                  <h2>DATES</h2>
                  <div>
                    <div>Start Date/Time</div>
                    <Datetime
                      onChange={this.handleStartChange}
                      viewMode="time"
                    />
                  </div>{' '}
                  <div>
                    <div>End Date/Time</div>
                    <Datetime onChange={this.handleEndChange} viewMode="time" />
                  </div>
                </center>
              </Col>
            </Row>
            <Row>
              <Col xs={6} xsOffset={3}>
                <center>
                  <h2>LOCATION</h2>
                  <FormGroup>
                    <FormControl
                      type="text"
                      placeholder="Enter your address to find Sitters near you"
                    />
                  </FormGroup>
                </center>
              </Col>
            </Row>
            <Row>
              <Col xs={6} xsOffset={3}>
                <center>
                  <Button onClick={this.handleSearchClick}>SEARCH</Button>
                </center>
              </Col>
            </Row>
          </Grid>
        </div>
      );
    } else {
      return (
        <UserSearchResults
          handleSearchClick={this.handleSearchClick}
          reviews={this.state.currentResults}
          day = {this.state.currentDay}
          start = {this.state.currentStart}
          end = {this.state.currentEnd}
          values = {this.state.values}
          
        />
      );
    }
  }
}
