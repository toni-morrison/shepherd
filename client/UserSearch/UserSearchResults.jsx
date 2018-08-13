import React from 'react';
import { Button } from 'react-bootstrap';


export default class UserSearchResults extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <p>USER SEARCH RESULTS COMPONENT</p>
        <Button onClick={this.props.handleSearchClick}>SEARCH AGAIN</Button>
      </div>
    )
  }
}
