import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { getAuth, signOut } from "firebase/auth";
import { useNavigation } from '@react-navigation/native'

import Chat from '../assets/icons/Chat.svg'
import { GetUser } from '../components/UserComponent';

const HomeScreen = () => {
    const navigation = useNavigation()
    const [user, setUser] = useState('');
    const [hasLoaded, setLoaded] = useState(false)

    useEffect(() => {
        const getLoggedInUser = async () => {
      
            const loggedInUser = await GetUser();
            setUser(loggedInUser);
        }
    
        getLoggedInUser().then(setLoaded(true)).catch(console.error)
    }, [])

    return hasLoaded ?
        <SafeAreaView style={styles.container}>
            <View style={{display: 'flex', flexDirection: 'row', justifyContent:'space-between', padding: 30, paddingTop: 0}}>
                <Text style={styles.welcomeBanner}>
                    Welcome {'\n'}Back, {user.firstName}
                </Text>
                <TouchableOpacity onPress={() => navigation.replace("Chat")} style={{justifyContent: 'center'}}>
                    <View style={styles.chatIconButton}><Chat width={25} height={25} fill={'#72777A'} /></View>
                </TouchableOpacity>
            </View>

            <Image
                source={{
                uri: user.photo,
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