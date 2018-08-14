import React from 'react';
import { Row, Col, Tab, Nav, NavItem } from 'react-bootstrap';
import UserSearch from '../UserSearch/UserSearch.jsx';
import UserCalendar from '../UserCalendar/UserCalendar.jsx';
import UserTasks from '../UserTasks/UserTasks.jsx';
import UserProfile from '../UserProfile/UserProfile.jsx';

class UserTabs extends React.Component {
  render() {
    return (
      <Tab.Container id="user-tabs" defaultActiveKey="first">
        <Row className="clearfix">
          <Col sm={2}>
            <Nav bsStyle="pills" stacked>
              <NavItem eventKey="first">SEARCH</NavItem>
              <NavItem eventKey="second">SCHEDULE</NavItem>
              <NavItem eventKey="third">LISTS</NavItem>
              <NavItem eventKey="fourth">PROFILE</NavItem>
            </Nav>
          </Col>
          <Col sm={8}>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <UserSearch />
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <UserCalendar />
              </Tab.Pane>
              <Tab.Pane eventKey="third">
                <UserTasks />
              </Tab.Pane>
              <Tab.Pane eventKey="fourth">
                <UserProfile />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    );
  }
}

export default UserTabs;
