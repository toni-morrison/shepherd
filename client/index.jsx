import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
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
    this.handleLogin = this.handleLogin.bind(this);
    this.checkUser = this.checkUser.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
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

  checkUser() {}

  handleLogin() {
    this.checkUser();
  }

  handleLogout() {
    this.checkUser();
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
          <TopTabs logout={this.handleLogout} user={this.state.user} />
          <SplashPage handleLogin={this.handleLogin} user={this.state.user} />
        </ApolloProvider>
      );
    }
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
