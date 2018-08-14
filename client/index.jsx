import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ApolloClient from 'apollo-boost';
import { ApolloProvider, Query } from 'react-apollo';
import gql from 'graphql-tag';
import TopTabs from './Tabs/TopTabs.jsx';
// import Calendar from "./Calendar/Calendar.jsx"
import SplashPage from './SplashPage/SplashPage.jsx';

const client = new ApolloClient();

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      signedIn: true // TODO: Change to false during production
    };
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <SplashPage signedIn={this.state.signedIn} />
        <TopTabs signedIn={this.state.signedIn} />
      </ApolloProvider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
