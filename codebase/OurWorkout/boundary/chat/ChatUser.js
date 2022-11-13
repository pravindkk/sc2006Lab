import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ListItem, Avatar } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'

/**
 * Displays one of the created chats passed as an object from a List
 * 
 * @param { item } item - Object containing info (First Name, Last Name, Latest Message) for one of the created chats for the user. 
 * @returns { ListItem } The UI to display one of the created chats for the user
 */
const ChatUser = ({ item }) => {
    const navigation = useNavigation();
    return (
        <ListItem style={{marginTop: 10}} onPress={() => {navigation.navigate('SingleChat', {receiverData: item, senderData: loggedInUser})}}>
            <Avatar source={{uri: item.photoURL}} title={item.firstName} rounded size="medium" />
            <ListItem.Content>
            <ListItem.Title style={{fontSize: 20}}>{item.firstName} {item.lastName}</ListItem.Title>
            <ListItem.Subtitle style={{fontSize: 12}} numberOfLines={1}>{item.lastMsg}</ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}

export default ChatUser

const styles = StyleSheet.create({})