import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image } from 'react-native'
import Checkbox from 'expo-checkbox';
import React, { useState } from 'react'
import { firebase } from '../../config'
import { useNavigation } from '@react-navigation/native';
import pickImage from '../../controller/ImagePicker'
import { useGlobalState } from '../../controller/GlobalState';
import { updateLocalStorage } from '../../controller/UserComponent';
import { ScrollView } from 'react-native-gesture-handler';
import * as FileSystem from 'expo-file-system';
import { DefaultImg } from '../../assets/icons/DefaultImg';

/**
 * A part of the application boundary.
 * Handles all user interaction involving user registration.
 * 
 * Upon succesful registration, the user account is created.
 * 
 * Upon succesful registration, the user is logged in.
 * 
 * Upon succesful registration, the app navigates to the HomeScreen.
 * @returns { View } The Register UI for the user
 */
const RegisterScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [isSelected, setSelection] = useState(false);
    const [redirect, setRedirect] = useState(true);
    const [loggedIn, setLoggedIn] = useGlobalState('loggedIn');
    const [image, setImage] = useState(DefaultImg);
    const navigation = useNavigation();
    /**
     * This function calls the ImagePicker Controller to pick a image, converts it to base64 and sets the image as such
     */
    const chooseImage = async () => {
        await pickImage().then(async (pickedImage) => {
            if (pickedImage == null) setImage(DefaultImg);
            else {
            const base64 = await FileSystem.readAsStringAsync(pickedImage, { encoding: 'base64' });
            // console.log(base64);
            let source = 'data:image/jpeg;base64,' + base64;
            setImage(source)
            }
        })      
    }

    /**
     * This function creates a new user in firebase using the email, firstName, lastName, email
     * and image
     * @param {email} email - Email of the user
     * @param {password} password - Password to be set by the user
     * @param {firstName} firstName - First Name of the user
     * @param {lastName} lastName  - Last Name of the user
     */

    const registerUser = async (email, password, firstName, lastName) => {
        // const response = await fetch(image)
        // const blob = await response.blob();
        let checkEmail = email.split('@')
        if (checkEmail[0].length < 7 || checkEmail[0].length > 100 || checkEmail[1].length < 7 || checkEmail[1]>100) {
            alert('Email is invalid')
            return
        }
        
        console.log("creating");
        if (isSelected == false) {
            alert("Please accept the T&C of OurWorkout")
            return
        }
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            firebase.auth().currentUser.sendEmailVerification({
                // handleCodeInApp: true,
                url: 'https://ourworkout-33235.firebaseapp.com'
            })
            .then(() => {
                alert('User has been created!')
            }).catch((error) => {
                alert(error.message)
            })
            .then(() => {
                firebase.firestore().collection('users')
                .doc(firebase.auth().currentUser.uid)
                .set({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    photoURL: image,
                    likedGyms: [],
                }).then(async() => {
                    await updateLocalStorage(userCredential.user.uid).then(setLoggedIn(true));
                    
                })

            })
        }).catch((e) => {
            if (e.code == 'auth/account-exists-with-different-credential') {
                alert("Account already exists with this email")
            }
            else if (e.code == 'auth/email-already-in-use') {
                alert("An account with the same email is in use");
            }
            else if (e.code == 'auth/weak-password') {
                alert("The password is too week. Please enter at least:\nSix digits,\nOne uppercase character,\nOne symbol");
            }
            else if (e.code == 'auth/invalid-email') {
                alert("Please enter a valid email");
            }
            else {
                alert(e.code);
            }
            // setRedirect(false)
        })


        // if (redirect) navigation.replace("Login");
    }


    return (
        <View style={[styles.container, {marginTop: 60, padding: 20}]}>
            <Text style={styles.title}>
                Create an Account
            </Text>
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{marginTop: 60}}>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputTitle}>First Name</Text>
                    <TextInput
                        value={firstName}
                        placeholder="Your First Name"
                        onChangeText={text => setFirstName(text)}
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
                <View style={[styles.inputContainer, {marginTop: 20}]}>
                    <Text style={styles.inputTitle}>Profile Picture</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Image
                            source={{uri: image}}
                            style={{width: 100, height: 100, borderRadius: 50 }} 
                        />
                        <TouchableOpacity onPress={chooseImage} style={{justifyContent: 'center'}}>
                            <Text style={{fontSize: 17, backgroundColor: '#303437', padding: 10, borderRadius:10, color: '#fff'}}>Choose Picture</Text>
                        </TouchableOpacity>
                    </View>
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
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Login')}
                    style={{marginTop: 20}}
                >
                    <Text style={{fontWeight: 'bold', fontSize: 16}}>Already have an account? Login here!</Text>
                </TouchableOpacity>
            </View>
            <View style={{paddingBottom: 100}} />
            </ScrollView>
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