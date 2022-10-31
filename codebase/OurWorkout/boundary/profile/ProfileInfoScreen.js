import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useState, useEffect} from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { GetUser } from '../../controller/UserComponent'
import ProfileInfo from './ProfileInfo'
import EditProfileInfo from './EditProfileInfo'
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicon  from 'react-native-vector-icons/Ionicons';
import LoadingIndicator from '../LoadingIndicator'

const ProfileInfoScreen = ({ navigation, route }) => {
    const [edit, setEdit] = useState(false);
    const [user, setUser] = useState('');
    const [isLoaded, setLoaded] = useState(false);


    useEffect(() => {
        const getLoggedInUser = async () => {
      
            const loggedInUser = await GetUser();
            setUser(loggedInUser);
        }
    
        getLoggedInUser().then(setLoaded(true)).catch(console.error)
    })

    return (
        // <>
            <SafeAreaView style={{ padding: 20, backgroundColor:'#fff', height:'100%'}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Ionicon
                        name="arrow-back-circle-outline"
                        color="#72777A"
                        size={30}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setEdit(!edit)} >
                    <Icon
                        name={edit ? "account-check" : "account-edit"}
                        color="#72777A"
                        size={30}
                    />
                </TouchableOpacity>
                </View>
                {isLoaded ? 
                edit==false ?
                    <ProfileInfo user={user} />
                : <EditProfileInfo user={user} />
             : <LoadingIndicator />}
            </SafeAreaView>
            

    
    )
}


export default ProfileInfoScreen

const styles = StyleSheet.create({
    container: {
        // display: 'flex',
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        
      },

      name: {
        marginTop: 10,
        fontSize: 30,
        fontWeight: 'bold'
      },
    
})