import React from 'react';
import { Button } from 'react-bootstrap';
import gql from 'graphql-tag';
import { ApolloConsumer } from 'react-apollo';
import geolib from 'geolib';

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
          id
          first_name
          last_name
          long
          lat
          email
          pic_url
        }
      }
    }
  }
`;
function UserSearchQuery(props) {
  return (
    <ApolloConsumer>
      {client => {
        return (
          <Button
            disabled={
              props.value.length === 0 || props.currentStart > props.currentEnd
            }
            onClick={async () => {
              const { data } = await client.query({
                query: FIND_SITTERS,
                variables: {
                  day: props.currentDay,
                  start: props.currentStart,
                  end: props.currentEnd,
                  baby: props.value.includes('baby'),
                  pet: props.value.includes('pet'),
                  home: props.value.includes('house')
                }
              });
              let sitterData = [];
              data.findSitters.map(interval => {
                if (
                  geolib.getDistance(
                    { latitude: props.lat, longitude: props.long },
                    {
                      latitude: interval.sitter.user.lat,
                      longitude: interval.sitter.user.long
                    }
                  ) <= 48280 &&
                  interval.sitter.user.email !== props.user
                ) {
                  sitterData.push(interval.sitter);
                }
              });
              props.handleQuery(sitterData);
            }}
          >
            SUBMIT
          </Button>
        );
      }}
    </ApolloConsumer>
  );
}
export default UserSearchQuery;
