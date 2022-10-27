import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, {useEffect, useState} from 'react'
import LoadingIndicator from '../LoadingIndicator'
import { firebase } from '../../config'
import { SearchBar, ListItem, Avatar } from 'react-native-elements'
import { FlatList } from 'react-native-gesture-handler'


const SearchScreen = () => {
  const [hasLoaded, setLoaded] = useState(false);
  const [allUser, setAllUser] = useState([]);
  const [allUserBackup, setAllUserBackup] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await firebase.firestore().collection('users').where("email", "!=", firebase.auth().currentUser.email).get()
      const tempDoc = []
      snapshot.forEach((doc) => {
          tempDoc.push({ id: doc.id, ...doc.data() })
      })
      setAllUser(tempDoc);
      setAllUserBackup(tempDoc);
      


    };
    fetchData().then(setLoaded(true));
  },[])

  const searchUser = (search) => {
    setSearch(search);
    setAllUser(allUserBackup.filter(it => it.firstName.match(search)));
  }
  const renderItem = ({ item }) => (
    <ListItem bottomDivider style={styles.listStyle} onPress={() => {}}>
      <Avatar source={{uri: item.photoURL}} title={item.firstName} rounded size="medium" />
      <ListItem.Content>
        <ListItem.Title style={{fontSize: 20}}>{item.firstName} {item.lastName}</ListItem.Title>
        <ListItem.Subtitle style={{fontSize: 12}} numberOfLines={1}>{item.email}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
    
  );


  return hasLoaded ?
    <SafeAreaView>
      <Text>Search Screen</Text>
      <SearchBar
        placeholder='Search...'
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
  : <LoadingIndicator />
}

export default SearchScreen

const styles = StyleSheet.create({})