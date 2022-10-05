import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, HeaderStyleInterpolators } from "@react-navigation/stack";
import React, { useState, useEffect } from 'react'
import { firebase } from './config'
import { StoreUser } from "./components/UserComponent";


import Login from './screens/LoginScreen'
import Register from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import Header from "./components/Header";
import BottomNavBar from "./components/BottomNavBar";
import ChatScreen from "./screens/ChatScreen";
import ProfileInfoScreen from "./screens/profileScreens/ProfileInfoScreen";

const Stack = createStackNavigator();

/**
 * In this file, set up our app.
 * updateLocalStorage takes our current user's ID and fetches data for our local storage.
 */

 const updateLocalStorage_User = async (uid) => {
  await firebase.firestore().collection('users').doc(uid).get()
  .then(async (snapshot) => {
    if (snapshot.exists) {
      
      loggedInUser = snapshot.data()
      loggedInUser['uid'] = uid;
      await firebase.storage().ref().child('users/' + uid).getDownloadURL().then((res) => {
        loggedInUser['photo'] = res
      })
      
      StoreUser(loggedInUser)
      console.log("Login :" + loggedInUser.photo)
    }
    else {
      console.log("Error! App cannot find user.")
    }
  });
};

const App = () => {
  const [initalizing, setInitializing] = useState(true);
  const [user, setUser] = useState('');
  const [userData, setUserData] = useState('');

  const updateLocalStorage = async (uid) => {
    //await updateLocalStorage_User(uid); 
  }

  const onAuthStateChanged = async (user) => {
    if (user) {
      setTimeout(async () => await updateLocalStorage(user.uid), 100);
      alert("Logging in!")
      await updateLocalStorage_User();
    }
    setUser(user);
    if (initalizing) setInitializing(false);
  }

  const [isSubscriber, setIsSubscriber] = useState(false);
  // Here be dragons!
  useEffect(() => {
    const getLoggedInUser = async () => {
      if (!isSubscriber)
      {
        const unsubscribe = await firebase.auth().onAuthStateChanged(onAuthStateChanged);
        setIsSubscriber(true);
      }
      console.log(unsubscribe)
      return unsubscribe;
      // console.log(user);
    }
    getLoggedInUser().catch(_ => {
      setIsSubscriber(false);
      unsubscribe();
      console.error(_);
    });
  }, []);

  if (initalizing) return null;

  if (!user) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
        
      </Stack.Navigator>
    )
  }

  return (
    <Stack.Navigator initialRouteName="BottomNavBar">
      <Stack.Screen
        name="BottomNavBar"
        component={BottomNavBar}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfileInfo"
        component={ProfileInfoScreen}
        options={{ headerShown: false }}
      />
      {/* // <BottomNavBar /> */}
    </Stack.Navigator>
  )
}

export default () => {
  return(
    <NavigationContainer>
      <App />
    </NavigationContainer>
  )
}