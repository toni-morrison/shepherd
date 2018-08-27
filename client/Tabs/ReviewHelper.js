import gql from 'graphql-tag';
import moment from 'moment';

const REVIEW_MODAL = gql`
  query reviewModal($email: String!) {
    reviewModal(email: $email) {
      appointment {
        id
        userRating
      }
      end
      day
    }
  }
`;

const checkData = obj => {
  var result = false;
  var appointmentInfo = {};
  var apt = '';
  var arr = obj.reviewModal;
  for (var i = 0; i < arr.length; i++) {
    var appt = arr[i];

    var endTimeHr = Math.floor(appt.end / 60);
    var endTimeMin = appt.end % 60;
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
    var endTime = appt.day + 'T' + time;
    var now = new Date();
    var then = new Date(endTime);
    if (then < now && appt.appointment.userRating === null) {
      result = true;
      apt = appt.appointment.id;
      var displayTime = moment(endTime).format('LL');
      console.log(displayTime);
      console.log('appointment info:', appt);
      appointmentInfo['id'] = appt.appointment.id;
      appointmentInfo['display'] = displayTime;
    }
  }
  if (result === true) {
    return appointmentInfo;
  } else {
    return result;
  }
};

module.exports = {
  REVIEW_MODAL,
  checkData
};
