import React from 'react';
import { Well, Image, Row, Col } from 'react-bootstrap';


export default class SitterReviewCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reviews: [
                {
                  name: 'Kiernan',
                  date: '08/14/2018',
                  stars: '5',
                  review: `Debbie was an excellent sitter and I trust her with my life,
                          my children's lives, my cats lives, the well-being of my
                          entire household. Why can't everyone be like her??? I would
                          give her 100 stars if I could. Have you considered changing your
                          rating model?`,
                  img: 'https://i.imgur.com/QT0uEU6.jpg'
                }
                // {
                //   name: 'Debbie',
                //   date: '08/17/2018',
                //   stars: '5',
                //   review: `My kids loved Dan! They are already asking when we will go
                //           on another vacation so that they can see him again. Apparently
                //           he taught them something called GraphQL??? because my kids won't
                //           stop talking about it. Thanks for being awesome Dan!`,
                //   img: 'https://i.imgur.com/FWUmfQ8.jpg'
                // }
              ]
    }
  }


  render() {
    return(
      <div>
        {
          this.state.reviews.map((review) => {
            return(
              <div>
              <Well bsSize="large" style={{width: '100%'}}>
                {/* <Col xs={3}> */}
                  <Image src={review.img} responsive />
                {/* </Col> */}
                {/* <Col xs={9}> */}
                <h4>
                  <b>Name:</b> {review.name}<br/>
                  <b>Date:</b> {review.date}<br/>
                  <b>Review:</b> {review.review}<br/>
                  </h4>
                {/* </Col> */}
              </Well><br/>
              </div>
          )
        })}
      </div>
    )
  }
}
