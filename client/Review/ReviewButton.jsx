import React from 'react';
import { Button } from 'react-bootstrap';
import { ADD_REVIEW } from './ReviewHelper.js';
import { Mutation } from 'react-apollo';

export default class ReviewButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleButtonClick(updateAppointment) {
    updateAppointment({
      variables: {
        id: this.props.id,
        userRating: this.props.userRating,
        userReview: this.props.userReview
      }
    }).then(({ data }) => {
      this.props.handleSave();
    });
  }

  render() {
    return (
      <Mutation mutation={ADD_REVIEW}>
        {(updateAppointment, { loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error...</p>;
          return (
            <div className="review-button-submit">
              <Button
                onClick={() => this.handleButtonClick(updateAppointment)}
                id="review-button-submit"
              >
                {' '}
                Save Review
              </Button>
            </div>
          );
        }}
      </Mutation>
    );
  }
}

//createAppt mutation playground:
// mutation{
//   createAppointment(data:{
// 		comment: "something something"
//     user: {
//     	connect: {
//         id: "cjl5aqepp6jy80784fhlrlmjb"
//       }
//     }
//     sitter:{
//       connect:{
//         id: "cjl5bde9u6nro0784vn7xm4cj"
//       }
//     }

//   }){
//     id
//   }
// }

//appt ID: cjl9gl6hrqesx07849oag4k6u

//updateAppt mutation playground:
// mutation{
//   updateAppointment(where: {
//     id: "cjl9gl6hrqesx07849oag4k6u"
//   }
//   data:{
//     userRating: 5
//     userReview: "so wonderfule"
//   }
//   ) {
//     id
//   }
// }
