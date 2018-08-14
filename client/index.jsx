import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ApolloClient from 'apollo-boost';
import { ApolloProvider, Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Button } from 'react-bootstrap';
import TopTabs from './Tabs/TopTabs.jsx';
// import Calendar from "./Calendar/Calendar.jsx"
import SplashPage from './SplashPage/SplashPage.jsx';

const client = new ApolloClient();

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      signedIn: false // TODO: Change to false during production
    };
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin() {
    this.setState({
      signedIn: true
    });
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <SplashPage
          signedIn={this.state.signedIn}
          handleLogin={this.handleLogin}
        />
        <TopTabs signedIn={this.state.signedIn} />
      </ApolloProvider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
