import React from 'react';
import { Row, Col, Tab, Nav, NavItem, Modal, Button } from 'react-bootstrap';
import UserTabs from './UserTabs.jsx';
import SitterTabs from './SitterTabs.jsx';
import SitterJoin from '../SitterJoin/SitterJoin.jsx';
import ReviewModal from './ReviewModal.js';
import Review from '../Review/Review.jsx';
import { days } from '../SitterJoin/Days.js';
import { CircleLoader } from 'react-spinners';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const GET_USER_INFO = gql`
  query getUserInfo($email: String!) {
    getUserInfo(email: $email) {
      sitter {
        id
      }
    }
  }
`;

export default class TopTabs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      key: 'first',
      submitted: false,
      renderReviewModal: false,
      appointmentId: '',
      displayTime: ''
    };
    this.toggleSubmitted = this.toggleSubmitted.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReviewModal = this.handleReviewModal.bind(this);
    this.closeReviewModal = this.closeReviewModal.bind(this);
  }

  toggleSubmitted() {
    this.setState({
      submitted: !this.state.submitted
    });
  }

  handleSubmit(createSitter, createSchedule, passedState, refetch) {
    createSitter({
      variables: {
        email: this.props.user,
        bio: passedState.bio,
        child_rate: passedState.child_rate || undefined,
        child_rate_addl: passedState.child_addl || undefined,
        pet_rate: passedState.pet_rate || undefined,
        pet_rate_addl: passedState.pet_addl || undefined,
        home_rate: passedState.home_rate || undefined
      }
    }).then(({ data }) => {
      days.forEach(day => {
        var startTime =
          (parseInt(passedState[day].substring(0, 2)) % 12) * 60 +
          parseInt(passedState[day].substring(3, 5)) +
          (passedState[day].substring(5, 7) === 'PM') * 720;
        var endTime =
          (parseInt(passedState[day].substring(8, 10)) % 12) * 60 +
          parseInt(passedState[day].substring(11, 13)) +
          (passedState[day].substring(13, 15) === 'PM') * 720;
        createSchedule({
          variables: {
            id: data.createSitter.id,
            day: day,
            start: startTime,
            end: endTime
          }
        })
          .then(() => {
            refetch();
          })
          .then(() => {
            this.setState({ submitted: true, key: 'first' });
          });
      });
    });
  }

  handleReviewModal(obj) {
    if (this.state.appointmentId.length === 0) {
      this.setState({
        renderReviewModal: true,
        appointmentId: obj.id,
        displayTime: obj.display
      });
    }
  }

  closeReviewModal() {
    this.setState({
      renderReviewModal: false
    });
  }

  render() {
    if (!this.props.user) {
      return null;
    } else {
      return (
        <div>
          <Query query={GET_USER_INFO} variables={{ email: this.props.user }}>
            {({ loading, error, data, refetch }) => {
              if (loading)
                return (
                  <div className="loader">
                    <CircleLoader
                      sizeUnit={'px'}
                      size={150}
                      color={'#123abc'}
                      loading={loading}
                    />
                  </div>
                );
              if (error) return <p>Error :(</p>;
              const sitterId = data.getUserInfo.sitter
                ? data.getUserInfo.sitter.id
                : null;
              return (
                <Tab.Container
                  id="top-tabs"
                  activeKey={this.state.key}
                  onSelect={e => this.setState({ key: e })}
                >
                  <Row className="clearfix">
                    {this.state.submitted && (
                      <Modal
                        show={this.state.submitted}
                        onHide={this.toggleSubmitted}
                        container={this}
                        aria-labelledby="contained-modal-title"
                      >
                        <Modal.Header closeButton>
                          <Modal.Title id="contained-modal-title">
                            Congratulations!
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          You are now registered as a Sitter! Click on the
                          Sitter tab to see your earnings and modify your
                          availability and pricing.
                        </Modal.Body>
                        <Modal.Footer>
                          <Button onClick={this.toggleSubmitted}>Close</Button>
                        </Modal.Footer>
                      </Modal>
                    )}
                    <Col sm={12}>
                      <Nav bsStyle="tabs" className="nav-justified">
                        <NavItem eventKey="first">USER</NavItem>
                        <NavItem eventKey="second">
                          {sitterId ? 'SITTER' : 'BECOME A SITTER'}
                        </NavItem>
                      </Nav>
                    </Col>
                    <Col sm={12}>
                      <Tab.Content animation={false}>
                        <Tab.Pane eventKey="first">
                          <br />
                          <br />
                          <UserTabs user={this.props.user} />
                        </Tab.Pane>
                        <Tab.Pane eventKey="second">
                          <br />
                          <br />
                          <SitterTabs
                            user={this.props.user}
                            sitterId={sitterId}
                          />
                          <SitterJoin
                            user={this.props.user}
                            sitterId={sitterId}
                            toggleSubmitted={this.toggleSubmitted}
                            handleSubmit={this.handleSubmit}
                            refetch={refetch}
                          />
                        </Tab.Pane>
                      </Tab.Content>
                    </Col>
                  </Row>
                </Tab.Container>
              );
            }}
          </Query>
          <ReviewModal
            handleReviewModal={this.handleReviewModal}
            user={'debbie@hr.com'}
          />
          <Modal show={this.state.renderReviewModal}>
            <Modal.Header>
              <Modal.Title>
                Review Appointment That Ended: {this.state.displayTime}
              </Modal.Title>
            </Modal.Header>
            <Review
              id={this.state.appointmentId}
              closeReviewModal={this.closeReviewModal}
            />
          </Modal>
        </div>
      );
    }
  }
}
