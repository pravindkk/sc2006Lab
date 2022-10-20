import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image } from 'react-native'
import Checkbox from 'expo-checkbox';
import React, { useState } from 'react'
import { firebase } from '../../config'
import { useNavigation } from '@react-navigation/native';
import pickImage from '../../controller/ImagePicker'
import { useGlobalState } from '../../controller/GlobalState';
import { updateLocalStorage } from '../../controller/UserComponent';
import { ScrollView } from 'react-native-gesture-handler';

const RegisterScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [isSelected, setSelection] = useState(false);
    const [redirect, setRedirect] = useState(true);
    const [loggedIn, setLoggedIn] = useGlobalState('loggedIn');

    const [image, setImage] = useState('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png');

    const navigation = useNavigation();

    const chooseImage = async () => {
        const pickedImage = await pickImage();
        if (pickedImage == null) setImage('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png');
        setImage(pickedImage)
        
    }

    const registerUser = async (email, password, firstName, lastName) => {
        const response = await fetch(image)
        const blob = await response.blob();
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
                alert('Verification email sent')
            }).catch((error) => {
                alert(error.message)
            })
            .then(() => {
                var uploadTask = firebase.storage().ref().child('users/' + userCredential.user.uid).put(blob);
                uploadTask.on('state_changed', function(snapshot){
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case firebase.storage.TaskState.PAUSED: // or 'paused'
                        console.log('Upload is paused');
                        break;
                        case firebase.storage.TaskState.RUNNING: // or 'running'
                        console.log('Upload is running');
                        break;
                        case firebase.storage.TaskState.SUCCESS: // or 'running'
                        console.log('Upload is running');
                        break;
                    }
                }, (error) => {
                    alert(error.message)
                })
                uploadTask.then(() => {
                    uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                        firebase.firestore().collection('users')
                        .doc(firebase.auth().currentUser.uid)
                        .set({
                            firstName: firstName,
                            lastName: lastName,
                            email: email,
                            photoURL: url,
                            likedGyms: [],
                        }).then(async() => {
                            await updateLocalStorage(userCredential.user.uid).then(setLoggedIn(true));
                            
                        })
                    })
                })

            })
            // .then(() => {
            //     firebase.firestore().collection('users')
            //     .doc(firebase.auth().currentUser.uid)
            //     .set({
            //         firstName: firstName,
            //         lastName: lastName,
            //         email: email,
            //         photoURL: '',
            //     })
            // }).catch((error) => {
            //     alert(error.message)
            // })
            // .then(async () => {
            //     await firebase.storage().ref().child('users/' + firebase.auth().currentUser.uid).put(blob).then(async () => {
            //         await addURl();
            //     })
            //     // setRedirect(true);
            // })
            // .catch(error => {
            //     alert(error.message)
            // })
        }).catch((error) => {
            alert(error.message)
            // setRedirect(false)
        })


        // if (redirect) navigation.replace("Login");
    }

    const addURl = async () => {
        await firebase.storage().ref().child('users/' + firebase.auth().currentUser.uid).getDownloadURL((res) => {
            console.log("updating");
            firebase.firestore().collection('users')
                .doc(firebase.auth().currentUser.uid)
                .update({
                    photoURL: res,
                })
        })
    }


    return (
        <View style={[styles.container, {marginTop: 60, padding: 20}]}>
            <Text style={styles.title}>
                Create an Account
            </Text>
            <ScrollView>
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