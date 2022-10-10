import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import TimeDelivery from './TimeDelivery'

const MsgComponent = (props) => {
    const { sender, item, sendTime } = props
    return (
        <Pressable
            style={{ marginVertical: 0 }}
        >
            <View
                style={sender ? styles.right : styles.left}
            />
            <View
                style={[styles.masBox, {alignSelf: sender ? 'flex-end' : 'flex-start', backgroundColor: sender ? '#303437' : "#F2F4F5", flexDirection: 'row'}]}
            >
                <Text style={{ paddingLeft: 5, color: sender ? '#fff' : '#000',flex: 1, flexWrap: 'wrap'}}>
                    {item.message}
                </Text>
                {/* <TimeDelivery
                    sender={sender}
                    item={item}
                /> */}
            </View>
        </Pressable>
    )
}

export default MsgComponent

const styles = StyleSheet.create({
    masBox: {
        alignSelf: 'flex-end',
        marginHorizontal: 10,

        paddingHorizontal: 10,
        marginVertical: 5,
        padding: 10,
        borderRadius: 24,
        minWidth: 200,
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