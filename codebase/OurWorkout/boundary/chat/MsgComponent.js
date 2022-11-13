import { StyleSheet, Text, View, Pressable, Dimensions } from 'react-native'
import React from 'react'
import TimeDelivery from './TimeDelivery'
import { Avatar, ListItem } from 'react-native-elements'
import moment from 'moment'

/**
 * React component to display a single ChatMessage.
 * @param { Object } props The properties of the ChatMessage to be displayed. 
 * @param { boolean } props.sender Did the logged-in User send the ChatMessage? 
 * @param { Object } props.item The other contents of the ChatMessage. 
 * @param { string } props.item.firstName The first name of the User that sent the ChatMessage. 
 * @param { string } props.item.lastName The last name of the User that sent the ChatMessage. 
 * @param { string } props.item.sendTime The time the ChatMessage was sent. 
 * @param { string } props.item.message The textual contents of the ChatMessage. 
 * @returns { JSX.Element } The section of UI to be displayed by React for this component.
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