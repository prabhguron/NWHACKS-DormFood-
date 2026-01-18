// homePage.js
const signUp = document.getElementById('btn-signup');
const logIn = document.getElementById('btn-login');
const learnMore = document.getElementById('btn-learn-more');

signUp.addEventListener('click', function() {
    window.location.href = 'login.html?mode=signup';
});

logIn.addEventListener('click', function() {
    window.location.href = 'login.html?mode=login';
});

learnMore.addEventListener('click', function() {
    window.location.href = 'reference.html';
});