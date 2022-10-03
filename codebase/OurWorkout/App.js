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

const Stack = createStackNavigator();

const App = () => {
  const [initalizing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [userData, setUserData] = useState('');

  const onAuthStateChanged = async (user) => {
    if (user) await updateLocalStorage(user.uid);
    setUser(user);
    if (initalizing) setInitializing(false);

  }

  const updateLocalStorage = async (uid) => {
    await firebase.firestore().collection('users').doc(uid).get()
    .then(async (snapshot) => {
      if (snapshot.exists) {
        
        loggedInUser = snapshot.data()
        await firebase.storage().ref().child('users/' + uid).getDownloadURL().then((res) => {
          loggedInUser['photo'] = res
        })
        
        StoreUser(loggedInUser)
        console.log("login :" + loggedInUser.photo)
      }
      else {
        console.log("error app cannot find user")
      }
    })
    
    
  }



  useEffect(() => {
    const getLoggedInUser = async () => {
      
      const subscriber = await firebase.auth().onAuthStateChanged(onAuthStateChanged);
      console.log(subscriber)
      return subscriber;
      // console.log(user);
    }
    getLoggedInUser().catch(console.error)

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
    <Stack.Navigator>
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