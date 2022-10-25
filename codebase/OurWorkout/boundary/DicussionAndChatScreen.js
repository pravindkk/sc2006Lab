import { StyleSheet, Text, View } from 'react-native'
import { React, useEffect, useState } from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ChatScreen from './chat/ChatScreen';
import DiscussionScreen from './DiscussionScreen';

const Tab = createMaterialTopTabNavigator();

const DiscussionAndChatScreen = () => {
  return (
    <NavigationContainer  independent={true}>
      <Text>DiscussionAndChatScreen</Text>
      <Tab.Navigator>
        <Tab.Screen name="Chat" component={ChatScreen} />
        <Tab.Screen name="Discuss" component={DiscussionScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default DiscussionAndChatScreen

const styles = StyleSheet.create({})