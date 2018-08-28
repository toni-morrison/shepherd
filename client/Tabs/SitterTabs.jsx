import React from 'react';
import { Row, Col, Tab, Nav, NavItem } from 'react-bootstrap';
import SitterHome from '../SitterHome/SitterHome.jsx';
import SitterMetrics from '../SitterMetrics/SitterMetrics.jsx';
import SitterReviews from '../SitterReviews/SitterReviews.jsx';
import SitterSchedule from '../SitterSchedule/SitterSchedule.jsx';
import SitterProfile from '../SitterProfile/SitterProfile.jsx';
import firebase from '../../server/firebase/firebase.js';

export default class SitterTabs extends React.Component {
  constructor(props) {
    super(props);
  }
  sitLogOut() {
    firebase
      .auth()
      .signOut()
      .catch(err => {
        console.log('ERROR!');
      });
  }

  render() {
    if (!this.props.sitterId) {
      return null;
    } else {
      return (
        <Tab.Container id="sitter-tabs" defaultActiveKey="first">
          <Row className="clearfix">
            <Col sm={2}>
              <Nav bsStyle="pills" stacked>
                <NavItem eventKey="first">HOME</NavItem>
                <NavItem eventKey="second">METRICS</NavItem>
                <NavItem eventKey="third">REVIEWS</NavItem>
                <NavItem eventKey="fourth">SCHEDULE</NavItem>
                <NavItem eventKey="fifth">PROFILE</NavItem>
                <NavItem onClick={() => this.sitLogOut()}>LOGOUT</NavItem>
              </Nav>
            </Col>
            <Col sm={8}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <SitterHome user={this.props.user} />
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <SitterMetrics user={this.props.user} />
                </Tab.Pane>
                <Tab.Pane eventKey="third">
                  <SitterReviews user={this.props.user} />
                </Tab.Pane>
                <Tab.Pane eventKey="fourth">
                  <SitterSchedule user={this.props.user} />
                </Tab.Pane>
                <Tab.Pane eventKey="fifth">
                  <SitterProfile user={this.props.user} sitterId={this.props.sitterId} />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      );
    }
  }
}
