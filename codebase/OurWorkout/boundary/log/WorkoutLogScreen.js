import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { firebase } from '../../config'
import { FlatList } from 'react-native-gesture-handler';
import LogCard from './LogCard';

const WorkoutLogScreen = (props) => {
    const { navigation } = props;
    const { user, exerciseList } = props.route.params;
    const [logList, setLogList] = useState([]);

    /**
     * Runs when the component first loaded
     */
    useEffect(() => {
        const onChildAdd = 
        firebase.database().ref('/exerciseLog/' + user.uid)
            .on('child_added', snapshot => {
                setLogList((state) => [snapshot.val(), ...state]);
                // console.log(allChat);
            })
        return () => firebase.database().ref('/exerciseLog/' + user.uid).off('child_added', onChildAdd);
    }, [])

    /**
     * displays the log passed from the LogList
     * @param {*} item - Render List item 
     * @returns 
     */
    const renderItem = ({item}) => (
        <LogCard item={item} />
    )

    return (
        <SafeAreaView style={{backgroundColor: "#fff", paddingTop: 30, height: '100%'}}>
            <View style={{flexDirection: 'row', alignItems:'center', justifyContent: 'space-between', paddingLeft: 10, paddingRight: 10, backgroundColor: '#fff'}}>
            
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon
                    name="arrow-back-circle-outline"
                    color="#72777A"
                    size={35}
                />
            </TouchableOpacity>
            <Text style={{fontSize: 30, fontWeight: 'bold'}}>Workouts</Text>
            <TouchableOpacity onPress={() => navigation.navigate('CreateWorkoutLog', {user: user, exerciseList: exerciseList})}>
                <Icon
                name="add-circle-outline"
                color="#72777A"
                size={35}
                
                />
            </TouchableOpacity>
            </View>
            <FlatList
                horizontal={false}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.id}
                data={logList}
                renderItem={renderItem}
                style={{marginTop: 30, height: '100%'}}
                
                // contentContainerStyle={{alignSelf: 'center', flex: 1}}
                    
            />

        </SafeAreaView>
    )
}

export default WorkoutLogScreen

const styles = StyleSheet.create({})