import React from 'react'
import { ButtonToolbar, Grid, Row, Col, Well, DropdownButton, MenuItem, Button } from 'react-bootstrap';
import StarRatings from 'react-star-ratings';
import SitterReviewCard from './SitterReviewCard.jsx'

export default class SitterReviews extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      anyReviews: true
    }
  }
  
  render() {
    if (this.state.anyReviews === false) {
      return(
        <div><i>You don't have any reviews yet!!!</i></div>
      )
    } else {
      return(
        <div>
          <Grid>
            <Row>
              <Col xs={3} xsOffset={4}>
              <center>
                  <h3><strong>Your Rating</strong></h3>
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

            <Row>
              <Col xs={12}>
                <SitterReviewCard/>
              </Col>
            </Row>
          </Grid>
        </div>
      )
    }
  }
}