import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons'
import { TouchableOpacity } from 'react-native-gesture-handler';
import MapView from 'react-native-maps';

const GymScreen = (props) => {
    const { gymInfo } = props.route.params;
    useEffect(() => {
        console.log(gymInfo.coordinates);
    },[])

    return(
        <SafeAreaView style={styles.container}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', display: 'flex'}} >
                <TouchableOpacity onPress={() => props.navigation.goBack()} style={{flex: 1}} >
                    <Icon
                        name="arrow-back-circle-outline"
                        color="#72777A"
                        size={30}
                    />
                </TouchableOpacity>
                <View style={{flex: 2,  alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontSize: 25, fontWeight: 'bold', marginRight: '10%'}}>
                        {gymInfo.name}
                    </Text>
                </View>
            </View>
            <View>
                <Text>Address</Text>
                <Text>{gymInfo.blockNumber} {gymInfo.streetName} {gymInfo.floorNumber}</Text>
                {gymInfo.desc!="" ? 
                    <View>
                        <Text>Description</Text>
                        <Text>{gymInfo.desc}</Text>
                    </View>
                :<></>}
            </View>
            <MapView style={styles.map}
                initialRegion={{
                    latitude: gymInfo.coordinates.latitude,
                    longitude: gymInfo.coordinates.longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                }}
                >
                <MapView.Marker
                    coordinate={{latitude: gymInfo.coordinates.latitude,
                    longitude: gymInfo.coordinates.longitude}}
                    title={gymInfo.name}
                    description={gymInfo.desc}
                />
            </MapView>
        </SafeAreaView>
    )
}

export default GymScreen

const styles = StyleSheet.create({
    container: {
        padding: 30, 
        backgroundColor: '#fff',
        height: '100%',
    },
    map: {
        width: Dimensions.get('window').width-60,
        height: 200,
        borderRadius: 30,
    }
})