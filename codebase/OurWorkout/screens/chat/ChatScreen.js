import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect }  from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { GetUser } from '../../components/UserComponent'
import { firebase } from '../../config'
import { ListItem, Avatar } from 'react-native-elements'

const ChatScreen = ({navigation}) => {
  const [userData, setUserData] = useState('');
  const [hasLoaded, setLoaded] = useState(false);
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    getChatList();
    const getLoggedInUser = async () => {
      
      const loggedInUser = await GetUser();
      setUserData(loggedInUser);
      
      // console.log(user);
    }

    getLoggedInUser().then(setLoaded(true));
    
  },[])

  const getChatList = async() => {
    firebase.database().ref('/chatlist/' + firebase.auth().currentUser.uid)
      .on('value', snapshot => {
        try {
          console.log('user data: ', Object.values(snapshot.val()));
        } catch (error) {
          
        }
        
        if (snapshot.val() != null) {
          setChatList(Object.values(snapshot.val()))
        }
      })
  }

  const renderItem = ({ item }) => (
    <ListItem bottomDivider style={styles.listStyle} onPress={() => {navigation.navigate('SingleChat', {receiverData: item, senderData: loggedInUser})}}>
      <Avatar source={{uri: item.photoURL}} title={item.firstName} rounded size="medium" />
      <ListItem.Content>
        <ListItem.Title style={{fontSize: 20}}>{item.firstName} {item.lastName}</ListItem.Title>
        <ListItem.Subtitle style={{fontSize: 12}} numberOfLines={1}>{item.lastMsg}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
    
  );



  return hasLoaded ? 
    <SafeAreaView>
      
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>HoMe</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('AllUsers')}>
        <Text>all users</Text>
      </TouchableOpacity>
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        data={chatList}
        renderItem={renderItem}
        
      />

    </SafeAreaView>
  : <SafeAreaView><Text>Loading...</Text></SafeAreaView>
}

export default ChatScreen

const styles = StyleSheet.create({})