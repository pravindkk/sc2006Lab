import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

const ChatScreen = ({navigation}) => {
    // const navigation = useNavigation();
  return (
    <SafeAreaView>
      
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>HoMe</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('AllUsers')}>
        <Text>all users</Text>
      </TouchableOpacity>
      <Text>This is the Chat Screen</Text>
      {/* <TouchableOpacity onPress={navigation.goBack()}>
        <Text>Home</Text>
      </TouchableOpacity> */}
      {/* <TouchableOpacity onPress={navigation.navigate('AllUsers')}>
        <Text>Home</Text>
      </TouchableOpacity> */}
    </SafeAreaView>
  )
}

export default ChatScreen

const styles = StyleSheet.create({})