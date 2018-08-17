import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider, Query } from 'react-apollo';
import gql from 'graphql-tag';
import TopTabs from './Tabs/TopTabs.jsx';
import SplashPage from './SplashPage/SplashPage.jsx';
import { CircleLoader } from 'react-spinners';
import firebase from '../server/firebase/firebase.js';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql'
});

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      user: undefined
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user: user.email, loaded: true });
      } else {
        console.log('not signed in!');
        this.setState({ user: undefined, loaded: true });
      }
    });
  }

  render() {
    if (!this.state.loaded) {
      return (
        <div className="loader">
          <CircleLoader
            sizeUnit={'px'}
            size={150}
            color={'#123abc'}
            loading={!this.state.loaded}
          />
        </div>
      );
    } else {
      return (
        <ApolloProvider client={client}>
          <div id="fullpage">
            <TopTabs user={this.state.user} />
            <SplashPage user={this.state.user} />
          </div>
        </ApolloProvider>
      );
    }
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
