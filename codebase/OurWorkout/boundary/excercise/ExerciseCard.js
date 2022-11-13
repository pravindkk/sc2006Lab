import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { ListItem } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { WorkoutImg } from '../../assets/workoutIcons/WorkoutImg'

const backgroundColor = ['#f0f0ff', '#FFF9F0']

/**
 * @typedef ExerciseListItem Represents one individual Exercise to display.
 * @property { string } name The name of the Exercise
 * @property { string } description The description of the Exercise
 * @property { string } photoUrl The URL of the image to display for this Exercise.
 */

/**
 * Used to display one Exercise on the HomeScreen.
 * Navigates to the corresponding ExerciseScreen on tap.
 *  
 * Assumption: The user viewing this UI component has been logged in.
 * @param { ExerciseListItem } item Represents the Exercise to display.
 */
const ExerciseCard = ({ item }) => {
    const navigation = useNavigation();

    /**
     * navigates to the specific exercise screen
     * @param {*} item - Specific exercise item
     */
    const navigateToExerciseScreen = (item) => {
        navigation.navigate("ExerciseScreen", {exerciseInfo: item});
    }

    return (
        
        <View 
            style={[styles.exerciseContainer, {backgroundColor: '#f0f0ff'}]}
        >
            <View style={{flexDirection: 'column', justifyContent: 'space-between'}}>
                <Text style={{fontWeight: 'bold', fontSize: 14, flexWrap: 'wrap', width: 100}}>{item.name}</Text>
                
                <TouchableOpacity 
                    style={{backgroundColor: '#fff', borderRadius: 30, width: 70, alignItems: 'center'}}
                    onPress={() => {navigateToExerciseScreen(item);}}
                >
                    <Text style={{fontWeight: 'bold', color: '#000', fontSize: 14, padding: 10}}>Open</Text>
                </TouchableOpacity>
            </View>
        
            <Image style={{width: '60%', height: 150, alignSelf: 'center', resizeMode:'contain'}} source={WorkoutImg[Math.floor(Math.random() * WorkoutImg.length)].image}/>
        </View>
        
        
    )
}

export default ExerciseCard

const styles = StyleSheet.create({
    exerciseContainer: {
        // backgroundColor: backgroundColor[Math.floor(Math.random()*backgroundColor.length)], 
        padding: 20, 
        borderRadius: 30, 
        flexDirection: 'row', 
        marginTop: 20, 
        width: 270,
        marginRight: 20,
        height: 200,
        alignSelf: 'center',
        justifyContent: 'space-between',
    },
})