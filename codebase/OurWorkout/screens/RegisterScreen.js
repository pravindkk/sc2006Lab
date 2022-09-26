import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import Checkbox from 'expo-checkbox';
import React, { useState } from 'react'
import { firebase } from '../config'
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [isSelected, setSelection] = useState(false);

    const navigation = useNavigation();

    registerUser = async (email, password, firstName, lastName) => {
        if (isSelected == false) {
            alert("Please accept the T&C of OurWorkout")
            return
        }
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
            firebase.auth().currentUser.sendEmailVerification({
                handleCodeInApp: true,
                url: 'https://ourworkout-33235.firebaseapp.com'
            })
            .then(() => {
                alert('Verification email sent')
            }).catch((error) => {
                alert(error.message)
            })
            .then(() => {
                firebase.firestore().collection('users')
                .doc(firebase.auth().currentUser.uid)
                .set({
                    firstName,
                    lastName,
                    email,
                })
            }).catch((error) => {
                alert(error.message)
            })
        }).catch((error) => {
            alert(error.message)
        })
    }

    return (
        <View style={[styles.container, {marginTop: 60, padding: 20}]}>
            <Text style={styles.title}>
                Create an Account
            </Text>
            
            <View style={{marginTop: 60}}>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputTitle}>First Name</Text>
                    <TextInput
                        value={firstName}
                        placeholder="Your First Name"
                        onChangeText={text => setFirstName(text)}
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={styles.input}
                    />
                </View>
                <View style={[styles.inputContainer, {marginTop: 20}]}>
                    <Text style={styles.inputTitle}>Last Name</Text>
                    <TextInput
                        value={lastName}
                        placeholder="Your Last Name"
                        onChangeText={text => setLastName(text)}
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={styles.input}
                    />
                </View>
                <View style={[styles.inputContainer, {marginTop: 20}]}>
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
                <View style={styles.checkboxContainer}>
                    <Checkbox
                        style={styles.checkbox}
                        value={isSelected}
                        onValueChange={setSelection}
                        color={isSelected ? '#5570C0' : undefined}
                    />
                    <Text style={styles.label}>I agree with the <Text style={{color: '#5570F1'}}>T&C</Text> of OurWorkout</Text>
                </View>
                    
                <TouchableOpacity
                    onPress={() => registerUser(email, password, firstName, lastName)}
                    style={[styles.button, { marginTop: 30 }]}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Login')}
                    style={{marginTop: 20}}
                >
                    <Text style={{fontWeight: 'bold', fontSize: 16}}>Already have an account? Login here!</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default RegisterScreen

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
      checkboxContainer: {
        flexDirection: "row",
        marginTop: 10,
      },
      checkbox: {
        alignSelf: "center",
        borderRadius: 5,
      },
      label: {
        margin: 8,
      },
})