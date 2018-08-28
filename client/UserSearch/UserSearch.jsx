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
      apntStart: '',
      apntEnd: '',
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
    let newMonth = newDate._d.getMonth();
    newMonth = newMonth < 10 ? '0' + newMonth : '' + newMonth;
    let newYear = newDate._d.getFullYear();
    let newDay = newDate;
    newDay = newDay < 10 ? '0' + newDay : '' + newDay;
    let newDateString = newMonth + ' ' + newDay + ' ' + newYear;
    let newMinutes = newDate._d.getHours() * 60 + newDate._d.getMinutes();
    this.setState({
      apntStart: newDateString,
      currentStart: newMinutes,
      currentDay: this.dateObj[newDay]
    });
  }
  handleEndChange(newDate) {
    let newMonth = newDate._d.getMonth();
    newMonth = newMonth < 10 ? '0' + newMonth : '' + newMonth;
    let newYear = newDate._d.getFullYear();
    let newDay = newDate;
    newDay = newDay < 10 ? '0' + newDay : '' + newDay;
    let newDateString = newMonth + ' ' + newDay + ' ' + newYear;
    let newMinutes = newDate._d.getHours() * 60 + newDate._d.getMinutes();
    this.setState({
      apntEnd: newDateString,
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
          <Query
            query={FIND_SITTERS}
            variables={{
              day: this.state.currentDay,
              start: this.state.currentStart,
              end: this.state.currentEnd,
              baby: this.state.value.includes('baby'),
              pet: this.state.value.includes('pet'),
              home: this.state.value.includes('house')
            }}
          >
            {({ loading, error, data }) => {
              if (loading) {
                return <span />;
              }
              if (error) {
                console.log('error: ', error);
                return <span />;
              }
              let sitterData = [];
              data.findSitters.map(interval =>
                sitterData.push(interval.sitter)
              );
              this.state.currentResults = sitterData;
              return <span />;
            }}
          </Query>
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
                    <h4>Start Date/Time</h4>
                    <Datetime
                      onChange={this.handleStartChange}
                      viewMode="time"
                      value={new Date()}
                      input={false}
                    />
                  </div>{' '}
                  <div>
                    <h4>End Date/Time</h4>
                    <Datetime
                      onChange={this.handleEndChange}
                      viewMode="time"
                      value={new Date()}
                      input={false}
                    />
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
          day={this.state.currentDay}
          start={this.state.apntStart}
          end={this.state.apntEnd}
          values={this.state.values}
        />
      );
    }
  }
}
