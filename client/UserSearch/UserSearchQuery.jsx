import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const FIND_SITTERS = gql`
  query findSitters(
    $day: String!
    $start: Int!
    $end: Int!
    $baby: Boolean!
    $pet: Boolean!
    $home: Boolean!
  ) {
    findSitters(
      day: $day
      start: $start
      end: $end
      baby: $baby
      pet: $pet
      home: $home
    ) {
      day
      sitter {
        id
        bio
        rating
        rates {
          child_rate
          child_addl
          pet_rate
          pet_addl
          home_rate
        }
        user {
          first_name
          last_name
        }
      }
    }
  }
`;
function UserSearchQuery(props) {
  return (
    <Query
      query={FIND_SITTERS}
      variables={{
        day: props.currentDay,
        start: props.currentStart,
        end: props.currentEnd,
        baby: props.value.includes('baby'),
        pet: props.value.includes('pet'),
        home: props.value.includes('house')
      }}
    >
      {({ loading, error, data }) => {
        if (loading) {
          return <span />;
        }
        if (error) {
          console.log('error: ', error);
          return <span />;
        }
        let sitterData = [];
        data.findSitters.map(interval => sitterData.push(interval.sitter));
        props.handleQuery(sitterData);
        return <span />;
      }}
    </Query>
  );
}
export default UserSearchQuery;
