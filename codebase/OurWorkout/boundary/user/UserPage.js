import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicon from 'react-native-vector-icons/Ionicons'


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

            <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Email</Text>
                <Text>{user.email}</Text>
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