import firebase from '../../server/firebase/firebase.js';
import React from 'react';

export default class GoogleLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: ''
    };
    this.loginWithGoogle = this.loginWithGoogle.bind(this);
  }

  loginWithGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        this.props.handleToggleLogin();
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="auth-form">
        <button type="button" onClick={() => this.loginWithGoogle()}>
          Login With Google
        </button>
      </div>
    );
  }
}
