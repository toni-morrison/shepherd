import React from 'react';
import { Col, Tab, Nav, NavItem } from 'react-bootstrap';
import SitterJoinBio from './SitterJoinBio.jsx';
import SitterJoinPrices from './SitterJoinPrices.jsx';
import SitterJoinSchedule from './SitterJoinSchedule.jsx';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const CREATE_SITTER = gql`
  mutation createSitter(
    $email: String!
    $bio: String!
    $sun: Int
    $mon: Int
    $tues: Int
    $wed: Int
    $thurs: Int
    $fri: Int
    $sat: Int
  ) {
    createSitter(
      email: $email
      bio: $bio
      sun: $sun
      mon: $mon
      tues: $tues
      wed: $wed
      thurs: $thurs
      fri: $fri
      sat: $sat
    ) {
      id
    }
  }
`;

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
      Sunday: '12:00AM|12:00AM',
      Monday: '12:00AM|12:00AM',
      Tuesday: '12:00AM|12:00AM',
      Wednesday: '12:00AM|12:00AM',
      Thursday: '12:00AM|12:00AM',
      Friday: '12:00AM|12:00AM',
      Saturday: '12:00AM|12:00AM'
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleNavPrev = this.handleNavPrev.bind(this);
    this.handleNavNext = this.handleNavNext.bind(this);
  }

  handleInput(e, val) {
    if (val) {
      this.setState(
        {
          [e.target.name]: val
        },
        () => {
          console.log(this.state);
        }
      );
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
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
            activeKey="schedule" // Change back to {this.state.currItem}
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
                      Sunday={this.state.Sunday}
                      Monday={this.state.Monday}
                      Tuesday={this.state.Tuesday}
                      Wednesday={this.state.Wednesday}
                      Thursday={this.state.Thursday}
                      Friday={this.state.Friday}
                      Saturday={this.state.Saturday}
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
