import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GymCardIcon } from '../../assets/gymIcons/GymCardIcon'

const GymCard = ({ item, user }) => {
    const navigation = useNavigation();

    /**
     * navigates to corresponding GymScreen
     * @param {*} item 
     */
    const navigateToExerciseScreen = (item) => {
        navigation.navigate("GymScreen", {gymInfo: item, user: user});
    }

    return (
        <View 
            style={styles.exerciseContainer}
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
            <Image style={{width: '60%', height: 150, alignSelf: 'center', resizeMode:'contain'}} source={GymCardIcon[Math.floor(Math.random() * GymCardIcon.length)].image}/>
        </View>
    )
}

export default GymCard

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
        backgroundColor: '#C8FCFF',
        // shadowColor: '#72777A',
        // shadowRadius: 5,
        // shadowOpacity: 0.3,
    },
})