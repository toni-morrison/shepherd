
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ApolloClient from 'apollo-boost';
import { ApolloProvider, Query } from 'react-apollo';
import gql from 'graphql-tag';
import TopTabs from './Tabs/TopTabs.jsx'
import Login from './Login/Login.jsx';
import Signup from './Signup/Signup.jsx';
// import Calendar from "./Calendar/Calendar.jsx"
import SitterRequest from './SitterRequest/SitterRequest.jsx';


const client = new ApolloClient();

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <div>Shepherd</div>

        {/* <Login />
        <Signup /> */}
        {/* <Calendar/> */}
        <TopTabs />

      </ApolloProvider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
