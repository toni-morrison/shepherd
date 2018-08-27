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
      user: undefined,
      pic: undefined
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user: user.email, pic: user.photoURL, loaded: false }, () => {
          setTimeout(() => {
            this.setState({ loaded: true });
          }, 500);
        });
      } else {
        this.setState({ user: undefined, pic: undefined, loaded: false }, () => {
          setTimeout(() => {
            this.setState({ loaded: true });
          }, 500);
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
          <TopTabs user={this.state.user} userPic={this.state.pic} />
          <SplashPage user={this.state.user} />
        </ApolloProvider>
      );
    }
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
