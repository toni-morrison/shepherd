export default [
  {
    id: 0,
    allDay: true,
    start: new Date('2018-08-19T14:20:00'),
    end: new Date('2018-08-20T16:24:00'),
    userID: 'userID0',
    sitting: {
      pet: false,
      house: true,
      baby: false
    },
    sitterID: 'sitterID1',
    appointmentID: 'appointment0',
    status: 'PENDING',
    sittername: 'Kiernan Hahn',
    cost: 300,
    instructions: ['Take out the garbage',
                   'Mow the lawn',
                   'Dust the bookshelf'],
    username: 'User1'
  },
  {
    id: 1,
    allDay: false,
    start: new Date('2018-08-18T14:30:00'),
    end: new Date('2018-08-18T20:00:00'),
    userID: 'userID1',
    sitting: {
      pet: true,
      house: false,
      baby: false
    },
    sitterID: 'sitterID1',
    appointmentID: 'appointment1',
    status: 'PENDING',
    sittername: 'Kiernan Hahn',
    cost: 100,
    instructions: ['Feed the pets',
                   'Take the dog out for a walk'],
    username: 'User2'
  },
  {
    id: 3,
    allDay: false,
    start: new Date('2018-08-20T11:10:00'),
    end: new Date('2018-08-20T13:12:00'),
    userID: 'userID3',
    sitting: {
      pet: false,
      house: false,
      baby: true
    },
    sitterID: 'sitterID1',
    appointmentID: 'appointment3',
    status: 'PENDING',
    sittername: 'Kiernan Hahn',
    cost: 200,
    instructions: ['Feed the baby',
                   'Take the baby out for a walk',
                   'Dust the baby'],
    username: 'User3'
  },
  {
    id: 4,
    allDay: false,
    start: new Date('2018-08-20T11:10:00'),
    end: new Date('2018-08-20T13:12:00'),
    userID: 'userID4',
    sitting: {
      pet: true,
      house: false,
      baby: true
    },
    sitterID: 'sitterID1',
    appointmentID: 'appointment4',
    status: 'PENDING',
    sittername: 'Kiernan Hahn',
    cost: 400,
    instructions: ['Feed the pets',
                   'Take the dog out for a walk',
                   'Feed the baby',
                   'Put the baby to sleep'],
    username: 'User4'
  }
]