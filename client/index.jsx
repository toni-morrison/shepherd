import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import TopTabs from './Tabs/TopTabs.jsx';
import SplashPage from './SplashPage/SplashPage.jsx';
import firebase from '../server/firebase/firebase.js';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql'
});

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      signedIn: false, // TODO: Change to false during production
      user: null
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.checkUser = this.checkUser.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }
  componentDidMount() {
    this.checkUser();
  }

  checkUser() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState(
          {
            user: user.email
          },
          () => {
            this.handleLogin();
          }
        );
      } else {
        console.log('not signed in!');
      }
    });
  }

  handleLogin() {
    this.setState({
      signedIn: true
    });
  }

  handleLogout() {
    this.setState({
      signedIn: false
    });
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <SplashPage
          signedIn={this.state.signedIn}
          handleLogin={this.handleLogin}
        />
        <TopTabs logout={this.handleLogout} signedIn={this.state.signedIn} />
      </ApolloProvider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
