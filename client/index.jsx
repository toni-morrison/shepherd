import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import TopTabs from './Tabs/TopTabs.jsx';
import SplashPage from './SplashPage/SplashPage.jsx';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql'
});

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      signedIn: true // TODO: Change to false during production
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
