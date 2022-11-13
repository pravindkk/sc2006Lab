import { StyleSheet, Text, View, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { firebase } from '../../config'
import { StoreUser } from '../../controller/UserComponent'

const EditProfileInfo = ({ user }) => {
    const [email, setEmail] = useState(user.email);
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);

    /**
     * calls the firebase API to update the user details
     * @param {*} uid  - unique id of user
     */
    const updateUserDetails = async (uid) => {
        await firebase.firestore().collection('users').doc(uid).update({
            firstName,
            lastName,
            email,
        }).then(() => {
            user.firstName = firstName;
            user.lastName = lastName;
            user.email = email;
            StoreUser(user);
            alert("User has been updated!")
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{alignItems: 'center'}}>
            <Image                 
                source={{
                uri: user.photoURL,
                }}
                style={{ width: 100, height: 100, borderWidth: 0, borderRadius: 60 }}
            />
            <Text style={styles.name}>{user.firstName}</Text>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>First Name</Text>
                <TextInput
                    value={firstName}
                    onChangeText={text => setFirstName(text)}
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.input}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Last Name</Text>
                <TextInput
                    value={lastName}
                    onChangeText={text => setLastName(text)}
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.input}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Email</Text>
                <TextInput
                    value={email}
                    onChangeText={text => setEmail(text)}
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.input}
                />
            </View>
            <TouchableOpacity
                onPress={() => updateUserDetails(user.uid)}
                style={[styles.button, { marginTop: 30 }]}
            >
                <Text style={styles.buttonText}>Change</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default EditProfileInfo

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,

        // alignItems: 'center',
        
    },

      name: {
        marginTop: 10,
        fontSize: 30,
        fontWeight: 'bold'
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
      button: {
        backgroundColor: "#303437",
        alignItems: 'center',
        padding: 15,
        borderRadius: 12,
        width: '90%',
        alignSelf: 'center'
      },
      buttonText: {
        color: "#FFFFFF",
        fontSize: 20,
    
      },
})