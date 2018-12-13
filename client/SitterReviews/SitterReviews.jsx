import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import StarRatings from 'react-star-ratings';
import SitterReviewCard from './SitterReviewCard.jsx';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const GET_SITTER_REVIEWS = gql`
  query findSitterAppointments(
    $sitterEmail: String!
    $status: AppStatus
    $order: String
  ) {
    findSitterAppointments(
      sitterEmail: $sitterEmail
      status: $status
      order: $order
    ) {
      appointment {
        id
        user {
          id
          first_name
          last_name
          pic_url
        }
        sitter {
          id
          rating
        }
        userReview
        userRating
        price
      }
      day
    }
  }
`;

export default class SitterReviews extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Query
        query={GET_SITTER_REVIEWS}
        variables={{
          sitterEmail: this.props.user,
          status: 'Paid',
          order: 'updatedAt_DESC'
        }}
      >
        {({ loading, error, data }) => {
          if (loading) {
            return <p>Loading...</p>;
          }
          if (error) {
            return <p>{error}</p>;
          }
          return (
            <Grid>
              <Row>
                <Col xs={3} xsOffset={4}>
                  <center>
                    <h3>
                      <strong>Your Rating</strong>
                    </h3>
                    <StarRatings
                      numberOfStars={5}
                      rating={
                        data.findSitterAppointments[0]
                          ? data.findSitterAppointments[0].appointment.sitter
                              .rating
                          : 0
                      }
                      starDimension="30px"
                      starSpacing="1px"
                      starRatedColor="gold"
                      starEmptyColor="grey"
                    />
                  </center>
                </Col>
              </Row>
              <br />
              {data.findSitterAppointments ? (
                data.findSitterAppointments.map(appointment => {
                  return (
                    <Row key={appointment.appointment.id}>
                      <SitterReviewCard
                        review={appointment.appointment}
                        day={appointment.day}
                      />
                    </Row>
                  );
                })
              ) : (
                <h3>You do not currently have any reviews!</h3>
              )}
            </Grid>
          );
        }}
      </Query>
    );
  }
}
