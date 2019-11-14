import * as firebase from "firebase/app";
import "firebase/storage";
import prod from './firebase_prod';
import dev from './firebase_dev';

let apiKey;
if (process.env.NODE_ENV === "production") {
  apiKey = prod.apiKey;
} else {
  apiKey = dev.apiKey;
}



var firebaseConfig = {
  apiKey: apiKey,
  authDomain: "recipeapp-258123.firebaseapp.com",
  databaseURL: "https://recipeapp-258123.firebaseio.com",
  projectId: "recipeapp-258123",
  storageBucket: "recipeapp-258123.appspot.com",
  messagingSenderId: "89316821281",
  appId: "1:89316821281:web:f3ea9570c52cd71a485660",
  measurementId: "G-XWVJC08D93"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
