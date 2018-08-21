import React from 'react';
import { Button, Well, Image, Row, Col } from 'react-bootstrap';
import StarRatings from 'react-star-ratings';


export default class UserSearchResults extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reviews: [
                {
                  name: 'Kiernan',
                  child: '$15.00/hour',
                  pet: '$30.00/day',
                  house: '$50.00/day',
                  stars: 5,
                  img: 'https://i.imgur.com/QT0uEU6.jpg',
                  bio: 'I LOVE CHILDREN'
                },
                {
                  name: 'Kiernan',
                  child: '$15.00/hour',
                  pet: '$30.00/day',
                  house: '$50.00/day',
                  stars: 5,
                  img: 'https://i.imgur.com/QT0uEU6.jpg',
                  bio: 'So nice they addded me twice'
                }
              ]
    }
  }



  render() {
    return(
      <div>
        {
          this.state.reviews.map((review) => {
            return(
              <div key={review}>
              <Well bsSize="large" style={{width: '100%'}}>
                <Row>
                  <Col xs={4} >
                  <StarRatings
                          numberOfStars={5}
                          rating={review.stars || 0}
                          starDimension="30px"
                          starSpacing="2px"
                          starRatedColor="gold"
                          starEmptyColor="grey"
                  />
                  </Col>
                </Row>
                <Row>
                  <Col xs={3}>
                    <Image src={review.review}/>
                  </Col>
                </Row>
                <Row>
                  <Col xs={3}>
                    <Image src={review.img} responsive />
                  </Col>
                  <Col xs={9}>
                    <Row>
                      <h4>
                      <b>Name:</b> {review.name}<br/><br/>
                      <b>Child:</b> {review.child}<br/><br/>
                      <b>Pet:</b> {review.pet}<br/><br/>
                      <b>House:</b> {review.house}<br/><br/>
                      <b>Bio:</b> {review.bio}<br/><br/>
                      </h4>
                    </Row>
                  </Col>
                </Row>
              </Well><br/>
              </div>
          )
        })}
        <Button onClick={this.props.handleSearchClick}>SEARCH AGAIN</Button>
      </div>
    )
  }
}
