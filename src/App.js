import React from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import SubmissionForm from './components/SubmissionForm';

import 'bootstrap/dist/css/bootstrap.min.css';

// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

firebase.initializeApp(firebaseConfig);

const App = () => {
  return (
    <div>
      <SubmissionForm />
    </div>
  );
};

export default App;
