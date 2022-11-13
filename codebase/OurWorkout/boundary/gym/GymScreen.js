import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons'
import { TouchableOpacity } from 'react-native-gesture-handler';
import MapView from 'react-native-maps';
import { LikeGymPage } from '../../controller/GymPageController';
import { GetUser } from '../../controller/UserComponent';

const GymScreen = (props) => {
    const { gymInfo, user } = props.route.params;
    const [liked, setLiked] = useState(user.likedGyms.includes(gymInfo.id))

    /**
     * runs when the component is loaded
     */
    useEffect(() => {
        console.log(gymInfo.coordinates);
        console.log(user);
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
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <TouchableOpacity onPress={() => {
                        LikeGymPage(gymInfo.id, user);
                        setLiked(!liked)
                    }}>
                        {liked ? 
                            <Icon
                                name="heart-sharp"
                                color="#72777A"
                                size={30}
                                style={{marginRight: 10}}
                            />
                        :<Icon
                            name="heart-outline"
                            color="#72777A"
                            size={30}
                            style={{marginRight: 10}}
                        />
                        }
                        
                    </TouchableOpacity>
                    <TouchableOpacity style={{borderRadius: 40}} 
                        onPress={() => props.navigation.navigate("GymDiscussionScreen", {gymInfo: gymInfo, user: user})}
                    >
                    <Icon
                        name="chatbubbles-outline"
                        color="#72777A"
                        size={30}
                        style={{}}
                        
                    />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{marginTop: 50}}>
            <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Address</Text>
                <Text>{gymInfo.blockNumber} {gymInfo.streetName} {gymInfo.floorNumber} </Text>
            </View>
            {gymInfo.desc!="" ? 
                <View style={styles.inputContainer}>
                    <Text style={styles.inputTitle}>Description</Text>
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
        marginTop: 50,
        
    },
    inputContainer: {
        alignSelf:'center',
        width: '90%',
        backgroundColor: '#f2f2f2',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 10,
        borderWidth: 1,
        borderColor: "#CFD3D4"
    },
    inputTitle: {
        color: "#5E6366",
        marginBottom: 5
    },
})