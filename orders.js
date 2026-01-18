import { getAuth } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { getUserData } from './firebase.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { firebaseConfig } from './firebaseConfig.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Wait for Firebase to tell us who the current user is
auth.onAuthStateChanged(async (user) => {
  if (user) {
    console.log('User is logged in:', user.uid);
    sessionStorage.setItem('currentUser', user.uid);

    // Optionally fetch user data
    const result = await getUserData(user.uid);
    if (result.success) {
      alert(`Welcome ${result.data.name}! UID: ${user.uid}`);
    } else {
      alert('Failed to get user data: ' + result.error);
    }
  } else {
    console.log('No user logged in');
    alert('Please log in first.');
  }
});
