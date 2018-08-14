import firebase from 'firebase';
import { FIREBASE_CONFIG } from './firebase_config.js';

firebase.initializeApp(FIREBASE_CONFIG);

export default firebase;
