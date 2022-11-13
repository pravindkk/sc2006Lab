import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { SvgFromXml, SvgUri } from 'react-native-svg';
import Icon from 'react-native-vector-icons/MaterialIcons'


import HomeScreen from './HomeScreen'
import ProfileScreen from './profile/ProfileScreen'
import SearchScreen from './search/SearchScreen';

import SearchIcon from '../assets/icons/Search.svg'
import ChatIcon from '../assets/icons/Chat.svg'
import ProfileIcon from '../assets/icons/Profile.svg'
import HomeIcon from '../assets/icons/Home.svg'
import DiscussionScreen from './DiscussionScreen';
import { Tab } from 'react-native-elements/dist/tab/Tab';

const Tab = createBottomTabNavigator()

/**
 * Displays the bottom navigation bar by which logged-in users navigate between various screens.
 * 
 * Specifically, HomeScreen, SearchScreen, DiscussionScreen and ProfileScreen.
 * 
 * Assumption: The current user has been logged in.
 * @returns { Tab.Navigator } The tabbed navigator for React to display.
 */
const BottomNavBar = () => {
  
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: styles.nav
      }}
    >
      <Tab.Screen
        name="Home" 
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={[styles.navIconGroup, {backgroundColor: focused ? '#303437': '#fff'}]}>
              <HomeIcon width={25} height={25} fill={focused ? '#fff' : '#fff'} />
              { focused && 
                <Text
                  style={{color: focused ? '#fff' : '#72777A', fontSize: 12}}
                >
                  Home
                </Text>
              }
            </View>
          )
        }}
      />

      <Tab.Screen
        name="Search" 
        component={SearchScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={[styles.navIconGroup, {backgroundColor: focused ? '#303437': '#fff'}]}>
              <SearchIcon width={25} height={25} fill={focused ? '#fff': '#303437'} />
              { focused && 
                <Text
                  style={{color: focused ? '#fff' : '#72777A', fontSize: 12}}
                >
                  Search
                </Text>
              }
            </View>
          )
        }}
      />

      <Tab.Screen
        name="Discussion" 
        component={DiscussionScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={[styles.navIconGroup, {backgroundColor: focused ? '#303437': '#fff'}]}>
              <Icon name='fitness-center' color={focused ? '#fff' : '#303437'} size={25} />
              {/* <ChatIcon width={25} height={25} fill={focused ? '#fff': '#303437'} /> */}
              { focused && 
                <Text
                  style={{color: focused ? '#fff' : '#72777A', fontSize: 12}}
                >
                  Discuss
                </Text>
              }
            </View>
          )
        }}
      />


      <Tab.Screen
        name="Profile" 
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={[styles.navIconGroup, {backgroundColor: focused ? '#303437': '#fff'}]}>
              <ProfileIcon width={25} height={25} fill={focused ? '#fff': '#303437'} />
              { focused && 
                <Text
                  style={{color: focused ? '#fff' : '#72777A', fontSize: 12}}
                >
                  Profile
                </Text>
              }
            </View>
          )
        }}
      />
    </Tab.Navigator>
  )
}

export default BottomNavBar

const styles = StyleSheet.create({
  nav: {
    position: 'absolute',
    // padding: 20,
    bottom: 30,
    left: 15,
    right: 15,
    elevation: 0,
    backgroundColor: '#fff',
    height: 60,
    borderRadius: 24,
    shadowRadius: 20,
    shadowOpacity: 0.3,
    shadowColor: '#72777A'
    
  },
  navIconGroup: {
    alignItems: 'center', 
    justifyContent: 'center', 
    top: 15,
    width: 80,
    height: 50,
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent:'space-evenly',
    padding: 5,
  }
})