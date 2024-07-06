import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useEffect, useState } from 'react';

// Create an authentication context with default values
export const AuthContext = createContext({
  token: '',
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
});

// AuthContextProvider component manages authentication state and provides context values
function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState(); // State to store authentication token

  // Function to authenticate the user by setting the token and saving it to AsyncStorage
  function authenticate(token) {
    setAuthToken(token);
    AsyncStorage.setItem('token', token);
  }

  // Function to logout the user by clearing the token and removing it from AsyncStorage
  function logout() {
    setAuthToken(null);
    AsyncStorage.removeItem('token');
  }

  // Context value to be provided to the consuming components
  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>; // Provide context value to children components
}

export default AuthContextProvider;
