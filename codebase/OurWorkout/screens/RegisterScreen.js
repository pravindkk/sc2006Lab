import { Alert, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { auth } from '../firebase'

const RegisterScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    if (email == '' | password == '' | phoneNumber == 0 | firstName == '' | lastName == '') {
      Alert.alert("Please fill in all the fields")
      return;
    }
    auth
        .createUserWithEmailAndPassword(email, password)
        .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Registered with:', user.email);
        })
        .catch(error => alert(error.message))
  }

  return (
      <KeyboardAvoidingView
        style={styles.mainContainer}
        behavior="padding"
      >
        <Text style={styles.title}>Register</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>First Name</Text>
          <TextInput
            value={firstName}
            placeholder="Your First Name"
            onChangeText={text => setFirstName(text)}
            style={styles.input}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Last Name</Text>
          <TextInput
            value={lastName}
            placeholder="Your Last Name"
            onChangeText={text => setLastName(text)}
            style={styles.input}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Email</Text>
          <TextInput
            value={email}
            placeholder="Your Email"
            onChangeText={text => setEmail(text)}
            style={styles.input}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Phone Number</Text>
          <TextInput
            value={phoneNumber}
            placeholder="Your Phone Number"
            onChangeText={text => setPhoneNumber(text)}
            style={styles.input}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Password</Text>
          <TextInput
            value={password}
            placeholder="Your Password"
            onChangeText={text => setPassword(text)}
            style={styles.input}
          />
        </View>

        <View>
          <TouchableOpacity
            onPress={handleSignUp}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
        
      </KeyboardAvoidingView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  mainContainer: {
    // width: '90%',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',

    height: '70%',
  },
  title: {
    color: '#2B2F32',
    fontWeight: 'bold',
    fontSize: 35,
    textAlign: 'left',
  },
  inputContainer: {
    width: '90%',
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    borderWidth: 1,
    borderColor: "#CFD3D4"
  },
  inputTitle: {
    color: "#5E6366",
    marginBottom: 5
  },
  button: {
    backgroundColor: "#303437",
    padding: 15,
    borderRadius: 12,
    width: '90%',
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 20,
    alignItems: 'center',
  },
})