import { useContext, useState } from 'react';
import { Alert } from 'react-native';

import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import { AuthContext } from '../store/auth-context';
import { login } from '../util/auth';

// LoginScreen component handles the login process and displays the authentication form
function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false); // State to track authentication process

  const authCtx = useContext(AuthContext); // Access authentication context

  // Handler to manage the login process
  async function loginHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await login(email, password); // Attempt to login with provided credentials
      authCtx.authenticate(token); // Authenticate user with received token
    } catch (error) {
      // Show alert if authentication fails
      Alert.alert(
        'Authentication failed!',
        'Could not log you in. Please check your credentials or try again later!'
      );
      setIsAuthenticating(false); // Reset authentication state
    }
  }

  // Show loading overlay while authenticating
  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />;
  }

  // Render authentication form
  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
