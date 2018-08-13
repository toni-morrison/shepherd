import React from 'react';
import { Button } from 'react-bootstrap';
import UserSearchResults from './UserSearchResults.jsx';

export default class UserSearch extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      searchResults: false
    }

    this.handleSearchClick = this.handleSearchClick.bind(this);
  }

  // changes searchResults to true/false for conditional render
  handleSearchClick() {
    this.setState({
      searchResults: !this.state.searchResults
    })
  }

  render() {
    if (this.state.searchResults === false) {
      return (
        <div>
          <p>USER SEARCH COMPONENT</p>
          <Button onClick={this.handleSearchClick}>SEARCH</Button>
        </div>
      )
    } else {
      return (
        <UserSearchResults handleSearchClick={this.handleSearchClick}/>
      )
    }
  }
}
