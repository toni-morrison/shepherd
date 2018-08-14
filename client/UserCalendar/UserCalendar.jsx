import React from 'react'
import BigCalendar from 'react-big-calendar'
export default class UserCalendar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      API_KEY: 'AIzaSyA3tNjW2qXiX07_v3rpKhWvN_CKfkUNqfc',
      CLIENT_ID: '667292252749-a250ctrk4m90rt4hu3iflie2lot9splk.apps.googleusercontent.com',
      SCOPES: ["https://www.googleapis.com/auth/calendar"],
      DISCOVERY_DOCS: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
    }
  }
  
  componentDidMount () {
    
  }
  
  render () {
    return (<div>
        <BigCalendar
          step = {60}
          showMultiDayTimes
          defaultDate = {new Date (2018, 8, 14)}
          />

      </div>)
  }
}