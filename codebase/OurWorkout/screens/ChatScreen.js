import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const ChatScreen = ({ navigation, route }) => {
  
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>HoMe</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ChatScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    }
})