import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons'
import { FitnessImg } from '../../assets/icons/FitnessImg'
import LoadingIndicator from '../LoadingIndicator'
import { Image } from 'react-native-elements'
import AutoHeightImage from 'react-native-auto-height-image';

/**
 * @typedef ExerciseListItem Represents one individual Exercise to display.
 * @property { string } name The name of the Exercise
 * @property { string } description The description of the Exercise
 * @property { string } photoUrl The URL of the image to display for this Exercise.
 */

/**
 * Screen which displays one specific exercise.
 * 
 * Displays all information available regarding the exercise,
 * specifically name, description and image. Right now random image picked.
 * 
 * Assumption: The user viewing this UI component has been logged in.
 * @param { Object } props Navigation route params
 * @param { Object } props.route
 * @param { Object } props.route.params
 * @param { ExerciseListItem } props.route.params.exerciseInfo The representation of the Exercise to display.
 * @returns { SafeAreaView } The UI displayed by React for this ExerciseScreen.
 */
const ExerciseScreen = (props) => {
    const { exerciseInfo } = props.route.params;
    const [hasLoaded, setLoaded] = useState(false);
    const [randomImg, setRandomImg] = useState('')

    /**
     * Runs when the component is loaded
     */
    useEffect(() => {
        // const imgArray = require('../../assets/icons/FitnessImg')
        load().then(setLoaded(true));
        console.log(exerciseInfo.description);
        // setFitnessImg(FitnessImgArray[Math.floor(Math.random() * FitnessImgArray.length)])
    })

    /**
     * Gets the image for the exercise and formats the description for the exercise description
     */
    const load = async () => {
        const img = FitnessImg[Math.floor(Math.random() * FitnessImg.length)]
        setRandomImg(img);
        exerciseInfo.description = exerciseInfo.description.replace("<p>", "");
        exerciseInfo.description = exerciseInfo.description.replace("</p>", "");
    }
    
    return hasLoaded ?
        <SafeAreaView style={{padding: 30, backgroundColor: '#fff', height: '100%'}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', display: 'flex'}} >
                <TouchableOpacity onPress={() => props.navigation.goBack()} style={{flex: 1}} >
                    <Icon
                        name="arrow-back-circle-outline"
                        color="#72777A"
                        size={30}
                    />
                </TouchableOpacity>
                <View style={{flex: 2,  alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontSize: 25, fontWeight: 'bold', marginRight: '10%'}}>
                        {exerciseInfo.name}
                    </Text>
                </View>

                
            </View>
            <View style={{alignItems: 'center', marginTop: 30}}>
                <AutoHeightImage
                    width={300}
                    source={{uri: randomImg}}
                    style={{alignItems: 'center', justifyContent: 'center', borderRadius: 30}}
                />
                <Text style={{fontSize: 14, marginTop: 30, textAlign: 'justify'}}>
                    {exerciseInfo.description}
                </Text>
            </View>



        </SafeAreaView>
    : <LoadingIndicator />
}

export default ExerciseScreen

const styles = StyleSheet.create({})