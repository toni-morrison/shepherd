import React from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import dates from './dates.js'
import events from './events.js'
export default class UserCalendar extends React.Component {
  constructor (props) {
    super(props)
//    this.state = {
//      API_KEY: 'AIzaSyA3tNjW2qXiX07_v3rpKhWvN_CKfkUNqfc',
//      CLIENT_ID: '667292252749-a250ctrk4m90rt4hu3iflie2lot9splk.apps.googleusercontent.com',
//      SCOPES: ["https://www.googleapis.com/auth/calendar"],
//      DISCOVERY_DOCS: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
//    }
  BigCalendar.setLocalizer(BigCalendar.momentLocalizer (moment))
  this.allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])
  }


  render () {
    return (<div>
      <BigCalendar
        events={events}
        views={this.allViews}
        step={60}
        showMultiDayTimes
        selectable
        onSelectEvent={event => alert(event.sitterID)}

      />

      </div>)
  }
}