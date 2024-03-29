import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, Platform } from 'react-native'
import React, { useState, useEffect } from 'react'
import { getAuth, signOut } from "firebase/auth";
import { useNavigation } from '@react-navigation/native'
import { firebase } from '../config'
import * as Location from 'expo-location';
import * as geofirestore from 'geofirestore';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
// import firebasing from 'firebase'


import Icon from 'react-native-vector-icons/Ionicons'
import { GetUser } from '../controller/UserComponent';
import LoadingIndicator from './LoadingIndicator';
import ExercisePreview from './excercise/ExercisePreview'
import GymPreview from './gym/GymPreview';

/**
 * The HomeScreen, where the User is navigated to upon exiting the LoginScreen or the RegistrationScreen.
 * 
 * Provides functionality for viewing a list of Exercises.
 * 
 * Provides functionality for tapping on Exercises in the list in order to navigate to the corresponding ExerciseScreen.
 * 
 * Provides functionality for viewing a list of those Gyms the logged-in User has liked.
 * 
 * Provides functionality for tapping on Gyms in the list in order to navigate to the corresponding GymScreen.
 * 
 * Provides functionality for navigation to the WorkoutLog and ChatScreen of the logged-in User.
 * @returns { SafeAreaView } The UI rendered by React in order to display this screen.  
 */
const HomeScreen = () => {
    const navigation = useNavigation();
    const [user, setUser] = useState('');
    const [hasLoaded, setLoaded] = useState(false);
    const [exerciseList, setExerciseList] = useState([]);
    const [allExerciseList, setAllExerciseList] = useState([]);
    const [gymList, setGymList] = useState([]);
    const [location, setLocation] = useState(null);
    const [hasGymLoaded, setGymLoaded] = useState(false);
    const [hasExerciseLoaded, setExerciseLoaded] = useState(false);

    /**
     * Runs when the component is loaded
     */
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

    /**
     * gets the nearby gyms near the user's current location
     */
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
        var gymsId = []
        // Create a GeoFirestore reference
        const GeoFirestore = geofirestore.initializeApp(firestore);
        const geocollection = GeoFirestore.collection('gyms');
        console.log("This is the coords: ", location.coords.latitude, location.coords.longitude);
        const query = geocollection.near({ center: new firebase.firestore.GeoPoint(location.coords.latitude, location.coords.longitude), radius: 10, limit: 8 });
        query.get().then(async (value) => {
            // All GeoDocument returned by GeoQuery, like the GeoDocument added above
            value.docs.forEach(item => {
                if (item.exists) {
                    gymsId.push(item.id);
                    // console.log('this is the item.id: ', item.id);
                }
            })
            gymsId = gymsId.splice(0, 10)
            console.log(gymsId.length);
            // console.log(gymsId);
            // const snapshot = await firebase.firestore().collection('users').where("id", "in", ["ed6c3224-cd0b-43c2-8bec-a486e722e4d2", "797846b3-4e99-4aeb-83fb-1733649ed93d"]).get()
            try {
            const snapshot = await firebase
                            .firestore()
                                .collection('gyms')
                                .where("id", 'in', [...gymsId]).limit(10)
                                .get()
                                .catch(err => {
                                    console.log(err.message)
                                })
            console.log(snapshot.docs[0].data());
            snapshot.docs.map(doc => {
                setGymList( arr => [...arr, doc.data()]);
            })
            console.log(gymList);
            }
            catch(err) {
                setGymList([]);
            }
            setGymLoaded(true);
        });

    }

    /**
     * Gets a random list of exercises from the wger.de dataset
     */
    const getExercise = async () => {
        await firebase.database().ref('/exercise/').on('value' , snapshot => {
            if (snapshot.val() != null) {
                const list = Object.values(snapshot.val());
                setAllExerciseList(list);
                let value = Math.floor(Math.random()*(list.length -10))
                let exerciseArr = list.splice(value, value + 2)
                setExerciseList(exerciseArr.splice(0, 11 ))
                setExerciseLoaded(true);
            }
        })
    }

    /**
     * gets the current logged in user
     */
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
                    <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity onPress={() => navigation.navigate("WorkoutLog", { user: user, exerciseList: allExerciseList })} style={{justifyContent: 'center'}}>
                        <View style={[styles.chatIconButton,{marginRight: 15}]}>
                            <FontAwesome5Icon
                                name="dumbbell"
                                color="#72777A"
                                size={25}
                            />
                        </View>
                        
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("ChatScreen")} style={{justifyContent: 'center'}}>
                        <View style={styles.chatIconButton}>
                            <Icon
                                name="chatbubbles-outline"
                                color="#72777A"
                                size={25}
                            />
                        </View>
                        
                    </TouchableOpacity>
                    </View>
                    
                </View>
                <View style={{alignItems: 'center',flexDirection: 'row', justifyContent: 'space-between', marginTop: 20}}>
                    <Text style={{fontWeight: 'bold', fontSize: 20}}>Exercises</Text>
                    <TouchableOpacity onPress={() => getExercise()}>
                    <Icon
                    name='reload-circle-outline'
                    color='#72777A'
                    size={25}
                    />
                    </TouchableOpacity>
                </View>
                {hasExerciseLoaded ? 
                    <ExercisePreview exerciseList={exerciseList} />:
                    <LoadingIndicator />
                }
                
                <View style={{alignItems: 'center',flexDirection: 'row', justifyContent: 'space-between', marginTop: 20}}>
                    <Text style={{fontWeight: 'bold', fontSize: 20}}>Gyms near you</Text>
                    <TouchableOpacity onPress={() => getNearByGyms()}>
                    <Icon
                    name='reload-circle-outline'
                    color='#72777A'
                    size={25}
                    />
                    </TouchableOpacity>
                </View>
                {hasGymLoaded ?
                gymList.length != 0 ? 
                    <GymPreview gymList={gymList} user={user} /> :
                    <Text style={{marginTop: 30}}>There are no gyms near you!</Text>
                :   <LoadingIndicator />
                }
                
                
            </View>
        </SafeAreaView>
    : <LoadingIndicator />
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // padding:
        marginTop: Platform.OS == 'ios' ? 0: 10,
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