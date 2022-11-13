import { StyleSheet, Text, View, Image, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity, TextInput, ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons'
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import SearchableDropdown from 'react-native-searchable-dropdown';
import { firebase } from '../../config'
import uuid from 'react-native-uuid'


const CreateWorkoutLog = (props) => {
    const { navigation } = props;
    const { user, exerciseList } = props.route.params
    const [workoutName, setWorkoutName] = useState('');
    const [dateTime, setDateTime] = useState(null);
    const [duration, setDuration] = useState(0);
    const [notes, setNotes] = useState('');
    const [calendar, setCalendar] = useState(false);
    const [workout, setWorkout] = useState();

    /**
     * Submit the workout log using firebase API
     * @returns 
     */
    const submitLog = async () => {
        if (workoutName == '' || dateTime==null || duration==0 || notes == '') {
            alert("Please enter all the details");
            return;
        }
        let msgData = {
            user,
            workoutName,
            dateTime,
            duration,
            notes,
        };

        const newReference = firebase.database().ref('/exerciseLog/' + user.uid).push();
        msgData.id = newReference.key;
        newReference.set(msgData).then(() => {
            setWorkoutName('');
            setDateTime(null);
            setDuration(0);
            setNotes('');
            alert('Workout Log has been added');
            navigation.goBack();
        })
    }



    return (
        <SafeAreaView style={{padding: 20, backgroundColor: '#fff', height: '100%'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon
                    name="arrow-back-circle-outline"
                    color="#72777A"
                    size={35}
                />
            </TouchableOpacity>
            <Text style={styles.title}>
                Create Log
            </Text>
            </View>
            <View style={{marginTop: 50}}>
            <KeyboardAvoidingView>
            <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Workout Name</Text>
                <SearchableDropdown
                    selectedItems={workout}
                    onTextChange={(text) => console.log(text)}
                    //On text change listner on the searchable input
                    onItemSelect={(item) => {
                        setWorkout(item)
                        setWorkoutName(item.name)
                    }}
                    //onItemSelect called after the selection from the dropdown
                    containerStyle={{ padding: 5 }}
                    
                    //suggestion container style
                    textInputStyle={{
                        //inserted text style
                        // padding: 12,
                        // borderWidth: 1,
                        // borderColor: '#ccc',
                        // backgroundColor: '#FAF7F6',
                    }}
                    itemStyle={{
                        //single dropdown item style
                        padding: 10,
                        marginTop: 5,
                        // backgroundColor: '#FAF9F8',
                        borderColor: '#bbb',
                        borderWidth: 0.2,
                    }}
                    itemTextStyle={{
                        //text style of a single dropdown item
                        color: '#222',
                    }}
                    itemsContainerStyle={{
                        //items container style you can pass maxHeight
                        //to restrict the items dropdown hieght
                        maxHeight: '90%',
                    }}
                    items={exerciseList}
                    
                    //mapping of item array
                    defaultIndex={2}
                    //default selected item index
                    placeholder="Enter your exercise"
                    //place holder for the search input
                    resetValue={false}
                    //reset textInput Value with true and false state
                    underlineColorAndroid="transparent"
                    //To remove the underline from the android input
                />
            </View>
            <ScrollView>
            
                
                <View style={styles.inputContainer}>
                    <Text style={styles.inputTitle}>Date & Time</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <TouchableOpacity onPress={() => setCalendar(!calendar)}>
                        <Text style={{color: dateTime ? '#000': '#bfc1c4'}}>{dateTime ? dateTime.toString(): 'Please enter the date...'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setCalendar(!calendar)}>
                        <Icon name="calendar-outline" color="#2B2F32" size={20} />
                    </TouchableOpacity>
                    </View>
                    {calendar ? 
                        <CalendarPicker onDateChange={e => {
                            setDateTime(moment(e.toString()).format('D/M/YY'));
                            setCalendar(false);
                        }} previousTitleStyle={{marginLeft: 10, padding: 10}} nextTitleStyle={{marginRight: 10, padding: 10}} />
                        : <></>
                    }
                    
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputTitle}>Duration (mins)</Text>
                    <TextInput
                        value={duration}
                        placeholder="Duration..."
                        onChangeText={text => setDuration(text)}
                        autoCorrect={false}
                        style={styles.input}
                        keyboardType="number-pad"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputTitle}>Notes</Text>
                    <TextInput
                        value={notes}
                        placeholder="Write your notes..."
                        onChangeText={text => setNotes(text)}
                        autoCorrect={false}
                        style={styles.input}
                    />
                </View>
                <TouchableOpacity
                    onPress={() => {submitLog();}}
                    style={[styles.button, { marginTop: 30 }]}
                >
                    <Text style={styles.buttonText}>Create Workout</Text>
                </TouchableOpacity>
            
            </ScrollView>
            </KeyboardAvoidingView>
            </View>
        </SafeAreaView>
    )
}

export default CreateWorkoutLog

const styles = StyleSheet.create({
    
    title: {
        color: '#2B2F32',
        fontWeight: 'bold',
        fontSize: 35,
        marginLeft: 10,
        // marginBottom: 40
    },
    inputContainer: {
        // width: '90%',
        backgroundColor: '#f4f6f9',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
        borderWidth: 1,
        borderColor: "#CFD3D4"
    },
    inputTitle: {
        color: "#5E6366",
        marginBottom: 5
    },
    button: {
        backgroundColor: "#303437",
        alignItems: 'center',
        padding: 15,
        borderRadius: 12,
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 20,
    
    },

})