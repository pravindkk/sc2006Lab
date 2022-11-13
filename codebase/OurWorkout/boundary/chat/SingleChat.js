import { StyleSheet, Text, View, TextInput, Image, Platform, KeyboardAvoidingView } from 'react-native'
import React, { useState, useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { firebase } from '../../config'
import moment from 'moment'
import MsgComponent from './MsgComponent';
import Icon  from 'react-native-vector-icons/Ionicons';
import { Avatar } from 'react-native-elements';

/**
 * React component to display a single Chat.
 * 
 * Assumption: That the "receiver" user is that who has been logged in.
 * @param { Object } props The route params used when navigating to this component.
 * @param { Object } props.route.params.receiverData The properties of the user viewing the chat.
 * @param { Object } props.route.params.receiverData.id The UUID the user viewing the chat.
 * @param { Object } props.route.params.receiverData.roomId The chatroom UUID corresponding to the view of the user observing the chat.
 * @param { Object } props.route.params.senderData The properties of the other user.
 * @param { Object } props.route.params.senderData.uid The UUID of the other user.
 * @returns { JSX.Element } The UI screen to be displayed by React for this component.
 */
const SingleChat = (props) => {
    
    const {receiverData, senderData} = props.route.params;
    // const { navigation } = props.navigation;

    console.log('received data: ', receiverData);

    const [msg, setMsg] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [allChat, setAllChat] = React.useState([]);
    const [keyboardFocused, setKeyboardFocused] = useState(false);

    // const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0
    /**
     * runs when the component is loaded
     */
    useEffect(() => {
        setAllChat([]);
        const onChildAdd = 
            firebase.database().ref('/messages/' + receiverData.roomId)
                .on('child_added', snapshot => {
                    setAllChat((state) => [snapshot.val(), ...state]);
                    // console.log("Hell there",allChat);
                })
        return () => firebase.database().ref('/messages/' + receiverData.roomId).off('child_added', onChildAdd);
        
    }, [receiverData.roomId])

    /**
     * Checks if the text is valid
     * @param {*} txt - Text message of the message
     * @returns true or false
     */
    const msgvalid = txt => txt && txt.replace(/\s/g, '').length;

    /**
     * To send message when send is clicked
     * @returns 
     */
    const sendMsg = () => {
        console.log(allChat);
        if (msg == '' || msgvalid(msg) == 0) {
            alert('Enter something');
            return false
        }
        setDisabled(true);
        let msgData = {
            roomId: receiverData.roomId,
            message: msg,
            from: senderData.uid,
            to: receiverData.id,
            sendTime: moment().format(''),
            msgType: 'text'
        };

        const newReference = firebase.database().ref('/messages/' + receiverData.roomId).push();
        msgData.id = newReference.key;
        newReference.set(msgData).then(() => {
            let chatListUpdate = {
                lastMsg: msg,
                sendTime: msgData.sendTime,
            };
            firebase.database().ref('/chatlist/' + receiverData?.id + '/' + senderData?.uid)
                .update(chatListUpdate)
                .then(() => console.log('Data updated'));
            console.log("'/chatlist/' + senderData?.id + '/' + data?.id",receiverData)
            firebase.database().ref('/chatlist/' + senderData?.uid + '/' + receiverData?.id)
                .update(chatListUpdate)
                .then(() => console.log('Data updated.'));
            setMsg('');
            setDisabled(false);
        })
    }

    /**
     * To display the item
     * @param {*} item - Render List item 
     * @returns 
     */
    const renderItem = ({ item }) => (
        <MsgComponent 
            sender={item.from == firebase.auth().currentUser.uid}
            item={item}
        />
        
        
      );

    return (
        <SafeAreaView style={{backgroundColor: '#fff'}}>
            <View style={{display: 'flex',flexDirection: 'row', alignItems: 'center', paddingLeft: 10, paddingRight: 10, justifyContent: 'center', height: 50}}>
                
                <TouchableOpacity style={{flex: 1, justifyContent: 'center', alignSelf: 'center'}} onPress={() => props.navigation.goBack()}>
                    <Icon
                        name="arrow-back-circle-outline"
                        color="#72777A"
                        size={40}
                    />
                </TouchableOpacity>
                <View style={{flex: 2 }}>
                    <TouchableOpacity onPress={() => props.navigation.navigate("UserPage", {user: receiverData})} style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}} >
                    <Avatar source={{uri: receiverData.photoURL}} title={receiverData.firstName} rounded size="small" />
                        
                    <Text style={{fontSize: 20, paddingLeft: 10, marginRight: '10%'}}>{receiverData.firstName}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={Platform.OS === 'ios' ? -200 : -240} >
            <FlatList
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index}
                data={allChat}
                renderItem={renderItem}
                inverted
                style={{height: keyboardFocused ? '90%': '90%'}}
                StickyHeaderComponent={(<Text>Hello</Text>)}
                
            />
            

            <View
                style={{
                    elevation: 5,
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 7,
                    justifyContent: 'space-evenly',
                }}
            >
                
                <TextInput
                    style={{
                        backgroundColor: '#F2F4F5',
                        width: '80%',
                        minHeight: 30,
                        maxHeight: 60,
                        borderRadius: 25,
                        borderWidth: 0.5,
                        borderColor: '#fff',
                        paddingHorizontal: 15,
                        paddingBottom: 0,
                        color: '#000',
                    }}
                    onFocus={() => {setKeyboardFocused(!keyboardFocused)}}
                    placeholder="Type a message"
                    placeholderTextColor='#000'
                    multiline={true}
                    value={msg}
                    onChangeText={val => setMsg(val)}
                />
                <TouchableOpacity disabled={disabled} onPress={() => {sendMsg();}}>
                    <Icon
                        name='paper-plane-sharp'
                        color="#72777A"
                        size={20}
                    />
                </TouchableOpacity>
            </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default SingleChat

const styles = StyleSheet.create({})