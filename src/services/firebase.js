// Import the functions you need from the SDKs you need

import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: 'AIzaSyB6LWo3rhq4q2YwGEzAlXCTXSBTujE3qos',

  authDomain: 'mkyy-blog.firebaseapp.com',

  databaseURL: 'https://mkyy-blog-default-rtdb.firebaseio.com',

  projectId: 'mkyy-blog',

  storageBucket: 'mkyy-blog.appspot.com',

  messagingSenderId: '702261509183',

  appId: '1:702261509183:web:20fd10bd16f46ebbdecc8a',

  measurementId: 'G-L6SFZ8ERR8',
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);
export const auth = getAuth(app);
