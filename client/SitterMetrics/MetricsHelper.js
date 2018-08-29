import gql from 'graphql-tag';
import moment from 'moment';

const FIND_APPOINTMENTS = gql`
  query findAppointments {
    findAppointments {
      appointment {
        price
        userRating
        userReview
        userWords
      }
      day
    }
  }
`;

const FIND_SITTER_APPOINTMENTS = gql`
  query findSitterAppointments($sitterEmail: String!) {
    findSitterAppointments(sitterEmail: $sitterEmail) {
      appointment {
        id
        price
        userRating
        userReview
        userWords
      }
      day
    }
  }
`;

const calculateMetrics = arr => {
  let metricsObj = {};
  let monthEarning = {};
  let dailyEarning = {};
  let yearlyEarning = {};
  let total = 0;
  for (let i = 0; i < arr.length; i++) {
    let month = new Date(arr[i].day).getMonth();
    let year = new Date(arr[i].day).getFullYear();
    if (monthEarning[month] === undefined) {
      monthEarning[month] = arr[i].appointment.price;
      console.log('monthernin month:', monthEarning[month]);
      // monthEarning[month]['review'] = arr[i].appointment.userReview;
    } else {
      monthEarning[month] += arr[i].appointment.price;
    }
    if (dailyEarning[arr[i].day] === undefined) {
      dailyEarning[arr[i].day] = arr[i].appointment.price;
    } else {
      dailyEarning[arr[i].day] += arr[i].appointment.price;
    }
    if (yearlyEarning[year] === undefined) {
      yearlyEarning[year] = arr[i].appointment.price;
    } else {
      yearlyEarning[year] += arr[i].appointment.price;
    }
    total += arr[i].appointment.price;
  }
  metricsObj['total'] = total;
  metricsObj['monthEarning'] = monthEarning;
  metricsObj['dailyEarning'] = dailyEarning;
  metricsObj['yearlyEarning'] = yearlyEarning;

  return metricsObj;
};

module.exports = {
  FIND_APPOINTMENTS,
  calculateMetrics,
  FIND_SITTER_APPOINTMENTS
};
