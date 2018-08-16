import React from 'react';
import { Button, Grid, Row, Col, ToggleButtonGroup, ToggleButton, FormGroup, FormControl } from 'react-bootstrap';
import UserSearchResults from './UserSearchResults.jsx';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

// const aQuery = (
//   <Query query={gql`
//     {
//       findUsersByFirstName(first_name: "Dan") {
//         id
//         first_name
//         last_name
//       }
//     }
//   `}
//   >
//     {({ loading, error, data }) => {
//       if (loading) return <p>Loading...</p>;
//       if (error) return <p>Error :</p>;

//       return data.findUsersByFirstName.map(({ id, first_name, last_name }) => (
//         <div key={id}>
//           <p>{`${id} : ${first_name} ${last_name}`}</p>
//         </div>
//       ))
//     }}
//   </Query>
// )

export default class UserSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: false,
      findValues: []
    }

    this.handleSearchClick = this.handleSearchClick.bind(this);
  }

  // changes searchResults to true/false for conditional render
  handleSearchClick() {
    this.setState({
      searchResults: !this.state.searchResults
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
          {/* {aQuery} */}
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
                <p>THERE WILL BE A MAGICAL CALENDAR HERE</p>
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
      return <UserSearchResults handleSearchClick={this.handleSearchClick} />;
    }
  }
}
