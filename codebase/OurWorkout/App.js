import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, HeaderStyleInterpolators } from "@react-navigation/stack";
import React, { useState, useEffect } from 'react'
import { firebase } from './config'

import Login from './screens/LoginScreen'
import Register from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import Header from "./components/Header";
import BottomNavBar from "./components/BottomNavBar";

const Stack = createStackNavigator();

const App = () => {
  const [initalizing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initalizing) setInitializing(false);

  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
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
    <Stack.Screen
      name="BottomNavBar"
      component={BottomNavBar}
      options={{ headerShown: false }}
    />
    // <BottomNavBar />
  )
}

export default () => {
  return(
    <NavigationContainer>
      <App />
    </NavigationContainer>
  )
}