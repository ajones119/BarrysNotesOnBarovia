  import firebase from 'firebase'
  
  const config = {
    apiKey: "AIzaSyAlj-rxzLVepL6HI4vlsUuMg-1iJrwr8HI",
    authDomain: "barrysnotesonbarovia.firebaseapp.com",
    projectId: "barrysnotesonbarovia",
    storageBucket: "barrysnotesonbarovia.appspot.com",
    messagingSenderId: "268177095287",
    appId: "1:268177095287:web:cb3ca7011565dfd3c1a472",
    measurementId: "G-H8VQC866XL"
  };
  // Initialize Firebase
  firebase.initializeApp(config);
  

  export default firebase;