import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, HeaderStyleInterpolators } from "@react-navigation/stack";
import React, { useState, useEffect } from 'react'
import { firebase } from './config'
import { StoreUser, GetUser } from "./components/UserComponent";
import { useGlobalState } from "./components/GlobalState";


import Login from './screens/LoginScreen'
import Register from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import Header from "./components/Header";
import BottomNavBar from "./components/BottomNavBar";
import ProfileInfoScreen from "./screens/profile/ProfileInfoScreen";
import ChatScreen from "./screens/chat/ChatScreen";
import AllUserScreen from "./screens/chat/AllUserScreen";
import SingleChat from "./screens/chat/SingleChat";


const Stack = createStackNavigator();

const App = () => {
  const [initalizing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [userData, setUserData] = useState('');
  const [loggedIn, setLoggedIn] = useGlobalState('loggedIn')

  const onAuthStateChanged = async (user) => {
    // if (user.emailVerified) console.log("user is verified");
    // else console.log('user is not verified');

    if (user) {
      setTimeout(async () => {
        await updateLocalStorage(user.uid).then(() => {
          setUser(user);
        });
        
      }, 2000);
      
    }

    if (initalizing) setInitializing(false);

  }

  const updateLocalStorage = async (uid) => {
    await firebase.firestore().collection('users').doc(uid).get()
    .then(async (snapshot) => {
      if (snapshot.exists) {
        
        loggedInUser = snapshot.data()
        loggedInUser['uid'] = uid;
        
        StoreUser(loggedInUser)
        console.log("login :" + loggedInUser.photo)
      }
      else {
        console.log("error app cannot find user")
      }
    })
    
    
  }



  useEffect(() => {
    console.log(GetUser());
    // const getLoggedInUser = async () => {
      
    //   const subscriber = await firebase.auth().onAuthStateChanged(onAuthStateChanged);
    //   console.log(subscriber)
    //   return subscriber;
    //   // console.log(user);
    // }
    // getLoggedInUser().catch(console.error)

  }, []);


  // if (initalizing) return null;

  if (!loggedIn) {
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
      <Stack.Screen name="ChatScreen" component={ChatScreen} options={{headerShown: false}} />
      {/* <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{ headerShown: false }}
      /> */}
      <Stack.Screen
        name="AllUsers"
        component={AllUserScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SingleChat"
        component={SingleChat}
        options= {{ headerShown: false }}
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