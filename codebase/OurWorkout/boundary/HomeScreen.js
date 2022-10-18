import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { getAuth, signOut } from "firebase/auth";
import { useNavigation } from '@react-navigation/native'
import { firebase } from '../config'
import * as Location from 'expo-location';
import * as geofirestore from 'geofirestore';
// import firebasing from 'firebase'


import Icon from 'react-native-vector-icons/Ionicons'
import { GetUser } from '../controller/UserComponent';
import LoadingIndicator from './LoadingIndicator';
import ExercisePreview from './excercise/ExercisePreview'
import GymPreview from './gym/GymPreview';

const HomeScreen = () => {
    const navigation = useNavigation();
    const [user, setUser] = useState('');
    const [hasLoaded, setLoaded] = useState(false);
    const [exerciseList, setExerciseList] = useState([]);
    const [gymList, setGymList] = useState([]);
    const [location, setLocation] = useState(null);

    useEffect(() => {
        
        const startup = async () => {
            await getLoggedInUser();
            await getExercise();
            await getNearByGyms();
        }
        setTimeout(() => {
            startup().then(setLoaded(true));
            
        }, 2000);

        
    }, [])
    const getNearByGyms = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
        //   setErrorMsg('Permission to access location was denied');
            alert('Permission to access location was denied');
            return;
        }
  
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        const firestore = firebase.firestore();
        const gymsId = []
        // Create a GeoFirestore reference
        const GeoFirestore = geofirestore.initializeApp(firestore);
        const geocollection = GeoFirestore.collection('gyms');
        const query = geocollection.near({ center: new firebase.firestore.GeoPoint(location.coords.latitude, location.coords.longitude), radius: 10, limit: 10 });
        query.get().then(async (value) => {
            // All GeoDocument returned by GeoQuery, like the GeoDocument added above
            value.docs.forEach(item => {
                if (item.exists) gymsId.push(item.id);
            })
            // console.log(gymsId);
            // const snapshot = await firebase.firestore().collection('users').where("id", "in", ["ed6c3224-cd0b-43c2-8bec-a486e722e4d2", "797846b3-4e99-4aeb-83fb-1733649ed93d"]).get()
            const snapshot = await firebase
                            .firestore()
                                .collection('gyms')
                                .where(firebase.firestore.FieldPath.documentId(), 'in', gymsId)
                                .get();
            // firebase.firestore().collection('gyms').
            // snapshot.forEach((doc) => {
            //     // tempDoc.push({ id: doc.id, ...doc.data() })
            //     console.log(doc.data());
            //  })
            // snapshot.docs.forEach(item => {
            //     // console.log(item.data());
            //     setGymList([...gymList, item.data()]);
            // })
            // const tempDoc = []
            // snapshot.docs.forEach((doc) => {
            //    tempDoc.push(doc.data())
            // })
            snapshot.docs.map(doc => {
                setGymList( arr => [...arr, doc.data()]);
            })
            // console.log(tempDoc);
            // setGymList(tempDoc)
            // console.log(snapshot.docs[2].data());
            console.log(gymList);
            // console.log(snapshot);
            // value.docs.forEach
        });

    }


    const getExercise = async () => {
        await firebase.database().ref('/exercise/').on('value' , snapshot => {
            // console.log(snapshot.val());
            if (snapshot.val() != null) {
                const list = Object.values(snapshot.val());
                let value = Math.floor(Math.random()*(list.length -10))
                setExerciseList(list.splice(value, value + 2))
                // console.log(exerciseList);
                // setLoaded(true);
            }
        })
    }

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

    return hasLoaded ?
        <SafeAreaView style={styles.container}>
            <View style={{padding: 30}}>
                <View style={{display: 'flex', flexDirection: 'row', justifyContent:'space-between', paddingTop: 0}}>
                    <Text style={styles.welcomeBanner}>
                        Welcome {'\n'}Back, {user.firstName}
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate("ChatScreen")} style={{justifyContent: 'center'}}>
                        <View style={styles.chatIconButton}>
                            <Icon
                                name="chatbubbles-outline"
                                color="#72777A"
                                size={25}
                            />
                        </View>
                        {/* <View style={styles.chatIconButton}><Chat width={25} height={25} fill={'#72777A'} /></View> */}
                        
                    </TouchableOpacity>
                </View>
                <ExercisePreview exerciseList={exerciseList} />
                <GymPreview gymList={gymList} />
                
            </View>
        </SafeAreaView>
    : <LoadingIndicator />
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        backgroundColor: '#fff',
        
        
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