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
            pic_url
            first_name
          }
        }
        price
        status
      }
      end
      day
    }
  }
`;

// const REVIEW_MODAL = gql`
//   query reviewModal($email: String!) {
//     reviewModal(email: $email) {
//       appointment {
//         id
//         userRating
//         user {
//           email
//         }
//         sitter {
//           user {
//             first_name
//             pic_url
//             email
//           }
//         }
//         price
//         status
//       }
//       end
//       day
//     }
//   }
// `;

const convertToEndTime = obj => {
  var endTimeHr = Math.floor(obj.end / 60);
  var endTimeMin = obj.end % 60;
  if (endTimeHr < 10) {
    var hr = '0' + String(endTimeHr);
  } else {
    var hr = String(endTimeHr);
  }

  if (endTimeMin < 10) {
    var min = '0' + String(endTimeMin);
  } else {
    var min = String(endTimeMin);
  }
  var time = hr + ':' + min;
  var endTime = obj.day + 'T' + time;
  return endTime;
};

const checkData = (obj, sitterId) => {
  console.log('function topfired:', obj);
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
      console.log('function fired!');
      console.log(appt.appointment.status);
      appointmentInfo['id'] = appt.appointment.id;
      appointmentInfo['display'] = displayTime;
      appointmentInfo['price'] = appt.appointment.price;
      appointmentInfo['sitterPic'] = appt.appointment.sitter.user.pic_url;
      appointmentInfo['sitterName'] = appt.appointment.sitter.user.first_name;

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
    console.log('apptinfor:', appointmentInfo);
    return appointmentInfo;
  } else {
    return result;
  }
};

// if (
//   appt.appointment.userRating === null &&
//   appt.appointment.sitterRating !== null
// )
module.exports = {
  REVIEW_MODAL,
  checkData
};
