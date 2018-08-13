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

    });
  }
  
  function handleClientLoad() {
    gapi.load('client:auth2', initClient);
  }
  
  componentDidMount () {
    
  }
  
  render () {
    return (<div>
      <iframe src={this.state.source} style="border: 0" width="800" height="600" frameborder="0" scrolling="no"></iframe>

      <script async defer src="https://apis.google.com/js/api.js"
        onload={this.onload=function(){};this.handleClientLoad()}
        onreadystatechange={if (this.readyState === 'complete') this.onload()}>
      </script>
      
      
      </div>)
  }
}