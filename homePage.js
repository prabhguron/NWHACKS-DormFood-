// homePage.js - Reusable for multiple pages
const logIn = document.getElementById('btn-login');
const signUp = document.getElementById('btn-signup');
const learnMore = document.getElementById('btn-learn-more');

// Only add event listener if the button exists
if (logIn) {
  logIn.addEventListener('click', function() {
    window.location.href = 'login.html?mode=login';
  });
}

if (signUp) {
  signUp.addEventListener('click', function() {
    window.location.href = 'login.html?mode=signup';
  });
}

if (learnMore) {
  learnMore.addEventListener('click', function() {
    window.location.href = 'reference.html';
  });
}