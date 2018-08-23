import React from 'react';
import { Button, Grid, Row, Col, ToggleButtonGroup, ToggleButton, FormGroup, FormControl } from 'react-bootstrap';
import UserSearchResults from './UserSearchResults.jsx';
import Datetime from 'react-datetime'
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const FIND_SITTERS = gql `
  query findSitters {
    findSitters {
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
      currentStart : '',
      currendEnd: ''
    }

    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.handleStartChange = this.handleStartChange.bind(this);
    this.handleEndChange = this.handleEndChange.bind(this);
//    this.searchSitters = this.searchSitters.bind(this);
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

//  variables = {{day: "sun", start: 721, end: 722}}
//  searchSitters () {
//    return (
//        <Query query = {FIND_SITTERS}
//            variables = {{day: "sun", start: 721, end: 722}}>
//          {
//            ({ loading, error, data }) => {
//              if (loading) {
//                return <p>...Loading</p>
//              }
//              if (error) {
//                
//                return <p>Error: </p>
//              }
//              console.log ('data: ', data)
//              let sitterData = [];
//              data.findSitters.map ((interval) => {
//                sitterData.push (interval.sitter)
//              })
//              this.setState (
//                {
//                  currentResults: sitterData
//                }
//              )
//              return <p>Data: </p>
//            }
//          }
//        </Query>)
//  }
  
  // changes searchResults to true/false for conditional render
  handleSearchClick() {
    this.setState({
      searchResults: !this.state.searchResults
    });
//              variables = {{day: "sun", start: 721, end: 722}}>
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
              let sitterData = [];
              data.findSitters.map ((interval) => {
                sitterData.push (interval.sitter)
              })
//              this.setState (
//                {
//                  searchResults: sitterData
//                }
//              )
              return <p>Data: </p>
            }
          }
        </Query>)
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
                <div><div>Start Date/Time</div><Datetime onChange = {this.handleStartChange} viewMode = 'time'/></div>     <div><div>End Date/Time</div><Datetime onChange = {this.handleEndChange} viewMode = 'time'/></div>
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
      return <UserSearchResults handleSearchClick={this.handleSearchClick} reviews = {this.state.currentResults} />;
    }
  }
}
