import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native-gesture-handler'

const ProfileInfo = ({ user }) => {
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
                <Text>{user.firstName}</Text>
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Last Name</Text>
                <Text>{user.lastName}</Text>
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Email</Text>
                <Text>{user.email}</Text>
            </View>

        </SafeAreaView>
    )
}

export default ProfileInfo

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        
        // alignItems: 'center',
        
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

    name: {
        marginTop: 10,
        fontSize: 30,
        fontWeight: 'bold'
    },
})