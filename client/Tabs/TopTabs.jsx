import React from 'react';
import { Row, Col, Tab, Nav, NavItem, Modal, Button } from 'react-bootstrap';
import UserTabs from './UserTabs.jsx';
import SitterTabs from './SitterTabs.jsx';
import SitterJoin from '../SitterJoin/SitterJoin.jsx';
import ReviewModal from './ReviewModal.js';
import UserReview from '../Review/UserReview.jsx';
import SitterReview from '../Review/SitterReview.jsx';
import { days } from '../SitterJoin/Days.js';
import { CircleLoader } from 'react-spinners';
import { Query, ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import SitterTabsQuery from './SitterTabsQuery.jsx';
import { FIND_APPOINTMENTS } from '../SitterMetrics/MetricsHelper.js';

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
      renderSitterReviewModal: false,
      appointmentId: '',
      displayTime: '',
      price: '',
      sitterPic: '',
      sitterName: '',
      skipApptQuery: true
    };
    this.toggleSubmitted = this.toggleSubmitted.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReviewModal = this.handleReviewModal.bind(this);
    this.closeReviewModal = this.closeReviewModal.bind(this);
    this.handleQuery = this.handleQuery.bind(this);
  }

  handleQuery() {
    console.log('button click!');
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
      if (obj.user === this.props.user) {
        this.setState({
          renderUserReviewModal: true,
          appointmentId: obj.id,
          displayTime: obj.display,
          price: obj.price,
          sitterPic: obj.sitterPic,
          sitterName: obj.sitterName
        });
      } else if (obj.sitter === this.props.user) {
        this.setState({
          renderSitterReviewModal: true,
          appointmentId: obj.id,
          displayTime: obj.display,
          price: obj.price,
          sitterPic: obj.sitterPic,
          sitterName: obj.sitterName,
          skipReviewModal: false
        });
      } else {
        return;
      }
    }
  }

  closeReviewModal() {
    this.setState({
      renderUserReviewModal: false,
      renderSitterReviewModal: false
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
                      <Nav bsStyle="tabs" className="nav-justified" id="nav-pills">
                        <NavItem eventKey="first">USER</NavItem>
                        {/* <Appointment>{client}</Appointment> */}
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
                          <UserTabs
                            user={this.props.user}
                            userPic={this.props.userPic}
                          />
                        </Tab.Pane>
                        <Tab.Pane eventKey="second">
                          <br />
                          <br />

                          <SitterTabs
                            user={this.props.user}
                            sitterId={sitterId}
                            userPic={this.props.userPic}
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

                    <ReviewModal
                      handleReviewModal={this.handleReviewModal}
                      user={this.props.user}
                      sitterId={sitterId}
                    />
                    <Modal
                      className="review-modal"
                      show={this.state.renderUserReviewModal}
                    >
                      <Modal.Header>
                        <Modal.Title>
                          Review Appointment That Ended:{' '}
                          {this.state.displayTime}
                        </Modal.Title>
                      </Modal.Header>
                      <UserReview
                        sitterPic={this.state.sitterPic}
                        sitterName={this.state.sitterName}
                        user={this.props.user}
                        id={this.state.appointmentId}
                        closeReviewModal={this.closeReviewModal}
                        displayTime={this.state.displayTime}
                        price={this.state.price}
                      />
                    </Modal>
                    <Modal
                      className="review-modal"
                      show={this.state.renderSitterReviewModal}
                    >
                      <Modal.Header>
                        <Modal.Title>
                          Review Appointment That Ended:{' '}
                          {this.state.displayTime}
                        </Modal.Title>
                      </Modal.Header>
                      <SitterReview
                        user={this.props.user}
                        id={this.state.appointmentId}
                        closeReviewModal={this.closeReviewModal}
                      />
                    </Modal>
                  </Row>
                </Tab.Container>
              );
            }}
          </Query>
        </div>
      );
    }
  }
}
