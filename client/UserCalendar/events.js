export default [
  {
    id: 0,
    title: 'John, HouseSitting',
    allDay: true,
    start: new Date('2018-08-15T14:20:00'),
    end: new Date('2018-08-15T16:24:00'),
    userID: 'userID0',
    sitterID: 'sitterID0',
    appointmentID: 'appointment0',
    status: 'PENDING',
    username: 'John Housesitter',
    cost: 300,
    instructions: ['Take out the garbage',
                   'Mow the lawn',
                   'Dust the bookshelf']
  },
  {
    id: 1,
    title: 'Jane, PetSitting',
    allDay: false,
    start: new Date('2018-08-14T11:10:00'),
    end: new Date('2018-08-14T12:12:00'),
    userID: 'userID1',
    sitterID: 'sitterID1',
    appointmentID: 'appointment1',
    status: 'ACCEPTED',
    username: 'Jane Petsitter',
    cost: 100,
    instructions: ['Feed the pets',
                   'Take the dog out for a walk']
  },
  {
    id: 14,
    title: 'Today',
    start: new Date(new Date().setHours(new Date().getHours() - 3)),
    end: new Date(new Date().setHours(new Date().getHours() + 3)),
  },
]