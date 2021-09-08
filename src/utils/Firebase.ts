/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as firebase from 'firebase/app'
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    UserCredential,
    signInWithPopup,
    signOut
} from 'firebase/auth';
import { GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();

export class Firebase {

    protected static instance: Firebase;
    protected static currentUser: UserCredential | null;

    constructor() {
        const app = firebase.initializeApp({
            apiKey: "AIzaSyC0WjcnjnnZowz4JcOpLTRRs_NvPoqPHN4",
            authDomain: "incode-editor.firebaseapp.com",
            projectId: "incode-editor",
            storageBucket: "incode-editor.appspot.com",
            messagingSenderId: "904565498165",
            appId: "1:904565498165:web:731196c66d52ffc9966c7c",
            measurementId: "G-9BY59CNMDC"
        })

        Firebase.instance = this;
    }

    public loginEmail(email: string, password: string, callback: (user: UserCredential | null) => void) {
        signInWithEmailAndPassword(getAuth(), email, password)
            .then((user) => {
                callback(user)
                Firebase.currentUser = user;
            })
            .catch((error) => {
                callback(null)
                Firebase.currentUser = null;
            })
    }

    public loginGoogle(callback: (user: UserCredential | null) => void) {
        signInWithPopup(getAuth(), provider)
            .then((user) => {
                callback(user)
                Firebase.currentUser = user;
            })
            .catch((error) => {
                callback(null)
                Firebase.currentUser = null;
            })
    }

    public logout(user: UserCredential | null, callback: () => void) {
        signOut(getAuth()).then(callback).catch((error) => {
                console.log(error)
            }
        )
    }

    public static getInstance(): Firebase {
        return Firebase.instance;
    }
}