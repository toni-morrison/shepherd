import React from 'react';
import { Row, Col, Tab, Nav, NavItem } from 'react-bootstrap';
import UserTabs from './UserTabs.jsx';
import SitterTabs from './SitterTabs.jsx';
import SitterJoin from '../SitterJoin/SitterJoin.jsx';
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
      key: 1
    };
  }

  render() {
    if (!this.props.user) {
      return null;
    } else {
      return (
        <Query query={GET_USER_INFO} variables={{ email: this.props.user }}>
          {({ loading, error, data }) => {
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
              <Tab.Container id="top-tabs" defaultActiveKey="first">
                <Row className="clearfix">
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
                        {/* <SitterJoin sitterId={sitterId} /> */}
                      </Tab.Pane>
                    </Tab.Content>
                  </Col>
                </Row>
              </Tab.Container>
            );
          }}
        </Query>
      );
    }
  }
}
