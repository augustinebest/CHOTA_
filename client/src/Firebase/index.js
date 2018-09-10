import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/database';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyC46lxeuMFUFpZKAXz43kNJLz2ikcG456A",
    authDomain: "chota-dae5f.firebaseapp.com",
    databaseURL: "https://chota-dae5f.firebaseio.com",
    projectId: "chota-dae5f",
    storageBucket: "chota-dae5f.appspot.com",
    messagingSenderId: "781685198537"
};
firebase.initializeApp(config);

const storage = firebase.storage();
export const database = firebase.database();

export {
    storage,firebase,database as default 
}

