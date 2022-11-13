import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ListItem, Avatar } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'

/**
 * Displays list items in the list of Chats with other Users
 * 
 * @param { Object } item - The Chat to display  
 * @param { string } item.firstName - The first name of the other user the Chat is with.  
 * @param { string } item.lastName - The last name of the other user the Chat is with.
 * @param { string } item.lastMsg - The text of the last (latest) ChatMessage sent in the Chat.
 * @returns { JSX.Element } The UI to display for this list element
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