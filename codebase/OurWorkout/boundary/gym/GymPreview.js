import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlatList } from 'react-native-gesture-handler'

import GymCard from './GymCard'

const GymPreview = ({ gymList, user }) => {
    useEffect(() => {
        console.log("this is the gym list: ", gymList);
    },[])
    const renderItem = ({ item }) => (
        <GymCard item={item} user={user} />
    )
    return (
        <View>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>Gyms near you</Text>
            <FlatList
                horizontal={true}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.id}
                data={gymList}
                renderItem={renderItem}
                // style={{height: 200}}
                // contentContainerStyle={{alignSelf: 'center', flex: 1}}
                
            />
        </View>
    )
}

export default GymPreview

const styles = StyleSheet.create({})