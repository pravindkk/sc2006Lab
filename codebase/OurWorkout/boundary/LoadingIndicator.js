import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from 'react'
import { SafeAreaView } from "react-native-safe-area-context";

/**
 * Displayed while the app or part of the app is busy fetching data.
 * @returns { SafeAreaView } The section of UI React is to render in order to indicate busyness. 
 */
const LoadingIndicator = () => {
  return (
    <SafeAreaView style={styles.horizontal}>
      <ActivityIndicator size="large" color="#999999" />
    </SafeAreaView>
  )
}

export default LoadingIndicator

const styles = StyleSheet.create({
    horizontal: {
      flex: 1,
      justifyContent: 'center',
      flexDirection: "row",
      justifyContent: "space-around",
      padding: 10
    }
})