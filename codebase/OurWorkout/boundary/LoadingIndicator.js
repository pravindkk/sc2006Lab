import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from 'react'
import { SafeAreaView } from "react-native-safe-area-context";

/**
 * displays a loading screen
 * @returns Loading Screen
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