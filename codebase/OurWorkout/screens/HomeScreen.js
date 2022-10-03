import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { firebase } from '../config'
import { getAuth, signOut } from "firebase/auth";
import { useNavigation } from '@react-navigation/native'
import Svg, { SvgFromUri, SvgFromXml, SvgWithCss, SvgXml } from 'react-native-svg'

import Chat from '../assets/icons/Chat.svg'
import { ChatIcon } from '../assets/icons/Icons';
import { GetUser } from '../components/UserComponent';

const HomeScreen = () => {
    
    const navigation = useNavigation()
    const [name, setName] = useState('');
    const [hasLoaded, setLoaded] = useState(false)
    const [image, setImage] = useState('');
    const [icon, setIcon] = useState('');

    useEffect(() => {
        // var s = new XMLSerializer();
        // setIcon(s.serializeToString(Chat));
        console.log(icon)
        let uid = firebase.auth().currentUser.uid;
        firebase.firestore().collection('users')
        .doc(uid).get()
        .then((snapshot) => {
            if (snapshot.exists) {
                setName(snapshot.data())
                console.log("main screen name: "+ snapshot.data())
            }
            else {
                console.log('user does not exist')
            }
        })
        .then(async () => {
            await firebase.storage().ref().child('users/'+ uid).getDownloadURL().then(res => {
                // console.log(res);
                setImage(res)
                setLoaded(true);
            })
            // .then(setLoaded(true))
            .catch(error => console.log(error.message))

        })
        const please = GetUser();
        console.log("It works? " + please)
        // .then(setLoaded(true))
    }, [])

    return hasLoaded ?
        <SafeAreaView style={styles.container}>
            {/* <SvgFromUri width="50" height="50" fill={'#000'} uri={'https://www.svgrepo.com/download/25994/chat.svg'} /> */}
            {/* <Svg width={50} height={50} stroke={"#000"} source={require("../assets/icons/Chat.svg")} /> */}

            {/* <SvgFromXml xml={ChatIcon} /> */}
            {/* <SvgFromUri width={25} height={25} source={require('../assets/icons/Chat.svg')} /> */}
            <View style={{display: 'flex', flexDirection: 'row', justifyContent:'space-around'}}>
                <Text style={styles.welcomeBanner}>
                    Welcome {'\n'}Back, {name.firstName}
                </Text>
                <TouchableOpacity onPress={() => navigation.replace("Chat")} style={{justifyContent: 'center'}}>
                    <View style={styles.chatIconButton}><Chat width={25} height={25} fill={'#72777A'} /></View>
                    
                </TouchableOpacity>
                
                
                
            </View>
            {/* <SvgXml xml={ChatIcon} style={{borderColor: '#000'}} width={25} height={25} /> */}
            <Image
                source={{
                uri: image,
                }}
                style={{ width: 100, height: 100, borderWidth: 0 }}
                
            />
                    
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
    : <SafeAreaView style={{flex: 1}}><Text>Loading...</Text></SafeAreaView>
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
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
    chatIconButton: {
        justifyContent: 'center', 
        borderWidth: 1, 
        padding: 5, 
        borderRadius: 40,
        borderColor: '#E3E5E5'
    }
})