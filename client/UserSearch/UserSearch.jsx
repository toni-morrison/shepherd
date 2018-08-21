import React from 'react';
import { Button, Grid, Row, Col, ToggleButtonGroup, ToggleButton, FormGroup, FormControl } from 'react-bootstrap';
import UserSearchResults from './UserSearchResults.jsx';
import Datetime from 'react-datetime'
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const FIND_SITTERS = gql `
  query findSitters {
    findSitters {
      id,
      sun,
      mon,
      tues,
      wed,
      thurs,
      fri,
      sat,
      gCalID
    }
  }
`;

export default class UserSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: false,
      findValues: [],
      currentStart : '',
      currendEnd: ''
    }

    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.handleStartChange = this.handleStartChange.bind(this);
    this.handleEndChange = this.handleEndChange.bind(this);
    this.searchSitters = this.searchSitters.bind(this);
    this.dateObj = {
      0: 'sun',
      1: 'mon',
      2: 'tues',
      3: 'wed',
      4: 'thurs',
      5: 'fri',
      6: 'sat'
    }
  }

  
  searchSitters () {
      return (
        <Query query = {FIND_SITTERS}>
          {
            ({ loading, error, data }) => {
              if (loading) {
                return <p>...Loading</p>
              }
              if (error) {
                return <p>Error: </p>
              }
              console.log ('data: ', data)


              return <p>Data: </p>
            }
          }
        </Query>)
  }
  
  // changes searchResults to true/false for conditional render
  handleSearchClick() {
    this.setState({
      searchResults: !this.state.searchResults
    });
  }

  handleStartChange (newDate) {
    this.setState({
      currentStart: newDate._d
    })
  }
  handleEndChange (newDate) {
    this.setState({
      currentEnd: newDate._d
    })
  }
  
  handleFindSelection(e) {
    this.setState({ value: e });
  }

  render() {
    
    if (this.state.searchResults === false) {
      return (
      <div>
        {this.searchSitters()}
          <Grid>
            <Row>
              <Col xs={6} xsOffset={3}>
              <center>
                <h2>FIND A</h2>
                <p><i>select all that apply</i></p>
                <ToggleButtonGroup type="checkbox" value={this.state.value} onChange={this.handleChange}>
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
                <div><Datetime onChange = {this.handleStartChange}/></div>     <div><Datetime onChange = {this.handleEndChange}/></div>
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
                  // value={}
                  // onChange={SUMFUNCTION}
                  placeholder='Enter your address to find Sitters near you' />
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
      return <UserSearchResults handleSearchClick={this.handleSearchClick} users = {this.state.searchResults} />;
    }
  }
}
