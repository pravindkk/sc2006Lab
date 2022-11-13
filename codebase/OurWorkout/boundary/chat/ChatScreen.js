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
import ChatUser from './ChatUser'

/**
 * ChatScreen functions to show a searchable list of all Chats the current User is in.
 * It handles all UI interactions with this list and navigates to individual SingleChat components as appropriate.
 * 
 * Assumption: That the user has already been logged in.
 * @param { Object } object the anonymous object passed in and destructured   
 * @param { NavigationProp } object.navigation The parent component's navigation prop, used for navigation between pages.   
 * @returns { View } The UI displayed to the user by React.
 */
const ChatScreen = ({navigation}) => {
  const [userData, setUserData] = useState('');
  const [hasLoaded, setLoaded] = useState(false);
  const [chatList, setChatList] = useState([]);

  /**
   * Runs when the component is loaded
   */
  useEffect(() => {
    getChatList();

    const getLoggedInUser = async () => {
      
      const loggedInUser = await GetUser();
      setUserData(loggedInUser);
      
      // console.log(user);
    }

    getLoggedInUser().then(setLoaded(true));
    
  },[])

  /**
   * Call the firebase API to get the user's chats
   */
  const getChatList = async() => {
    firebase.database().ref('/chatlist/' + firebase.auth().currentUser.uid)
      .on('value', snapshot => {
        try {
          console.log('user data: ', Object.values(snapshot.val()));
        } catch (error) {
          
        }
        
        if (snapshot.val() != null) {
          setChatList(Object.values(snapshot.val()).sort())
        }
      })
  }

  /**
   * Runs for each item in the chatList
   * @param {*} item - Render List Item 
   * @returns 
   */
  const renderItem = ({ item }) => (
    <ChatUser item={item} />
    
  );



  return hasLoaded ? 
    <SafeAreaView style={{backgroundColor: "#fff", paddingTop: 30}}>
      <View style={{flexDirection: 'row', alignItems:'center', justifyContent: 'space-between', paddingLeft: 10, paddingRight: 10, backgroundColor: '#fff'}}>
        
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
              name="arrow-back-circle-outline"
              color="#72777A"
              size={35}
          />
        </TouchableOpacity>
        <Text style={{fontSize: 30, fontWeight: 'bold'}}>Chats</Text>
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