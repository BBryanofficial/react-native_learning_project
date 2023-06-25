import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { signUp } from './api';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputField: {
    height: 40,
    paddingHorizontal: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#2196f3',
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  signinLink: {
    alignSelf: 'center',
  },
  signinLinkText: {
    fontSize: 14,
    color: '#2196f3',
    textDecorationLine: 'underline',
  },
});

const SignUpScreen = ({ onSignIn, onSignUp, navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [identifiant, setIdentifiant] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    if (name.trim() === '' || email.trim() === '' || identifiant.trim() === '' || password === '') {
      alert('Please enter all fields');
      return;
    }

    const response = await signUp(name, email, identifiant, password, navigation);

    if (response.success) {
      onSignUp();
      setName('');
      setEmail('');
      setIdentifiant('');
      setPassword('');
    } else {
      alert(response.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.inputField}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.inputField}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.inputField}
        placeholder="Identifiant"
        value={identifiant}
        onChangeText={(text) => setIdentifiant(text)}
      />
      <TextInput
        style={styles.inputField}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.signinLink} onPress={onSignIn}>
        <Text style={styles.signinLinkText}>Already have an account? Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpScreen;
