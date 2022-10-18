import { StyleSheet, Text, View } from 'react-native'
import { React, useEffect, useState } from 'react'

import { putTestDataInDb } from '../components/DataBoilerplate';

import { searchUsers, searchChats, searchGyms, searchWorkouts } from '../components/Search';
import SearchUsersScreen from './search/SearchUsersScreen';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const SearchScreen = () => {
  if (SearchUsersScreen == undefined) alert("undefined!");

  return (
    <View>
      <Text>SearchScreen</Text>
      <Tab.Navigator>
        <Tab.Screen name="SearchUsersScreen" component={SearchUsersScreen} />
      </Tab.Navigator>
    </View>
  )
}

export default SearchScreen

const styles = StyleSheet.create({})