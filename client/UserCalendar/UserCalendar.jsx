import React from 'react'
class UserCalendar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      source: "https://calendar.google.com/calendar/embed/",
      API_KEY: '',
      CLIENT_ID: '',
      SCOPES: "https://www.googleapis.com/auth/calendar.readonly",
      DISCOVERY_DOCS: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
    }
  }
  
  function initClient() {
    gapi.client.init({
      apiKey: this.state.API_KEY,
      clientId: this.state.CLIENT_ID,
      discoveryDocs: this.state.DISCOVERY_DOCS,
      scope: this.state.SCOPES
    }).then(function () {
      // Listen for sign-in state changes.
      gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

      // Handle the initial sign-in state.
      updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      authorizeButton.onclick = handleAuthClick;
      signoutButton.onclick = handleSignoutClick;
    });
  }
  
  
  function listUpcomingEvents() {
    gapi.client.calendar.events.list({
      'calendarId': 'primary',
      'timeMin': (new Date()).toISOString(),
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': 10,
      'orderBy': 'startTime'
    }).then(function(response) {
      var events = response.result.items;
      appendPre('Upcoming events:');

      if (events.length > 0) {
        for (i = 0; i < events.length; i++) {
          var event = events[i];
          var when = event.start.dateTime;
          if (!when) {
            when = event.start.date;
          }
          appendPre(event.summary + ' (' + when + ')')
        }
      } else {
        appendPre('No upcoming events found.');
      }
    });
  }
  render () {
    return (<div>
      <iframe src={this.state.source} style="border: 0" width="800" height="600" frameborder="0" scrolling="no"></iframe>

      
      
      
      </div>)
  }
}