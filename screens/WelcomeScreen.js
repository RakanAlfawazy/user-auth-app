import axios from 'axios';
import { useContext, useEffect, useState } from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { AuthContext } from '../store/auth-context';

// WelcomeScreen component displays a welcome message after successful authentication
function WelcomeScreen() {
  const [fetchedMessage, setFetchedMesssage] = useState(''); // State to store fetched message

  const authCtx = useContext(AuthContext); // Access authentication context
  const token = authCtx.token; // Get the authentication token

  // Fetch message from the server using the token for authentication
  useEffect(() => {
    axios
      .get(
        'https://expense-tracker-app-69828-default-rtdb.firebaseio.com/message.json?auth=' +
          token
      )
      .then((response) => {
        setFetchedMesssage(response.data); // Set the fetched message
      });
  }, [token]);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{fetchedMessage}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
