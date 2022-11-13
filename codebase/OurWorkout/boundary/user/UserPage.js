import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicon from 'react-native-vector-icons/Ionicons'

/**
 * Displays the user page corresponding to a specific User, showing their profile photo (if any) or placeholder image (if none), their first name and their last name.
 * 
 * Assumption: The user viewing this component has been logged-in.
 * @param { Object } props The route params from navigation towards this component. 
 * @param { Object } props.route.params.user The User to be displayed. 
 * @param { string } props.route.params.user.photoURL The URL of the photo of the User. 
 * @param { string } props.route.params.user.firstName The first name of the User. 
 * @param { string } props.route.params.user.lastName The last name of the User. 
 * @returns { SafeAreaView } The UI displayed to the user by react.
 */
const UserPage = (props) => {
  const { user } = props.route.params;

  return (
    <SafeAreaView style={{ padding: 20, backgroundColor:'#fff', height:'100%' }}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <TouchableOpacity onPress={() => props.navigation.goBack()} >
          <Ionicon
            name="arrow-back-circle-outline"
            color="#72777A"
            size={35}
          />
        </TouchableOpacity>
      </View>
      <View style={{alignItems: 'center'}}>
                <Image                 
                    source={{
                    uri: user.photoURL,
                    }}
                    style={{ width: 100, height: 100, borderWidth: 0, borderRadius: 60 }}
                />
                <Text style={{fontSize: 30, marginBottom: 30, marginTop: 10, fontWeight: 'bold'}}>{user.firstName}</Text>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>First Name</Text>
                <Text>{user.firstName}</Text>
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Last Name</Text>
                <Text>{user.lastName}</Text>
            </View>
    </SafeAreaView>
  )
}

export default UserPage

const styles = StyleSheet.create({
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