import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

const GymDiscussionScreen = (props) => {
  const {gymInfo} = props.route.params;
  
  return (
    <SafeAreaView>
      <Text>Gym discussion screen</Text>
    </SafeAreaView>
  )
}

export default GymDiscussionScreen

const styles = StyleSheet.create({})