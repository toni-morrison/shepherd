import React from 'react';
import {
  ButtonToolbar,
  Grid,
  Row,
  Col,
  Well,
  DropdownButton,
  MenuItem,
  Button
} from 'react-bootstrap';
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
    findSitterAppointments(sitterEmail: $sitterEmail, status: $status, order: $order) {
      appointment {
        id
        user {
          first_name
          last_name
          pic_url
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
                      rating={4} // pull current user rating from DB
                      starDimension="30px"
                      starSpacing="1px"
                      starRatedColor="gold"
                      starEmptyColor="grey"
                    />
                  </center>
                </Col>
              </Row>
              <br />
              {data.findSitterAppointments.map(appointment => {
                return (
                  <Row key={appointment.appointment.id}>
                    <SitterReviewCard
                      review={appointment.appointment}
                      day={appointment.day}
                    />
                  </Row>
                );
              })}
            </Grid>
          );
        }}
      </Query>
    );
  }
}
