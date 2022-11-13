import { Pressable, StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import { Avatar, ListItem } from 'react-native-elements';
import React from 'react'
import moment from 'moment';

/**
 * displays the message in the discussion page
 * @param {*} props 
 * @returns 
 */
const GymDiscussionMsgComponent = (props) => {
    const {sender, item} = props;

    return  (
        <ListItem>
            <Avatar source={{uri: item.user.photoURL}} title={item.user.firstName} rounded size="small" />
            <ListItem.Content>
                <ListItem.Subtitle style={{fontSize: 10}}>{item.user.firstName}</ListItem.Subtitle>
                {item.msgType == 'picture' ? 
                <Image source={{uri: item.img}} style={{width: Dimensions.get('window').width/2+10, height: 120, resizeMode: 'stretch'}} /> 
                :
                <ListItem.Title right={true} style={{color: '#000', fontSize: 14}}>{item.message}</ListItem.Title>
                }
                <ListItem.Subtitle style={{fontSize: 10, marginTop: 5}}>{moment(item.sendTime).format('D/M h:mm a')}</ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )    
}

export default GymDiscussionMsgComponent

const styles = StyleSheet.create({
    masBox: {
        alignSelf: 'flex-end',
        marginHorizontal: 10,

        paddingHorizontal: 10,
        marginVertical: 5,
        padding: 10,
        borderRadius: 24,
        minWidth: 150,
        maxWidth: 400,

        // outerHeight: 30,
        // height: 30,
        // justifyContent: 'center'
    },
    left: {
        borderBottomColor: '#fff',
        left: 2,
        bottom: 10,
        transform: [{ rotate: '0deg' }]
    },
    right: {
        borderBottomColor: '#0ee',
        right: 2,
        // top:0,
        bottom: 5,
        transform: [{ rotate: '103deg' }]
    },
})