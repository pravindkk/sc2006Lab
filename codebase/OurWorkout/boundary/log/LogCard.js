import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'

/**
 * @typedef { Object } WorkoutLogItem An individual item in a User's Workout Log.
 * @property { string } workoutName The name of the corresponding Exercise.
 * @property { string } notes Notes entered by the User for this WorkoutLogItem.
 * @property { string } duration Intensity entered by the User for this WorkoutLogItem.
 */

/**
 * Displays the passed-in WorkoutLogItem

 * Assumption: The user viewing this component has already been logged in and has permission to view the workout log for which this LogCard is [one of] the LogCard(s) being displayed.
 * @param { WorkoutLogItem } item - WorkoutLogItem to display
 * @returns { View } The UI section displayed by React for this LogCard.
 */
const LogCard = ({ item }) => {
    return (
        <View style={{width: Dimensions.get("screen").width-60, justifyContent: 'center', alignSelf:'center', borderWidth: 0.3, borderRadius: 10, padding: 20, borderColor: '#e5f0fa', marginBottom: 30}}>
            <Text style={{fontWeight: 'bold', padding: 5}}>{item.workoutName}</Text>
            <Text style={{fontSize: 12, padding: 5, paddingBottom: 15, fontWeight: '300'}}>{item.dateTime}</Text>
            
            <View style={{backgroundColor: '#f7fafd', flexWrap:'wrap', padding: 20, borderRadius: 10}}>
                <Text style={{fontWeight: 'bold', paddingBottom: 10}}>Notes</Text>
                <Text >{item.notes}</Text>
            </View>
            <View style={{borderWidth: 1, borderRadius: 10, padding: 20, borderColor: '#e5f0fa', marginTop: 10}}>
                <Text style={{fontWeight: 'bold', marginBottom: 10}}>Intensity</Text>
                <Text>{item.duration} mins</Text>
            </View>
        </View>
    )
}

export default LogCard

const styles = StyleSheet.create({})