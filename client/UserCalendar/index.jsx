import React from 'react'
class UserCalendar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      source: "https://calendar.google.com/calendar/embed/"
    }
    this.initClient = this.initClient.bind(this)
  }
  function initClient() {
    gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES
    }).then(function () {
      // Listen for sign-in state changes.
      gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

      // Handle the initial sign-in state.
      updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      authorizeButton.onclick = handleAuthClick;
      signoutButton.onclick = handleSignoutClick;
    });
  }
  render () {
    return (<div>
      <iframe src={this.state.source} style="border: 0" width="800" height="600" frameborder="0" scrolling="no"></iframe>

      
      
      
      </div>)
  }
}