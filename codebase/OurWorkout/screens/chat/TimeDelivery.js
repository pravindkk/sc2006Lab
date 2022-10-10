import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import moment from 'moment';
import { Icon } from 'react-native-elements';

const TimeDelivery = (props) => {
    const { sender, item } = props;
    return (
        <View
            style={[styles.mainView, {justifyContent: 'flex-end'}]}
        >
            <Text style={{ fontSize: 7, color: sender? '#fff': '#000'}}>
                {moment(item.send_time).format('LLL')}
            </Text>
            <Icon
                name="checkmark-done-outline"
                type="Ionicons"
                style={{color: item.seen ? '#000' : '#fff' , fontSize: 15, marginLeft: 5}}
            />
        </View>
    )
}

export default TimeDelivery

const styles = StyleSheet.create({})