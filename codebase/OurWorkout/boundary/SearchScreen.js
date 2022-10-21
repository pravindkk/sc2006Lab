import { StyleSheet, Text, View } from 'react-native'
import { React, useEffect, useState } from 'react'

import { putTestDataInDb } from '../controller/DataBoilerplate';

import { searchUsers, searchChats, searchGyms, searchWorkouts } from '../controller/Search';
import SearchUsersScreen from '../screens/search/SearchUsersScreen';
import SearchGymsScreen from '../screens/search/SearchGymsScreen';
import SearchWorkoutsScreen from '../screens/search/SearchWorkoutsScreen';
import SearchChatsScreen from '../screens/search/SearchChatsScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const SearchScreen = () => {
  if (SearchUsersScreen == undefined) alert("undefined!");

  return (
    <NavigationContainer  independent={true}>
      <Text>SearchScreen</Text>
      <Tab.Navigator>
        <Tab.Screen name="Users" component={SearchUsersScreen} />
        <Tab.Screen name="Gyms" component={SearchGymsScreen} />
        <Tab.Screen name="Workouts" component={SearchWorkoutsScreen} />
        <Tab.Screen name="Chats" component={SearchChatsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default SearchScreen

const styles = StyleSheet.create({})