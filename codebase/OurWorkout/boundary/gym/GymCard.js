import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const GymCard = ({ item, user }) => {
    const navigation = useNavigation();

    const navigateToExerciseScreen = (item) => {
        navigation.navigate("GymScreen", {gymInfo: item, user: user});
    }

    return (
        <View 
            style={styles.exerciseContainer}
        >
        <Text style={{fontWeight: 'bold', fontSize: 14, flexWrap: 'wrap', width: 100}}>{item.name}</Text>
        <TouchableOpacity 
            style={{backgroundColor: '#fff', borderRadius: 30, width: 70, alignItems: 'center'}}
            onPress={() => {navigateToExerciseScreen(item);}}
        >
            <Text style={{fontWeight: 'bold', color: '#000', fontSize: 14, padding: 10}}>Open</Text>
        </TouchableOpacity>
        </View>
    )
}

export default GymCard

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
        backgroundColor: '#C8FCFF',
        // shadowColor: '#72777A',
        // shadowRadius: 5,
        // shadowOpacity: 0.3,
    },
})