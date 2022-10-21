import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect }  from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { GetUser } from '../../controller/UserComponent'
import { firebase } from '../../config'
import { ListItem, Avatar } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'

import LoadingIndicator from '../LoadingIndicator'

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
    <ListItem style={{marginTop: 10}} onPress={() => {navigation.navigate('SingleChat', {receiverData: item, senderData: loggedInUser})}}>
      <Avatar source={{uri: item.photoURL}} title={item.firstName} rounded size="medium" />
      <ListItem.Content>
        <ListItem.Title style={{fontSize: 20}}>{item.firstName} {item.lastName}</ListItem.Title>
        <ListItem.Subtitle style={{fontSize: 12}} numberOfLines={1}>{item.lastMsg}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
    
  );



  return hasLoaded ? 
    <SafeAreaView style={{backgroundColor: "#fff", paddingTop: 30}}>
      <View style={{flexDirection: 'row', alignItems:'center', justifyContent: 'space-between', paddingLeft: 10, paddingRight: 10, backgroundColor: '#fff'}}>
        
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
              name="arrow-back-circle-outline"
              color="#72777A"
              size={30}
          />
        </TouchableOpacity>
        <Text style={{fontSize: 30, fontWeight: 'bold', marginLeft: 10}}>Chats</Text>
        <TouchableOpacity onPress={() => navigation.navigate('AllUsers')}>
          <Entypo
            name="new-message"
            color="#72777A"
            size={25}
            
          />
        </TouchableOpacity>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        data={chatList}
        renderItem={renderItem}
        style={{height: '100%', paddingTop: 30}}
        
      />

    </SafeAreaView>
  : <LoadingIndicator />
}

export default ChatScreen

const styles = StyleSheet.create({})