import gql from 'graphql-tag';
import moment from 'moment';

const FIND_APPOINTMENTS = gql`
  query findAppointments {
    findAppointments {
      appointment {
        id
        sitter {
          id
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
        sitter {
          id
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

    usersObj[arr[i].appointment.sitter.id] = true;

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
  // console.log('monthEarning:', monthEarning, 'totalusers:', totalUsers);
  metricsObj['monthEarning'] = getTotalAvg(monthEarning, totalUsers);
  metricsObj['dailyEarning'] = getAvg(dailyEarning, dayDiv);
  metricsObj['yearlyEarning'] = getTotalAvg(yearlyEarning, totalUsers);
  // console.log(metricsObj);

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

const dateArray = () => {
  var dates = ['x'];
  var date = new Date();
  for (var i = 0; i < 7; i++) {
    var tempDate = new Date();
    tempDate.setDate(date.getDate() - i);
    if (Number(tempDate.getMonth()) + 1 < 10) {
      var str =
        '2018' +
        '-' +
        '0' +
        (Number(tempDate.getMonth()) + 1) +
        '-' +
        tempDate.getDate();
      dates.push(str);
    } else {
      var str =
        '2018' +
        '-' +
        (Number(tempDate.getMonth()) + 1) +
        '-' +
        tempDate.getDate();
      dates.push(str);
    }
  }

  return dates;
};

const weeklyArray = (weeklyEarning, pastWeek) => {
  var result = [];
  for (var i = 1; i < pastWeek.length; i++) {
    var day = pastWeek[i];
    if (weeklyEarning[day] === undefined) {
      result.push(0);
    } else if (weeklyEarning[day] !== undefined) {
      result.push(weeklyEarning[day]);
    }
  }
  return result;
};

const monthArray = monthlyEarning => {
  var result = [];
  var month = new Date().getMonth();
  if (monthlyEarning[month] !== undefined) {
    var newMonth = String(Number(month) + 1);
    result.push(newMonth);
    result.push(monthlyEarning[month]);
  }
  return result;
};

module.exports = {
  FIND_APPOINTMENTS,
  calculateMetrics,
  FIND_SITTER_APPOINTMENTS,
  dateArray,
  weeklyArray,
  monthArray
};
