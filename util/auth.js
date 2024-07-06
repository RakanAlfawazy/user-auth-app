import axios from 'axios';

// Firebase API key for authentication
const API_KEY = 'AIzaSyCf3N7DGJ5vKYU32z69wkeyYtDgPt997io';

// Function to handle authentication requests
async function authenticate(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  // Make a POST request to the Firebase authentication API
  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });

  // Extract the token from the response data
  const token = response.data.idToken;

  return token;
}

// Function to create a new user with email and password
export function createUser(email, password) {
  return authenticate('signUp', email, password);
}

// Function to log in an existing user with email and password
export function login(email, password) {
  return authenticate('signInWithPassword', email, password);
}
