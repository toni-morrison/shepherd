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
      user: undefined
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
        this.setState({
          user: user.email
        });
      } else {
        console.log('not signed in!');
      }
    });
  }

  handleLogin() {
    this.checkUser();
  }

  handleLogout() {
    this.setState({
      user: undefined
    });
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <SplashPage
          user={this.state.user}
          handleLogin={this.handleLogin}
        />
        <TopTabs logout={this.handleLogout} user={this.state.user} />
      </ApolloProvider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
