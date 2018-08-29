import React from 'react';
import { FormGroup } from 'react-bootstrap';
import Geosuggest from 'react-geosuggest';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const GET_USER_ADDR = gql`
  query getUserInfo($email: String!) {
    getUserInfo(email: $email) {
      address
      long
      lat
    }
  }
`;

export default class UserSearchLocation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Query
        query={GET_USER_ADDR}
        variables={{ email: this.props.email }}
        skip={this.props.address}
      >
        {({ loading, error, data }) => {
          if (loading) {
            return <p>Loading...</p>;
          }
          if (error) {
            return <p>Error</p>;
          }
          if (!this.props.address && data.getUserInfo) {
            this.props.handleInitAddress(
              data.getUserInfo.address,
              data.getUserInfo.lat,
              data.getUserInfo.long
            );
          }
          return (
            <FormGroup>
              <Geosuggest
                name="address"
                style={{ width: '100%' }}
                autoComplete="off"
                placeholder={
                  this.props.address ||
                  'Enter your address to find sitters near you'
                }
                initialValue={this.props.address || undefined}
                id="address"
                onSuggestSelect={this.props.handleSuggest}
              />
            </FormGroup>
          );
        }}
      </Query>
    );
  }
}
