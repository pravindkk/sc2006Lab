import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { getAuth, signOut } from "firebase/auth";
import { useNavigation } from '@react-navigation/native'
import { firebase } from '../config'

import Chat from '../assets/icons/Chat.svg'
import { GetUser } from '../components/UserComponent';
import LoadingIndicator from '../components/LoadingIndicator';
import ExercisePreview from './excercise/ExercisePreview'

const HomeScreen = () => {
    const navigation = useNavigation()
    const [user, setUser] = useState('');
    const [hasLoaded, setLoaded] = useState(false)
    const [exerciseList, setExerciseList] = useState([])

    useEffect(() => {
        const getLoggedInUser = async () => {
      
            const loggedInUser = await GetUser();
            console.log(loggedInUser);
            if (loggedInUser == ''){
                
                setLoaded(false);
            }
            else {
                setUser(loggedInUser);

            }
            
        }
        setTimeout(() => {
            getLoggedInUser().then(getExercise);
            
        }, 2000);
        
    }, [])
    const getExercise = async () => {
        await firebase.database().ref('/exercise/').on('value' , snapshot => {
            // console.log(snapshot.val());
            if (snapshot.val() != null) {
                const list = Object.values(snapshot.val());
                let value = Math.floor(Math.random()*(list.length -10))
                setExerciseList(list.splice(value, value + 2))
                // console.log(exerciseList);
                setLoaded(true);
            }
        })
    }

    return hasLoaded ?
        <SafeAreaView style={styles.container}>
            <View style={{display: 'flex', flexDirection: 'row', justifyContent:'space-between', padding: 30, paddingTop: 0}}>
                <Text style={styles.welcomeBanner}>
                    Welcome {'\n'}Back, {user.firstName}
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate("ChatScreen")} style={{justifyContent: 'center'}}>
                    <View style={styles.chatIconButton}><Chat width={25} height={25} fill={'#72777A'} /></View>
                </TouchableOpacity>
            </View>
            <Text> This is the Home Screen</Text>
            <ExercisePreview exerciseList={exerciseList} />
        </SafeAreaView>
    : <LoadingIndicator />
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        backgroundColor: '#fff',
        // marginTop: 100,
        
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