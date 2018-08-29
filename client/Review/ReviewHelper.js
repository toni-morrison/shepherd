import gql from 'graphql-tag';

const ADD_REVIEW = gql`
  mutation updateAppointment(
    $id: ID!
    $userRating: Float
    $userReview: String
    $sitterRating: Float
    $sitterReview: String
  ) {
    updateAppointment(
      id: $id
      userRating: $userRating
      userReview: $userReview
      sitterRating: $sitterRating
      sitterReview: $sitterReview
    ) {
      id
      sitter {
        id
      }
    }
  }
`;

const GET_REVIEWS = gql`
  query findSitterReviews($id: ID!) {
    findSitterReviews(id: $id) {
      sitterReview
      sitterRating
      sitterWords
      userReview
      userRating
      userWords
    }
  }
`;

const UPDATE_USER_RATING = gql`
  mutation updateSitter($id: ID!, $rating: Float) {
    updateSitter(id: $id, rating: $rating) {
      rating
    }
  }
`;

const calculateAvg = arr => {
  console.log('calcavg arr:', arr);
  let div = arr.length;
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i].userRating;
  }
  return sum / div;
};

const wordJumble = arr => {
  var shuffled = arr.slice(0),
    i = arr.length,
    min = i - 5,
    temp,
    index;
  while (i-- > min) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }
  return shuffled.slice(min);
};

module.exports = {
  wordJumble,
  ADD_REVIEW,
  GET_REVIEWS,
  UPDATE_USER_RATING,
  calculateAvg
};
