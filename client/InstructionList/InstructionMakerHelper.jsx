import moment from 'moment';

const intervals = (startString, endString) => {
  var start = moment(startString, 'hh:mm a');
  var end = moment(endString, 'hh:mm a');
  start.minutes(Math.ceil(start.minutes() / 15) * 15);
  var result = [];
  var current = moment(start);
  while (current <= end) {
    var timeStr = current.format('h:mm a');
    result.push([timeStr]);
    // result.push(current.format('h:mm a'));
    current.add(30, 'minutes');
  }
  return result;
};

const addExistingToList = (timeSlot, currentInstruction) => {
  var result = [];
  for (var i = 0; i < timeSlot.length; i++) {
    var slot = timeSlot[i];
    for (var j = 0; j < currentInstruction.length; j++) {
      var inst = currentInstruction[j];
      if (slot[0] === inst[0]) {
        timeSlot[i] = inst;
      }
    }
  }
  return timeSlot;
};

const momentConversion = time => {
  // // var now = '12:00 am';
  // // var then = '01:00 am';
  // // var result = moment
  // //   .utc(moment(now, 'HH:mm a').diff(moment(then, 'HH:mm a')))
  // //   .format('HH:mm');
  // var a = moment('08:00');
  // var b = moment('10:00');
  // var result = b.diff(a, 'minutes');
  // return result;
};
module.exports = {
  intervals,
  addExistingToList,
  momentConversion
};
