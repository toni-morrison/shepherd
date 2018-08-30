import React from 'react';
import { Row, Col, Tab, Nav, NavItem, Modal, Button } from 'react-bootstrap';
import { Query, ApolloConsumer } from 'react-apollo';
// import SitterTabs from './SitterTabs';
import { FIND_APPOINTMENTS } from '../SitterMetrics/MetricsHelper.js';

export default class SitterTabsQuery extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>hello</div>;
  }
}

// <ApolloConsumer>
// {client => {
//   return(
//   <SitterTabs

//     user={this.props.user}
//     sitterId={sitterId}
//     userPic={this.props.userPic}
//   />

//   )
// }}

// </ApolloConsumer>
