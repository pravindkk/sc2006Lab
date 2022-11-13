import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler'
import { firebase } from '../../config'
import { ListItem, Avatar } from 'react-native-elements'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Searchbar } from 'react-native-paper'
import { GetUser } from '../../controller/UserComponent'
import uuid from 'react-native-uuid';
import Icon from 'react-native-vector-icons/Ionicons'


/**
 * AllUserScreen functions to show a searchable list of Users for chatting with.
 * It handles all UI interactions with this list and navigates to individual SingleChat components as appropriate.
 * 
 * Assumption: That the user has already been logged in.
 * @param { Object } object the anonymous object passed in and destructured   
 * @param { NavigationProp } object.navigation The parent component's navigation prop, used for navigation between pages.   
 * @returns { View } The UI displayed to the user by React.
 */
const AllUserScreen = ({ navigation }) => {
  const [userData, setUserData] = useState('');
  const [allUser, setAllUser] = useState([]);
  const [allUserBackup, setAllUserBackup] = useState([]);
  const [hasLoaded, setLoaded] = useState(false);
  const [search, setSearch] = useState('');

  /**
   * Runs when the component is loaded
   */
  useEffect(() => {
    const getLoggedInUser = async () => {
      
      const loggedInUser = await GetUser();
      setUserData(loggedInUser);
      
      // console.log(user);
    }

    getLoggedInUser().then(getAllUsers().then(setLoaded(true)));
    
  },[])

  /**
   * Gets all the users who are registered with OurWorkout from the firebase API so users can create chats
   */
  const getAllUsers = async () => {
    const snapshot = await firebase.firestore().collection('users').where("email", "!=", firebase.auth().currentUser.email).get()
    const tempDoc = []
    snapshot.forEach((doc) => {
        tempDoc.push({ id: doc.id, ...doc.data() })
    })
    setAllUser(tempDoc);
    setAllUserBackup(tempDoc);
    console.log(tempDoc)

  }

  /**
   * Filter the array of users according to the search text
   * @param {*} search - search text
   */
  const searchUser = (search) => {
    setSearch(search);
    setAllUser(allUserBackup.filter(it => it.firstName.toLowerCase().match(search)));
  }

  /**
   * To create a new chat with the sender data
   * @param {*} data - sender data
   */
  const createChatList = (data) => {
    firebase.database().ref('/chatlist/' + userData.uid + '/' + data.id)
      .once('value')
      .then(snapshot => {
        console.log('user data: ', snapshot.val());

        if (snapshot.val() == null) {
          let roomId = uuid.v4();
          let myData = {
            roomId,
            id: userData.uid,
            firstName: userData.firstName,
            lastName: userData.lastName,
            photoURL: userData.photoURL,
            email: userData.email,
            lastMsg: '',
          }
          firebase.database().ref('/chatlist/' + data.id + '/' + userData.uid)
            .update(myData)
            .then(() => console.log('Data Updated'));
          data.lastMsg = '';
          data.roomId = roomId;
          firebase.database().ref('/chatlist/' + userData.uid + '/' + data.id)
            .update(data)
            .then(() => console.log('Data updated'));
          navigation.navigate('SingleChat', {receiverData: data, senderData: loggedInUser})
        }
        else {
          console.log("Chat already created");
        }

      })
  }

  /**
   * Runs for each item in the userList
   * @param {*} item - Render List Item
   * @returns 
   */
  const renderItem = ({ item }) => (
    <ListItem bottomDivider style={styles.listStyle} onPress={() => {createChatList(item)}}>
      <Avatar source={{uri: item.photoURL}} title={item.firstName} rounded size="medium" />
      <ListItem.Content>
        <ListItem.Title style={{fontSize: 20}}>{item.firstName} {item.lastName}</ListItem.Title>
        <ListItem.Subtitle style={{fontSize: 12}} numberOfLines={1}>{item.email}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
    
  );


  
  return hasLoaded ?
    <SafeAreaView style={styles.container}>
      <View style={styles.nav}>
        <View style={{flex: 1}} >
          <TouchableOpacity onPress={() => navigation.goBack()} >
              <Icon
                  name="arrow-back-circle-outline"
                  color="#72777A"
                  size={30}
              />
          </TouchableOpacity>
        </View>
        <View style={{flex: 10}}>
        <Searchbar
          placeholder="Search User..."
          onChangeText={searchUser}
          value={search}
          autoCapitalize={false}
          // autoComplete={false}
          style={{shadowOpacity: 0}}
        />
        </View>


      </View>
      
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        data={allUser}
        renderItem={renderItem}
      />


    </SafeAreaView>
  : <SafeAreaView><Text>Loading</Text></SafeAreaView>
}

export default AllUserScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    nav: {
      display: 'flex',
      flexDirection: 'row', 
      alignItems: 'center', 
      paddingLeft: 10, 
      paddingRight: 10, 
      justifyContent: 'space-around', 
      height: 50,
    },
    // listStyle: {
    //   paddingVertical: 7, 
    //   marginVertical: 2
    // },
    searchInput: {
      fontSize: 15,
      // fontFamily: FONTS.Regular,
      // color: COLORS.black,
      color: '#fff',
      opacity: 0.7,
    },
    searchContainer: {
      elevation: 2,
      // backgroundColor: COLORS.white,
      backgroundColor: '#FFF',
      paddingHorizontal: 10,
      borderRadius: 20,
      borderColor: '#fff',
    },
})