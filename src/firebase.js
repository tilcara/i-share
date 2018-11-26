import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyCI_xSA1bPexjEo-UjDIuwTtsKE5S_9kJY',
  authDomain: 'reddit-clone-f043c.firebaseapp.com',
  databaseURL: 'https://reddit-clone-f043c.firebaseio.com',
  projectId: 'reddit-clone-f043c',
  storageBucket: 'reddit-clone-f043c.appspot.com',
  messagingSenderId: '901669797204',
};

firebase.initializeApp(config);

export default firebase;
