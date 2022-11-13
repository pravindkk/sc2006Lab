import { StyleSheet, Text, View, Dimensions, Image } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { GymImg } from '../../assets/icons/GymImg'
import { useNavigation } from '@react-navigation/native'

/**
 * displays the different gym discussion cards
 * @param {*} item - Render List item 
 * @returns 
 */
const DiscussionCard = ({ item, user}) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity style={{marginBottom: 20}} onPress={() => {navigation.navigate("GymDiscussionScreen", {gymInfo: item, user: user})}}>
            <View style={{alignItems: 'center', borderColor: '#e5f0fa', borderWidth: 1, borderRadius: 20}}>
                <Image
                    source={{uri: GymImg[Math.floor(Math.random() * GymImg.length)]}}
                    style={{width: '100%', height: 200, resizeMode: 'cover', borderRadius: 20 }} 
                />
                <View style={{alignSelf: 'flex-start', padding: 20}}>
                    <Text style={{fontWeight: 'bold', textAlign:'left', fontSize: 15}}>{item.name}</Text>
                    <Text style={{textAlign:'left', marginTop: 10, fontSize: 13}}>{item.desc}</Text>
                </View>
                
                {/* <Image source={{uri: GymImg[Math.floor(Math.random() * GymImg.length)]}} style={{width: 400, borderRadius: 20, borderWidth: 1, height: 170, resizeMode: 'stretch'}} /> */}
                {/* <Text>{item.name}</Text> */}
            </View>
        </TouchableOpacity>
    )
}

export default DiscussionCard

const styles = StyleSheet.create({})