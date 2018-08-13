import React from 'react';
import { Row, Col, Tab, Nav, NavItem } from 'react-bootstrap';
import UserSearch from '../UserSearch/UserSearch.jsx';


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
            <Tab.Content animation>
              <Tab.Pane eventKey="first"><UserSearch /></Tab.Pane>
              <Tab.Pane eventKey="second">SCHEDULE COMPONENT</Tab.Pane>
              <Tab.Pane eventKey="third">LISTS COMPONENT</Tab.Pane>
              <Tab.Pane eventKey="fourth">PROFILE COMPONENT</Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    );
  }
}

export default UserTabs;