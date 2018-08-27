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
    }
  }
`;

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
  ADD_REVIEW
};
