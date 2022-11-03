import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlatList } from 'react-native-gesture-handler'

import GymCard from './GymCard'

const GymPreview = ({ gymList, user }) => {
    const renderItem = ({ item }) => (
        <GymCard item={item} user={user} />
    )
    return (
        <View>
            
            <FlatList
                horizontal={true}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.id}
                data={gymList}
                renderItem={renderItem}
                initialNumToRender={10}
                maxToRenderPerBatch={10}
                windowSize={Dimensions.get('window').width*2}
                // style={{height: 200}}
                // contentContainerStyle={{alignSelf: 'center', flex: 1}}
                
            />
        </View>
    )
}

export default GymPreview

const styles = StyleSheet.create({})