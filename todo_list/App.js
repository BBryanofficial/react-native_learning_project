import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import SignInScreen from './logIn';
import SignUpScreen from './signup';
import TodoApp from './TodoApp';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSignIn = () => {
    setIsLoggedIn(true);
  };

  const handleSignUp = () => {
    setIsSignUp(true);
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    setIsSignUp(false);
  };

  return (
    <View style={styles.container}>
      {isLoggedIn ? (
        <TodoApp onSignOut={handleSignOut} />
      ) : isSignUp ? (
        <SignUpScreen onSignIn={() => setIsSignUp(false)} onSignUp={handleSignUp} />
      ) : (
        <SignInScreen onSignIn={handleSignIn} onSignUp={handleSignUp} />
      )}
    </View>
  );
};

export default App;
