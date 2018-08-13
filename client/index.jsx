import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ApolloClient from 'apollo-boost';
import { ApolloProvider, Query } from 'react-apollo';
import gql from 'graphql-tag';
import Login from './Login/Login.jsx';
import Signup from './Signup/Signup.jsx';
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
        <Login />
        <Signup />
      </ApolloProvider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
