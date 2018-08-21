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
  uri: 'http://localhost:8080/graphql'
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
        this.setState({ user: user.email, loaded: false }, () => {
          setTimeout(() => {
            this.setState({ loaded: true });
          }, 2000);
        });
      } else {
        console.log('not signed in!');
        this.setState({ user: undefined, loaded: false }, () => {
          setTimeout(() => {
            this.setState({ loaded: true });
          }, 2000);
        });
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
          <TopTabs user={this.state.user} />
          <SplashPage user={this.state.user} />
        </ApolloProvider>
      );
    }
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
