import * as firebase from 'firebase/app';
import firebaseConfig from '../apikeys';

export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
