import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler'
import { firebase } from '../../config'
import { ListItem, Avatar } from 'react-native-elements'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SearchBar } from 'react-native-elements'
import { GetUser } from '../../components/UserComponent'
import uuid from 'react-native-uuid';


const AllUserScreen = ({ navigation }) => {
  const [userData, setUserData] = useState('');
  const [allUser, setAllUser] = useState([]);
  const [allUserBackup, setAllUserBackup] = useState([]);
  const [hasLoaded, setLoaded] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const getLoggedInUser = async () => {
      
      const loggedInUser = await GetUser();
      setUserData(loggedInUser);
      
      // console.log(user);
    }

    getLoggedInUser().then(getAllUsers().then(setLoaded(true)));
    
  },[])

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

  const searchUser = (search) => {
    setSearch(search);
    setAllUser(allUserBackup.filter(it => it.firstName.match(search)));
  }

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

        }
        else {
          console.log("Chat already created");
        }

      })
  }

  const renderItem = ({ item }) => (
    <ListItem bottomDivider style={styles.listStyle} onPress={() => {createChatList(item)}}>
      <Avatar source={{uri: item.photoURL}} title={item.firstName} rounded size="medium" />
      <ListItem.Content>
        <ListItem.Title style={{fontSize: 20}}>{item.firstName} {item.lastName}</ListItem.Title>
        <ListItem.Subtitle style={{fontSize: 12}}>{item.email}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
    
  );


  
  return hasLoaded ?
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>HoMe</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => getAllUsers()}>
        <Text>all</Text>
      </TouchableOpacity>
      <SearchBar
        placeholder='Search by name ...'
        containerStyle={styles.searchContainer}
        inputStyle={styles.searchInput}
        onChangeText={text => searchUser(text)}
        value={search}
        autoCapitalize={false}
        autoComplete={false}
      />
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
        justifyContent: 'center'
    },
    listStyle: {
      paddingVertical: 7, 
      marginVertical: 2
    },
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
    },
})