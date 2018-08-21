import React from 'react';
import { Row, Col, Tab, Nav, NavItem } from 'react-bootstrap';
import UserSearch from '../UserSearch/UserSearch.jsx';
import UserCalendar from '../UserCalendar/UserCalendar.jsx';
import UserTasks from '../UserTasks/UserTasks.jsx';
import UserProfile from '../UserProfile/UserProfile.jsx';
import firebase from '../../server/firebase/firebase.js';
import { Query, withApollo } from 'react-apollo';
import gql from 'graphql-tag';

const FIND_TODOLIST = gql`
  query findTodoLists($email: String!) {
    findTodoLists(email: $email) {
      id
      name
    }
  }
`;

class UserTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
    this.logOut = this.logOut.bind(this);
    this.findTodos = this.findTodos.bind(this);
  }

  logOut() {
    firebase
      .auth()
      .signOut()
      .catch(err => {
        console.log('ERROR!');
      });
  }
  findTodos(data) {
    this.setState({
      data: data
    });
  }
  render() {
    return (
      <div>
        <Query
          query={FIND_TODOLIST}
          pollInterval={500}
          variables={{ email: 'debbie@hr.com' }}
        >
          {({ loading, error, data, startPolling, stopPolling }) => {
            if (loading) {
              return <p>loading</p>;
            }
            if (error) {
              return <p>error</p>;
            }

            return (
              <Tab.Container id="user-tabs" defaultActiveKey="first">
                <Row className="clearfix">
                  <Col sm={2}>
                    <Nav bsStyle="pills" stacked>
                      <NavItem eventKey="first">SEARCH</NavItem>
                      <NavItem eventKey="second">SCHEDULE</NavItem>
                      <NavItem eventKey="third">LISTS</NavItem>
                      <NavItem eventKey="fourth">PROFILE</NavItem>
                      <NavItem eventKey="fifth" onClick={() => this.logOut()}>
                        LOGOUT
                      </NavItem>
                    </Nav>
                  </Col>
                  <Col sm={8}>
                    <Tab.Content>
                      <Tab.Pane eventKey="first">
                        <UserSearch user={this.props.user} />
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                        <UserCalendar user={this.props.user} />
                      </Tab.Pane>
                      <Tab.Pane eventKey="third">
                        <UserTasks data={data} user={this.props.user} />
                      </Tab.Pane>
                      <Tab.Pane eventKey="fourth">
                        <UserProfile user={this.props.user} />
                      </Tab.Pane>
                    </Tab.Content>
                  </Col>
                </Row>
              </Tab.Container>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default withApollo(UserTabs);
