import { StyleSheet, Text, View, TextInput, Image } from 'react-native'
import React, { useState, useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { firebase } from '../../config'
import moment from 'moment'
import MsgComponent from './MsgComponent';
import Icon  from 'react-native-vector-icons/Ionicons';
import { Avatar } from 'react-native-elements';

const SingleChat = (props) => {
    const {receiverData, senderData} = props.route.params;
    const { navigation } = props.navigation;

    console.log('received data: ', receiverData);

    const [msg, setMsg] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [allChat, setAllChat] = React.useState([]);

    useEffect(() => {
        const onChildAdd = 
            firebase.database().ref('/messages/' + receiverData.roomId)
                .on('child_added', snapshot => {
                    setAllChat((state) => [snapshot.val(), ...state]);
                })
        return () => firebase.database().ref('/messages/' + receiverData.roomId).off('child_added', onChildAdd);
        
    }, [receiverData.roomId])

    const msgvalid = txt => txt && txt.replace(/\s/g, '').length;

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
                <View style={{flex: 2,flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <Avatar source={{uri: receiverData.photoURL}} title={receiverData.firstName} rounded size="small" />
                        
                    <Text style={{fontSize: 20, paddingLeft: 10, marginRight: '10%'}}>{receiverData.firstName}</Text>
                </View>
            </View>
            <FlatList
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index}
                data={allChat}
                renderItem={renderItem}
                inverted
                style={{height: '90%'}}
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
                        color: '#000',
                    }}
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
        </SafeAreaView>
    )
}

export default SingleChat

const styles = StyleSheet.create({})