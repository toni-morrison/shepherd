import gql from 'graphql-tag';
import moment from 'moment';

const FIND_APPOINTMENTS = gql`
  query findAppointments {
    findAppointments {
      appointment {
        sitter {
          user {
            email
          }
        }
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
  let dayDiv = {};
  var usersObj = {};
  let dailyEarning = {};
  let yearlyEarning = {};
  let total = 0;
  for (let i = 0; i < arr.length; i++) {
    let month = new Date(arr[i].day).getMonth();
    let year = new Date(arr[i].day).getFullYear();
    console.log('data:', arr[i].appointment.sitter.user.email);
    usersObj[arr[i].appointment.sitter.user.email] = true;

    if (monthEarning[month] === undefined) {
      monthEarning[month] = arr[i].appointment.price;
    } else {
      monthEarning[month] += arr[i].appointment.price;
    }
    if (dailyEarning[arr[i].day] === undefined) {
      dailyEarning[arr[i].day] = arr[i].appointment.price;
      dayDiv[arr[i].day] = 1;
    } else {
      dayDiv[arr[i].day] += 1;
      dailyEarning[arr[i].day] += arr[i].appointment.price;
    }
    if (yearlyEarning[year] === undefined) {
      yearlyEarning[year] = arr[i].appointment.price;
    } else {
      yearlyEarning[year] += arr[i].appointment.price;
    }
    total += arr[i].appointment.price;
  }
  var totalUsers = Object.keys(usersObj).length;

  metricsObj['total'] = total;
  metricsObj['monthEarning'] = getTotalAvg(monthEarning, totalUsers);
  metricsObj['dailyEarning'] = getAvg(dailyEarning, dayDiv);
  metricsObj['yearlyEarning'] = getTotalAvg(yearlyEarning, totalUsers);
  console.log(metricsObj);

  return metricsObj;
};

const getAvg = (timeTotal, timeDiv) => {
  for (var key in timeTotal) {
    var temp = timeTotal[key] / timeDiv[key];
    timeTotal[key] = temp;
  }
  return timeTotal;
};

const getTotalAvg = (timeTotal, totalUsers) => {
  for (var key in timeTotal) {
    var temp = timeTotal[key] / totalUsers;
    timeTotal[key] = temp;
  }
  return timeTotal;
};

module.exports = {
  FIND_APPOINTMENTS,
  calculateMetrics,
  FIND_SITTER_APPOINTMENTS
};
