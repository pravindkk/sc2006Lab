import { StyleSheet, Text, View, Pressable, Dimensions } from 'react-native'
import React from 'react'
import TimeDelivery from './TimeDelivery'
import { Avatar, ListItem } from 'react-native-elements'
import moment from 'moment'

/**
 * Displays the different chats in the chat
 * @param {*} props 
 * @returns 
 */
const MsgComponent = (props) => {
    const { sender, item } = props
    return (
        <ListItem style={{width: '50%', marginLeft: sender ? Dimensions.get('window').width/2 : 0}}>
            
            <ListItem.Content 
                style={{backgroundColor: sender ? '#303437' : '#f2f2f2', padding: 20, paddingTop:5, borderRadius: 30}}
            >
                <ListItem.Subtitle style={{fontSize: 10, color: sender ? '#fff': '#000'}}>{item.firstName}</ListItem.Subtitle>
                <ListItem.Title right={true} style={{color: sender ? '#fff': '#000', fontSize: 14}}>{item.message}</ListItem.Title>
                <ListItem.Subtitle style={{fontSize: 10, marginTop: 5, color: sender ? '#fff': '#000'}}>{moment(item.sendTime).format('D/M h:mm a')}</ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}

export default MsgComponent

const styles = StyleSheet.create({})