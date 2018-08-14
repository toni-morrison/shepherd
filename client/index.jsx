import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ApolloClient from 'apollo-boost';
import { ApolloProvider, Query } from 'react-apollo';
import gql from 'graphql-tag';
import TopTabs from './Tabs/TopTabs.jsx';
// import Calendar from "./Calendar/Calendar.jsx"
import UserSitterRequest from './UserSitterRequest/UserSitterRequest.jsx';
import SplashPage from './SplashPage/SplashPage.jsx';

const client = new ApolloClient();

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <TopTabs />
        <UserSitterRequest />
        <SplashPage />
      </ApolloProvider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
