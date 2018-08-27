import gql from 'graphql-tag';
import { Query } from 'react-apollo';
const FIND_APPOINTMENTS = gql `
  query findAppointments ($userID: String!) {
    findAppointments (userID: $userID) {
      start  
      end
      day
      appointment {
        id
        pending
        app_types
        todoList {
          id
        }
        sitterRating
        sitter {
          id
          rates {
            child_rate
            pet_rate
            home_rate
          }
          user {
            first_name
            last_name
          }
        }
        user {
          id
        }
      }
    }
  }
`;
function CalendarQuery (props) {
  return (<Query
            query={FIND_SITTERS}
            variables={{
              day: this.state.currentDay,
              start: this.state.currentStart,
              end: this.state.currentEnd,
              baby: this.state.value.includes('baby'),
              pet: this.state.value.includes('pet'),
              home: this.state.value.includes('house')
            }}
          >
            {({ loading, error, data }) => {
              if (loading) {
                return <span />;
              }
              if (error) {
                console.log('error: ', error);
                return <span />;
              }
              let sitterData = [];
              data.findSitters.map(interval =>
                sitterData.push(interval.sitter)
              );
              this.state.currentResults = sitterData;
              return <span />;
            }}
          </Query>)
}