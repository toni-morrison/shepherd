import React from 'react';
import { Row, Col, Tab, Nav, NavItem } from 'react-bootstrap';
import SitterJoinBio from './SitterJoinBio.jsx';
import SitterJoinPrices from './SitterJoinPrices.jsx';
import SitterJoinSchedule from './SitterJoinSchedule.jsx';

export default class SitterJoin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currItem: 'bio',
      bio: '',
      child: '',
      childAddl: '',
      pet: '',
      petAddl: '',
      house: '',
      sun: '',
      mon: '',
      tues: '',
      wed: '',
      thurs: '',
      fri: '',
      sat: ''
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleNavPrev = this.handleNavPrev.bind(this);
    this.handleNavNext = this.handleNavNext.bind(this);
  }

  handleInput(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleNavPrev(e) {
    if (e.target.name === 'pricing') {
      this.setState({
        currItem: 'bio'
      });
    } else if (e.target.name === 'schedule') {
      this.setState({ currItem: 'pricing' });
    }
  }

  handleNavNext(e) {
    if (e.target.name === 'bio') {
      this.setState({ currItem: 'pricing' });
    } else if (e.target.name === 'pricing') {
      this.setState({ currItem: 'schedule' });
    } else if (e.target.name === 'schedule') {
      console.log('submitted');
    }
  }

  render() {
    if (this.props.sitterId) {
      return null;
    } else {
      return (
        <div className="sitterJoin">
          <center>
            <h3>Sitter Application</h3>
          </center>
          <Tab.Container
            id="signupContainer"
            activeKey={this.state.currItem}
            onSelect={key => this.setState({ currItem: key })}
          >
            <div>
              <Col sm={12}>
                <Nav bsStyle="pills" justified>
                  <NavItem eventKey="bio">Bio</NavItem>
                  <NavItem
                    eventKey="pricing"
                    disabled={this.state.currItem === 'bio'}
                  >
                    Pricing
                  </NavItem>
                  <NavItem
                    eventKey="schedule"
                    disabled={
                      this.state.currItem === 'bio' ||
                      this.state.currItem === 'pricing'
                    }
                  >
                    Schedule
                  </NavItem>
                </Nav>
              </Col>
              <Col sm={12}>
                <Tab.Content animation={false}>
                  <Tab.Pane eventKey="bio">
                    <SitterJoinBio
                      bio={this.state.bio}
                      handleNavNext={this.handleNavNext}
                      handleInput={this.handleInput}
                    />
                  </Tab.Pane>
                  <Tab.Pane eventKey="pricing">
                    <SitterJoinPrices
                      child={this.state.child}
                      childAddl={this.state.childAddl}
                      pet={this.state.pet}
                      petAddl={this.state.petAddl}
                      house={this.state.house}
                      handleInput={this.handleInput}
                      handleNavPrev={this.handleNavPrev}
                      handleNavNext={this.handleNavNext}
                    />
                  </Tab.Pane>
                  <Tab.Pane eventKey="schedule">
                    <SitterJoinSchedule
                      sun={this.state.sun}
                      mon={this.state.mon}
                      tues={this.state.tues}
                      wed={this.state.wed}
                      thurs={this.state.thurs}
                      fri={this.state.fri}
                      sat={this.state.sat}
                      handleNavPrev={this.handleNavPrev}
                      handleNavNext={this.handleNavNext}
                      handleInput={this.handleInput}
                    />
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </div>
          </Tab.Container>
        </div>
      );
    }
  }
}
