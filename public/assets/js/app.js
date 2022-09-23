var firebaseConfig = {
    apiKey: "AIzaSyCFmjjcqHG7VGMpBy2-4roTv4-rYnOTMyQ",
    authDomain: "adminpanel-d38cf.firebaseapp.com",
    projectId: "adminpanel-d38cf",
    storageBucket: "adminpanel-d38cf.appspot.com",
    messagingSenderId: "64092601197",
    appId: "1:64092601197:web:59319052ba969f1f2d7864",
    measurementId: "G-CS05DWLCS8"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const signupForm = document.querySelector('#signup-form');



// Signup Form

signupForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.querySelector('#signup-email').value;
  const password = document.querySelector('#signup-password').value;

  auth.createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        console.log('sign up')
      })

});

