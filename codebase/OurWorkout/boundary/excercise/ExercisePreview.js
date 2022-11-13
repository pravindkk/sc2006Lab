import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { firebase } from '../../config'
import { FlatList } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import ExerciseCard from './ExerciseCard'
import {TouchableOpacity} from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list'


/**
 * @typedef ExerciseListItem Represents one individual Exercise to display.
 * @property { string } name The name of the Exercise
 * @property { string } description The description of the Exercise
 * @property { string } photoUrl The URL of the image to display for this Exercise.
 */

/**
 * Used to display a list of ExerciseCard on the HomeScreen.
 * Scrollable horizontally.
 *  
 * Assumption: The user viewing this UI component has been logged in.
 * @param { Array<ExerciseListItem> } item The Exercise to display.
 * @returns { View } The UI section displayed by React for this Exercise.
 */

const ExercisePreview = ({ exerciseList }) => {
    // const [exerciseList, setExerciseList] = useState([])
    const navigation = useNavigation();

    /**
     * displays the specific exercise card
     * @param {*} item - Render List Item 
     * @returns 
     */
    const renderItem = ({ item }) => {
        return (
            <ExerciseCard item={item} />
        )
        
    }

    const keyExtractor = (item) => item.uuid.toString();

    return (
        <View>
            
            <FlatList
                horizontal={true}
                data={exerciseList}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                initialNumToRender={10}
                maxToRenderPerBatch={10}
                windowSize={Dimensions.get('window').width*2}
            />
            {/* <FlatList
                showsVerticalScrollIndicator={false}
                numColumns={4}
                keyExtractor={item => item.uuid}
                data={exerciseList}
                renderItem={renderItem}
                style={{height: '100%', paddingTop: 30}}
                
            /> */}
        </View>
    )
}

export default ExercisePreview

const styles = StyleSheet.create({
    exerciseContainer: {
        // backgroundColor: backgroundColor[Math.floor(Math.random()*backgroundColor.length)], 
        padding: 20, 
        borderRadius: 30, 
        flexDirection: 'column', 
        marginTop: 20, 
        width: 200,
        marginLeft: 20,
        height: 150,
        alignSelf: 'center',
        justifyContent: 'space-between',
    },
})