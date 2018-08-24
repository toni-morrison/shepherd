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
    $child_rate: Float
    $child_rate_addl: Float
    $pet_rate: Float
    $pet_rate_addl: Float
    $home_rate: Float
  ) {
    createSitter(
      email: $email
      bio: $bio
      child_rate: $child_rate
      child_addl: $child_rate_addl
      pet_rate: $pet_rate
      pet_addl: $pet_rate_addl
      home_rate: $home_rate
    ) {
      id
    }
  }
`;

const CREATE_SCHEDULE = gql`
  mutation createSchedule($id: ID!, $day: String!, $start: Int!, $end: Int!) {
    createSchedule(id: $id, day: $day, start: $start, end: $end) {
      day
    }
  }
`;

export default class SitterJoin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currItem: 'bio',
      bio: '',
      child_rate: '',
      child_addl: '',
      pet_rate: '',
      pet_addl: '',
      home_rate: '',
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
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(e, val) {
    if (val) {
      this.setState({
        [e.target.name]: val
      });
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
    }
  }

  handleSubmit(createSitter, createSchedule) {
    this.props.handleSubmit(
      createSitter,
      createSchedule,
      this.state,
      this.props.refetch
    );
  }

  render() {
    if (this.props.sitterId) {
      return null;
    } else {
      return (
        <Mutation mutation={CREATE_SITTER}>
          {(createSitter, { loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;
            return (
              <Mutation mutation={CREATE_SCHEDULE}>
                {(createSchedule, { loading, error, data }) => {
                  if (loading) return <p>Loading...</p>;
                  if (error) return <p>Error :(</p>;
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
                                  child_rate={this.state.child_rate}
                                  child_addl={this.state.child_addl}
                                  pet_rate={this.state.pet_rate}
                                  pet_addl={this.state.pet_addl}
                                  home_rate={this.state.home_rate}
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
                                  handleSubmit={() =>
                                    this.handleSubmit(
                                      createSitter,
                                      createSchedule
                                    )
                                  }
                                  handleInput={this.handleInput}
                                />
                              </Tab.Pane>
                            </Tab.Content>
                          </Col>
                        </div>
                      </Tab.Container>
                    </div>
                  );
                }}
              </Mutation>
            );
          }}
        </Mutation>
      );
    }
  }
}
