// login.js
import { signUpUser, loginUser } from './firebase.js';

const urlParams = new URLSearchParams(window.location.search);
const mode = urlParams.get('mode');

// Debug: Log what mode we got
console.log('URL mode:', mode);

let isSignUp = mode === 'signup';

// Debug: Log the initial state
console.log('isSignUp:', isSignUp);

const formTitle = document.getElementById('form-title');
const nameField = document.getElementById('name-field');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const btnSubmit = document.getElementById('btn-submit');
const toggleMessage = document.getElementById('toggle-message');
const toggleLink = document.getElementById('toggle-link');
const navToggle = document.getElementById('nav-toggle');

function updateForm() {
  console.log('updateForm called, isSignUp:', isSignUp);
  
  if (isSignUp) {
    formTitle.textContent = 'Create Your Account';
    nameField.classList.remove('hidden');
    btnSubmit.textContent = 'Sign Up';
    toggleMessage.textContent = 'Already have an account?';
    toggleLink.textContent = 'Log In';
    navToggle.textContent = 'Log In';
  } else {
    formTitle.textContent = 'Login to Your Account';
    nameField.classList.add('hidden');
    btnSubmit.textContent = 'Log in';
    toggleMessage.textContent = "Don't have an account?";
    toggleLink.textContent = 'Sign Up';
    navToggle.textContent = 'Sign Up';
  }
}

updateForm();

toggleLink.addEventListener('click', function() {
  isSignUp = !isSignUp;
  updateForm();
});

navToggle.addEventListener('click', function() {
  isSignUp = !isSignUp;
  updateForm();
});

btnSubmit.addEventListener('click', async function() {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  
  if (!email || !password) {
    alert('Please fill in email and password');
    return;
  }
  
  if (isSignUp) {
    const name = nameInput.value.trim();
    if (!name) {
      alert('Please enter your name');
      return;
    }
    
    console.log('Signing up...');
    const result = await signUpUser(email, password, name);
    
    if (result.success) {
      window.location.href = 'reference.html';
    } else {
      alert('Sign up failed: ' + result.error);
    }
  } else {
    console.log('Logging in...');
    const result = await loginUser(email, password);
    
    if (result.success) {
      window.location.href = 'homePageLogged.html';
    } else {
      alert('Login failed: ' + result.error);
    }
  }
});