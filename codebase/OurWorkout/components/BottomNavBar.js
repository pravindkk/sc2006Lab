import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { SvgFromXml, SvgUri } from 'react-native-svg';


import HomeScreen from '../screens/HomeScreen'
import ProfileScreen from '../screens/ProfileScreen'
import SearchScreen from '../screens/SearchScreen';

import SearchIcon from '../assets/icons/Search.svg'
import ChatIcon from '../assets/icons/Chat.svg'
import ProfileIcon from '../assets/icons/Profile.svg'
import HomeIcon from '../assets/icons/Home.svg'

const Tab = createBottomTabNavigator()

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
        name="Chat" 
        component={SearchScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={[styles.navIconGroup, {backgroundColor: focused ? '#303437': '#fff'}]}>
              <ChatIcon width={25} height={25} fill={focused ? '#fff': '#303437'} />
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