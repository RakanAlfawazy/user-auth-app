import { useContext, useState } from 'react';
import { Alert } from 'react-native';

import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import { AuthContext } from '../store/auth-context';
import { createUser } from '../util/auth';

// SignupScreen component handles the signup process and displays the authentication form
function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false); // State to track authentication process

  const authCtx = useContext(AuthContext); // Access authentication context

  // Handler to manage the signup process
  async function signupHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await createUser(email, password); // Attempt to create a new user with provided credentials
      authCtx.authenticate(token); // Authenticate user with received token
    } catch (error) {
      // Show alert if authentication fails
      Alert.alert(
        'Authentication failed',
        'Could not create user, please check your input and try again later.'
      );
      setIsAuthenticating(false); // Reset authentication state
    }
  }

  // Show loading overlay while authenticating
  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user..." />;
  }

  // Render authentication form
  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
