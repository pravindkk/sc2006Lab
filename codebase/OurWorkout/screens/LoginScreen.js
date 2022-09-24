import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { auth } from '../firebase'

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.replace("Home")
      }
    })

    return unsubscribe
  }, [])

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Registered with:', user.email);
      })
      .catch(error => alert(error.message))
  }

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Logged in with:', user.email);
      })
      .catch(error => alert(error.message))
  }

  return (
    <KeyboardAvoidingView
      style={styles.mainContainer}
      behavior="padding"
    >
      <View
        style={styles.container}
        
      >
        <Text style={styles.title}>Login</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Email</Text>
          <TextInput
            value={email}
            placeholder="Your Email Address"
            onChangeText={text => setEmail(text)}
            style={styles.input}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Password</Text>
          <TextInput
            value={password}
            placeholder="Your Password"
            onChangeText={text => setPassword(text)}
            style={styles.input}
            secureTextEntry
          />
        </View>
        <View>
          <TouchableOpacity
            onPress={handleLogin}
            style={[styles.button, styles.buttonOutline]}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footerContainer}>
          <Text style={styles.footer}>New User? <TouchableOpacity onPress={() => navigation.navigate('Register')}><Text>Register here!</Text></TouchableOpacity></Text>
        </View>
      </View>
    </KeyboardAvoidingView>

  )
}

export default LoginScreen

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    width: '90%',
    // padding: 30
    // alignItems: 'center',
  },

  title: {
    color: '#2B2F32',
    fontWeight: 'bold',
    fontSize: 35,
    // marginBottom: 40
  },
  inputContainer: {
    // width: '90%',
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
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: "#303437",
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 20,

  },
  footerContainer: {
    flex: 1,
  },
  footer: {
    height: 100
  }

})
  // button: {
  //   backgroundColor: '#0782F9',
  //   width: '100%',
  //   padding: 15,
  //   borderRadius: 10,
  //   alignItems: 'center',
  // },
  // buttonOutline: {
  //   backgroundColor: 'white',
  //   marginTop: 5,
  //   borderColor: '#0782F9',
  //   borderWidth: 2,
  // },
  // buttonText: {
  //   color: 'white',
  //   fontWeight: '700',
  //   fontSize: 16,
  // },
  // buttonOutlineText: {
  //   color: '#0782F9',
  //   fontWeight: '700',
  //   fontSize: 16,
  // },


      // <KeyboardAvoidingView
    //   style={styles.container}
    //   behavior="padding"
    // >
    //   <Text style={styles.title}>Login</Text>
    //   <View style={styles.inputContainer}>
    //     <TextInput
    //       placeholder="Email"
    //       value={email}
    //       onChangeText={text => setEmail(text)}
    //       style={styles.input}
    //     />
    //     <TextInput
    //       placeholder="Password"
    //       value={password}
    //       onChangeText={text => setPassword(text)}
    //       style={styles.input}
    //       secureTextEntry
    //     />
    //   </View>

    //   <View style={styles.buttonContainer}>
    //     <TouchableOpacity
    //       onPress={handleLogin}
    //       style={styles.button}
    //     >
    //       <Text style={styles.buttonText}>Login</Text>
    //     </TouchableOpacity>
    //     <TouchableOpacity
    //       onPress={() => navigation.navigate('Register')}
    //       style={[styles.button, styles.buttonOutline]}
    //     >
    //       <Text style={styles.buttonOutlineText}>Register</Text>
    //     </TouchableOpacity>
    //   </View>
    // </KeyboardAvoidingView>