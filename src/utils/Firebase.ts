/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as firebase from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  UserCredential,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { GoogleAuthProvider, OAuthProvider } from "firebase/auth";

const gProvider = new GoogleAuthProvider();
const aProvider = new OAuthProvider("apple.com");

export class Firebase {

  protected static instance: Firebase;

  constructor() {
    const app = firebase.initializeApp({
      apiKey: "AIzaSyC0WjcnjnnZowz4JcOpLTRRs_NvPoqPHN4",
      authDomain: "incode-editor.firebaseapp.com",
      projectId: "incode-editor",
      storageBucket: "incode-editor.appspot.com",
      messagingSenderId: "904565498165",
      appId: "1:904565498165:web:731196c66d52ffc9966c7c",
      measurementId: "G-9BY59CNMDC",
    });

    Firebase.instance = this;
  }

  public loginGoogle(callback: (user: UserCredential | null) => void) {
    signInWithPopup(getAuth(), gProvider)
      .then((user) => {
        callback(user);
      })
      .catch((error) => {
        callback(null);
      });
  }

  public logout(callback: () => void) {
    signOut(getAuth())
      .then(() => {
        callback();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  public isLoggedIn(): boolean {
    return !(getAuth().currentUser === null);
  }

  public static getInstance(): Firebase {
    return Firebase.instance;
  }
}
