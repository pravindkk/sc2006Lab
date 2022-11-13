import { Pressable, StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import { Avatar, ListItem } from 'react-native-elements';
import React from 'react'
import moment from 'moment';

/**
 * Displays a single message in the GymDiscussionScreen,
 * as opposed to in the SingleChat UI component.
 * 
 * Assumption: The user viewing this UI component has been logged in,
 * and is allowed to view this message.
 * @param { Object } item - Some data regarding the message.
 * @param { string } item.img - URI of any image that was sent in the message.
 * @param { string } item.message - The text of the message body.
 * @param { string } item.sendTime - The time the message was sent.
 * @param { Object } item.user - Some data regarding the user sending the message.
 * @param { string } item.user.firstName - The first name of the corresponding User.
 * @param { string } item.user.lastName - The last name of the corresponding User.
 * @param { string } item.user.photoURL - The URL of the profile image of the corresponding User.
 * @returns { TouchableOpacity } The UI section displayed by React for this DiscussionCard.
 * @returns { JSX.Element } The UI section displayed by React for this gym discussion page message.
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