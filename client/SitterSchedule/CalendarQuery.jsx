import gql from 'graphql-tag';

const FIND_SITTER_APPOINTMENTS = gql`
  query findSitterAppointments($sitterEmail: String!) {
    findSitterAppointments(sitterEmail: $sitterEmail) {
      start
      end
      day
      appointment {
        id
        price
        children
        pets
        comment
        app_types
        status
        userRating
        userReview
        sitterRating
        sitterReview
        todoList {
          id
          name
        }
        sitter {
          id
          rating
          rates {
            child_rate
            pet_rate
            home_rate
          }
          user {
            id
            email
            first_name
            last_name
            rating
            pic_url
          }
        }
        user {
          id
          first_name
          last_name
          email
          rating
          pic_url
        }
      }
    }
  }
`;

module.exports = {
  FIND_SITTER_APPOINTMENTS
}
