import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { firebase } from '../config'
import { getAuth, signOut } from "firebase/auth";
import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar';
import BottomNavBar from '../components/BottomNavBar';

const HomeScreen = () => {
    const navigation = useNavigation()
    const [name, setName] = useState('');

    useEffect(() => {
        firebase.firestore().collection('users')
        .doc(firebase.auth().currentUser.uid).get()
        .then((snapshot) => {
            if (snapshot.exists) {
                setName(snapshot.data())
            }
            else {
                console.log('user does not exist')
            }
        })
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.welcomeBanner}>
                Welcome Back, {name.firstName}
            </Text>
            
            <TouchableOpacity
                onPress={() => {
                    const auth = getAuth()
                    signOut(auth).then(() => {
                        alert("You have been signed out!")
                    }).catch((error) => {
                        alert(error.message)
                    })
                }}
                style={styles.button}
            >
                <Text style={{fontSize: 22, fontWeight: 'bold'}}>
                    Sign Out
                </Text>
            </TouchableOpacity>
            {/* <BottomNavBar /> */}
            
            
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 100,
    },

    button: {
        marginTop: 50,
        height: 70,
        width: 250,
        backgroundColor: '#026efd',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        
    },

    welcomeBanner: {
        fontSize: 30,
        fontWeight: 'bold',
    },
})