import { StyleSheet, Text, View } from 'react-native'
import { React, useEffect, useState } from 'react'

import { putTestDataInDb } from '../components/DataBoilerplate';

import { searchUsers, searchChats, searchGyms, searchWorkouts } from '../components/Search';
import SearchUsersScreen from './search/SearchUsersScreen';
import SearchGymsScreen from './search/SearchGymsScreen';
import SearchWorkoutsScreen from './search/SearchWorkoutsScreen';
import SearchChatsScreen from './search/SearchChatsScreen';

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