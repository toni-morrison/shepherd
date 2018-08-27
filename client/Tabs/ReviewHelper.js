import gql from 'graphql-tag';
import moment from 'moment';

const REVIEW_MODAL = gql`
  query reviewModal($email: String!) {
    reviewModal(email: $email) {
      appointment {
        id
        userRating
        sitterRating
        user {
          email
        }
        sitter {
          user {
            email
          }
        }
      }
      end
      day
    }
  }
`;

const convertToEndTime = obj => {
  var endTimeHr = Math.floor(obj.end / 60);
  var endTimeMin = obj.end % 60;
  if (endTimeHr < 10) {
    var hr = '0' + String(endTimeHr);
  } else {
    var hr = String(endTimeHr);
  }

  if (endTimeMin === 0) {
    var min = '00';
  } else {
    var min = '30';
  }
  var time = hr + ':' + min;
  var endTime = obj.day + 'T' + time;
  return endTime;
};

const checkData = (obj, sitterId) => {
  var result = false;
  var appointmentInfo = {};
  var arr = obj.reviewModal;
  for (var i = 0; i < arr.length; i++) {
    var appt = arr[i];
    var endTime = convertToEndTime(arr[i]);
    var now = new Date();
    var then = new Date(endTime);
    var displayTime = moment(endTime).format('LL');
    if (then < now) {
      appointmentInfo['id'] = appt.appointment.id;
      appointmentInfo['display'] = displayTime;
      if (
        appt.appointment.userRating === null &&
        appt.appointment.sitterRating !== null
      ) {
        result = true;
        appointmentInfo['user'] = appt.appointment.user.email;
      } else if (
        appt.appointment.sitterRating === null &&
        appt.appointment.userRating !== null
      ) {
        result = true;
        appointmentInfo['sitter'] = appt.appointment.sitter.user.email;
      } else if (
        appt.appointment.sitterRating === null &&
        appt.appointment.userRating === null
      ) {
        result = true;
        appointmentInfo['user'] = appt.appointment.user.email;
        appointmentInfo['sitter'] = appt.appointment.sitter.user.email;
      }
    }
  }

  if (result === true) {
    console.log('appt info:', appointmentInfo);
    return appointmentInfo;
  } else {
    return result;
  }
};

module.exports = {
  REVIEW_MODAL,
  checkData
};
