import firebase from 'firebase';
import 'firebase/auth';
import firebaseApp from './config';
import SignInEntry from '../interfaces/SignInEntry';
import UserModel from '../interfaces/UserModel';
import { ROOT_USER_EMAIL_ADDRESS } from '../blog_configs';

const checkIfValidUser = (userInfo: UserModel) => userInfo.uid !== '';
const checkIfRootUser = (userInfo: UserModel) => userInfo.email !== undefined && userInfo.email === ROOT_USER_EMAIL_ADDRESS;


const startFirebaseAuthChangeListener = (
  onLogin: (user: firebase.User) => void,
  onLoggedOut: () => void,
) => {
  firebaseApp.auth().onAuthStateChanged((user) => {
    if (user) {
      onLogin(user);
    } else {
      onLoggedOut();
    }
  });
};

const signIn = (
  signInInfo: SignInEntry,
  onSuccess?: (sessionID: string) => void,
  onFailure?: (errorMessage: string) => void,
) => {
  firebaseApp
    .auth()
    .signInWithEmailAndPassword(signInInfo.email, signInInfo.password)
    .then(() => {
      if (onSuccess) {
        onSuccess('hello world');
      }
    })
    .catch((e) => {
      if (onFailure) {
        onFailure(e.message);
      }
    });
};

const signInWithGoogleAccount = (onSuccess?: () => void) => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebaseApp
    .auth()
    .signInWithPopup(provider)
    .then((result) => {})
    .catch((error) => {});
  if (onSuccess) {
    onSuccess();
  }
};

const signOut = () => firebaseApp.auth().signOut();

export {
  checkIfRootUser,
  checkIfValidUser,
  signIn,
  startFirebaseAuthChangeListener,
  signInWithGoogleAccount,
  signOut,
};
