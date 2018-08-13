import React from 'react'
import $ from 'jquery'
class UserCalendar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      source: "https://calendar.google.com/calendar/embed/",
      API_KEY: '',
      CLIENT_ID: '',
      SCOPES: ["https://www.googleapis.com/auth/calendar.readonly","https://www.googleapis.com/auth/calendar"],
      DISCOVERY_DOCS: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
    }
  }
  
  componentDidMount () {
    
  }
  
  render () {
    return (<div>
        <iframe src="https://calendar.google.com/calendar/embed?src=4ggtmdojqb8je3n6mlnicj02jc%40group.calendar.google.com&ctz=America%2FNew_York" style="border: 0" width="800" height="600" frameborder="0" scrolling="no"></iframe>

      </div>)
  }
}