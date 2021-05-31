import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCRx4EI9wMNR4tdCohBxp6dlPDf3ISJEGg',
  authDomain: 'react-a0b29.firebaseapp.com',
  projectId: 'react-a0b29',
  storageBucket: 'react-a0b29.appspot.com',
  messagingSenderId: '743907188403',
  appId: '1:743907188403:web:3a9d4f4875a3dc16fb9ac6'
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const database = firebase.database();
export const storage = firebase.storage();
export const provider = new firebase.auth.GoogleAuthProvider();


