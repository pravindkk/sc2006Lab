import { StyleSheet, Text, View, Image} from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { GetUser, StoreUser } from '../../controller/UserComponent';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { getAuth, signOut } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native';
import { useGlobalState } from '../../controller/GlobalState';

/**
 * Displays the profile of the currently logged-in user.
 * - Displays the profile photo of the currently logged-in user.
 * - Provides a button for navigating to the User's ProfileInfoScreen.
 * - Provides a button for the logged-in User to log out.
 * - Upon logging out, navigation to the LoginScreen takes place automatically.
 * 
 * Assumption: The user viewing this screen has already been logged in.
 * @returns { SafeAreaView } The UI displayed by React for this screen.
 */
const ProfileScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState('');
  const [hasLoaded, setLoaded] = useState(false);
  const [loggedIn, setLoggedIn] = useGlobalState('loggedIn')

  /**
   * Runs when the component is loaded
   */
  useEffect(() => {
    const getLoggedInUser = async () => {
      
      const loggedInUser = await GetUser();
      setUser(loggedInUser);
      // console.log(user);
    }

    getLoggedInUser().then(setLoaded(true)).catch(console.error)
  },[])



  return hasLoaded ?
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{flex: 1, justifyContent: 'center'}} >
        <View style={{alignItems: 'center'}}>
          <Image                 
            source={{
            uri: user.photoURL,
            }}
            style={{ width: 100, height: 100, borderWidth: 0, borderRadius: 60 }}
          />
          <Text style={styles.name}>{user.firstName}</Text>
        </View>
        <View style={{justifyContent: 'center'}} >
          <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate("ProfileInfo")} >
            <Text style={styles.buttonText}>Profile Information</Text>
          </TouchableOpacity>
        </View>
      
        <TouchableOpacity
          onPress={() => {
              
              const auth = getAuth()
              signOut(auth).then(() => {
                  alert("You have been signed out!");
                  setLoggedIn(false);
                  StoreUser('');
              }).catch((error) => {
                  alert(error.message)
              })
          }}
          style={styles.signOutButton}
        >
          <Text style={{fontSize: 16, color: '#fff'}}>
              Sign Out
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  : <SafeAreaView style={{flex: 1}}><Text>Loading...</Text></SafeAreaView>
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    backgroundColor:'#FFF'
    // alignItems: 'center',
    
  },

  name: {
    marginTop: 10,
    fontSize: 30,
    fontWeight: 'bold'
  },

  buttonContainer: {
    marginTop: 10, 
    width: '80%', 
    padding: 20, 
    alignSelf: 'center',
    // paddingLeft: 100,
    // paddingRight: 100,
    borderWidth: 1, 
    borderRadius: 10, 
    borderColor: '#CFD3D4' 
  },

  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',  
  },

  signOutButton: {
    marginTop: 20,
    width: '80%',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#000',
    padding: 20,
    backgroundColor: '#303437',
    borderRadius: 10,
    alignItems: 'center',
    

  },
})

