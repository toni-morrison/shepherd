import React from 'react';
import { Row, Col, Tab, Nav, NavItem } from 'react-bootstrap';

export default class SitterTabs extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      key: 1
    };
  }

  handleSelect(key) {
    alert(`selected ${key}`);
    this.setState({ key });
  }

  render() {
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

            </Nav>
          </Col>
          <Col sm={8}>
            <Tab.Content animation>
              <Tab.Pane eventKey="first">HOME COMPONENT</Tab.Pane>
              <Tab.Pane eventKey="second">METRICS COMPONENT</Tab.Pane>
              <Tab.Pane eventKey="third">REVIEWS COMPONENT</Tab.Pane>
              <Tab.Pane eventKey="fourth">SCHEDULE COMPONENT</Tab.Pane>
              <Tab.Pane eventKey="fifth">PROFILE COMPONENT</Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    );
  }
}