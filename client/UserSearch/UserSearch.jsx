import React from 'react';
import {
  Grid,
  Row,
  Col,
  ToggleButtonGroup,
  ToggleButton
} from 'react-bootstrap';
import UserSearchResults from './UserSearchResults.jsx';
import Datetime from 'react-datetime';
import UserSearchQuery from './UserSearchQuery.jsx';
import UserSearchLocation from './UserSearchLocation.jsx';

export default class UserSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: false,
      currentResults: [],
      currentDay: 'NonDay',
      initStart: new Date(),
      initEnd: new Date(),
      skipped: false,
      currentStart: new Date().getHours() * 60 + new Date().getMinutes(),
      currentEnd: new Date().getHours() * 60 + new Date().getMinutes(),
      apntStart: '',
      apntEnd: '',
      value: [],
      address: '',
      long: undefined,
      lat: undefined
    };

    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.handleStartChange = this.handleStartChange.bind(this);
    this.handleEndChange = this.handleEndChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSuggest = this.handleSuggest.bind(this);
    this.handleInitAddress = this.handleInitAddress.bind(this);
    this.handleQuery = this.handleQuery.bind(this);
    this.handleBack = this.handleBack.bind(this);
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
  handleQuery(data) {
    this.setState(
      {
        currentResults: data
      },
      () => {
        console.log(this.state);
        this.handleSearchClick(data);
      }
    );
  }
  handleSearchClick(data) {
    this.setState({
      searchResults: !this.state.searchResults,
      skipped: false
    });
  }
  handleBack() {
    this.setState({
      searchResults: !this.state.searchResults
    });
  }

  handleChange(e) {
    this.setState({ value: e });
  }

  handleSuggest(suggest) {
    if (suggest) {
      this.setState({
        address: suggest.gmaps.formatted_address,
        long: suggest.location.lng,
        lat: suggest.location.lat
      });
    } else {
      this.setState({
        address: '',
        long: undefined,
        lat: undefined
      });
    }
  }

  handleInitAddress(address, lat, long) {
    this.setState({
      address,
      lat,
      long
    });
  }

  handleStartChange(newDate) {
    let newMonth = newDate._d.getMonth() + 1;
    newMonth = newMonth < 10 ? '0' + newMonth : '' + newMonth;
    let newYear = newDate._d.getFullYear();
    let newDay = newDate._d.getDate();
    newDay = newDay < 10 ? '0' + newDay : '' + newDay;
    let newDateString = newYear + '-' + newMonth + '-' + newDay;
    let newMinutes = newDate._d.getHours() * 60 + newDate._d.getMinutes();
    let DOW = newDate._d.getDay();

    this.setState({
      apntStart: newDateString,
      currentStart: newMinutes,
      currentDay: this.dateObj[DOW]
    });
  }
  handleEndChange(newDate) {
    let newMonth = newDate._d.getMonth() + 1;
    newMonth = newMonth < 10 ? '0' + newMonth : '' + newMonth;
    let newYear = newDate._d.getFullYear();
    let newDay = newDate._d.getDate();
    newDay = newDay < 10 ? '0' + newDay : '' + newDay;
    let newDateString = newYear + '-' + newMonth + '-' + newDay;
    let newMinutes = newDate._d.getHours() * 60 + newDate._d.getMinutes();
    let DOW = newDate._d.getDay();

    this.setState({
      apntEnd: newDateString,
      currentEnd: newMinutes,
      currentDay: this.dateObj[DOW]
    });
  }

  handleFindSelection(e) {
    this.setState({ value: e });
  }

  render() {
    if (this.state.searchResults === false) {
      return (
        <div>
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
                  <ToggleButton value={'baby'} id="button">Baby Sitter</ToggleButton>
                  <ToggleButton value={'pet'} id="button">Pet Sitter</ToggleButton>
                  <ToggleButton value={'house'} id="button">House Sitter</ToggleButton>
                </ToggleButtonGroup>
              </center>
            </Col>
          </Row>
          <Row>
            <center>
              <h2>DATES</h2>
            </center>
          </Row>
          <Row>
            <Col xs={3} xsOffset={3}>
              <center>
                <div>
                  <h4>Start Date/Time</h4>
                  <Datetime
                    onChange={this.handleStartChange}
                    viewMode="time"
                    defaultValue={this.state.initStart}
                    input={false}
                  />
                </div>
              </center>
            </Col>
            <Col xs={3}>
              <center>
                <div>
                  <h4>End Date/Time</h4>
                  <Datetime
                    onChange={this.handleEndChange}
                    viewMode="time"
                    defaultValue={this.state.initEnd}
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
                <UserSearchLocation
                  handleSuggest={this.handleSuggest}
                  handleInitAddress={this.handleInitAddress}
                  address={this.state.address}
                  email={this.props.user}
                />
              </center>
            </Col>
          </Row>
          <Row>
            <Col xs={6} xsOffset={3}>
              <center>
                <UserSearchQuery
                  currentDay={this.state.currentDay}
                  currentStart={this.state.currentStart}
                  currentEnd={this.state.currentEnd}
                  value={this.state.value}
                  handleQuery={this.handleQuery}
                  lat={this.state.lat}
                  long={this.state.long}
                  user={this.props.user}
                />
              </center>
            </Col>
          </Row>
        </div>
      );
    } else {
      return (
        <UserSearchResults
          handleSearchClick={this.handleBack}
          reviews={this.state.currentResults}
          day={this.state.currentDay}
          start={this.state.currentStart}
          end={this.state.currentEnd}
          values={this.state.value}
          lists={this.props.lists}
          startDate={this.state.apntStart}
          endDate={this.state.apntEnd}
          user={this.props.user}
        />
      );
    }
  }
}
