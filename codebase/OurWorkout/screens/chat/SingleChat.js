import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useState, useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import { firebase } from '../../config'
import moment from 'moment'

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
        <Text>{item.message}</Text>
        
      );

    return (
        <SafeAreaView>
            <Text>SingleChat</Text>
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
                <Text>Go Back</Text>
            </TouchableOpacity>
            <FlatList
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index}
                data={allChat}
                renderItem={renderItem}
                inverted
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
                        backgroundColor: '#fff',
                        width: '80%',
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
                        color="#000"
                        name='paper-plane-sharp'
                        type='ionicon'
                    />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default SingleChat

const styles = StyleSheet.create({})