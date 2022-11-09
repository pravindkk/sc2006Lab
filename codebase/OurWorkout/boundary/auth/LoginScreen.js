import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import React, { Component, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { firebase } from '../../config'
import { StoreUser, updateLocalStorage } from '../../controller/UserComponent'
import { useGlobalState } from '../../controller/GlobalState'

const LoginScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loggedIn, setLoggedIn] = useGlobalState('loggedIn');

    useEffect(() => {
        StoreUser('');
    }, [])

    loginUser = async (email, password) => {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password)
                .then(async (userCredential) => {
                    await updateLocalStorage(userCredential.user.uid).then(setLoggedIn(true));
                })
        } catch (e) {
            if (e.code == 'auth/invalid-email') {
                alert("Please enter a valid email");
            }
            else if (e.code == 'auth/user-not-found') {
                alert("The user is not found. Please register for a new account!");
            }
            else if (e.code == 'auth/wrong-password') {
                alert("Sorry the password is wrong! Try again");
            }
            else {
                alert(e.message)
            }
            
        }
    }

    return (
        <View style={[styles.container, {marginTop: 60, padding: 20}]}>
            <Text style={styles.title}>
                Login
            </Text>
            
            <View style={{marginTop: 60}}>
            <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Email</Text>
                <TextInput
                    value={email}
                    placeholder="Your Email Address"
                    onChangeText={text => setEmail(text)}
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.input}
                    keyboardType='email-address'
                />
            </View>
            <View style={[styles.inputContainer, {marginTop: 20}]}>
                <Text style={styles.inputTitle}>Password</Text>
                <TextInput
                    value={password}
                    placeholder="Your Password"
                    onChangeText={text => setPassword(text)}
                    style={styles.input}
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry
                />
            </View>
                
            <TouchableOpacity
                onPress={() => loginUser(email, password)}
                style={[styles.button, { marginTop: 30 }]}
            >
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('Register')}
                style={{marginTop: 20}}
            >
                <Text style={{fontWeight: 'bold', fontSize: 16}}>Dont have an account? Register here!</Text>
            </TouchableOpacity>
            </View>
        </View>
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

})