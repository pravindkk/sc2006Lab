import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { firebase } from '../config'
import { getAuth, signOut } from "firebase/auth";
import { useNavigation } from '@react-navigation/native'
import Svg, { SvgFromUri, SvgWithCss } from 'react-native-svg'

// import ChatIcon from '../assets/icons/Chat'
// import ChatIcon from '../assets/icons/ChatIcon';

import Chat from '../assets/icons/Chat.svg'
import Home from '../assets/icons/Search.svg'

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
            {/* <SvgFromUri width="50" height="50" fill={'#000'} uri={'https://www.svgrepo.com/download/25994/chat.svg'} /> */}
            {/* <Svg width={50} height={50} stroke={"#000"} source={require("../assets/icons/Chat.svg").default.src} /> */}

            {/* <SvgFromXml xml={ChatIcon} /> */}
            {/* <SvgUri width={25} height={25} source={require('../assets/icons/Chat.svg')} /> */}
            <View style={{flexDirection: 'row', justifyContent:'space-evenly'}}>
                <Text style={styles.welcomeBanner}>
                    Welcome Back, {name.firstName}
                </Text>
                {/* <Chat width={25} height={25} fill={'#fff'} /> */}
                
            </View>
            
            
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