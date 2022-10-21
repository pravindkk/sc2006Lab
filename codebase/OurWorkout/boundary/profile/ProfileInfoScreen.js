import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useState, useEffect} from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { GetUser } from '../../controller/UserComponent'
import ProfileInfo from './ProfileInfo'
import EditProfileInfo from './EditProfileInfo'

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
        <>
            <SafeAreaView style={{flexDirection: 'row', justifyContent: 'space-between', padding: 20}}>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Text> Go Back</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setEdit(!edit)} >
                    <Text>Edit?</Text>
                </TouchableOpacity>
            </SafeAreaView>
            {isLoaded ? 
                edit==false ?
                    <ProfileInfo user={user} />
                : <EditProfileInfo user={user} />
             : <SafeAreaView>
                    <Text>Loading...</Text>
                </SafeAreaView>}

        </>
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