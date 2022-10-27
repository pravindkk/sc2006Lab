import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import LoadingIndicator from './LoadingIndicator';
import { GetUser } from '../controller/UserComponent';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { firebase } from '../config'
import { ListItem } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const DiscussionScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState('');
  const [gymList, setGymList] = useState([]);
  const [hasLoaded, setLoaded] = useState(false);

  useEffect(() => {
    getLoggedInUser().then();
  },[])

  const getLoggedInUser = async () => {
    setGymList([]);
    await GetUser().then(async (user) => {
      setUser(user);
      console.log("Discusion Screen user: ",user);
      console.log("This is the user gym",user.likedGyms);
      await getLikedGyms(user).then(console.log("Final gymList",gymList));
    })

  }

  const getLikedGyms = async (user) => {
    await firebase.firestore().collection('gyms')
    .where(firebase.firestore.FieldPath.documentId(), 'in', user.likedGyms).get()
    .then((snapshot) => {
      console.log(snapshot.docs[0].data());
      snapshot.docs.forEach(doc => {
        setGymList( arr => [...arr, doc.data()]);
      })
      setLoaded(true);
      
    })
    .catch((err) => {
      setGymList([]);
      setLoaded(true);
    });


  }

  const navigateToExerciseScreen = (item) => {
    navigation.navigate("GymDiscussionScreen", {gymInfo: item, user: user});
  }

  const renderItem = ({ item }) => (
    // <TouchableOpacity onPress={() => navigateToExerciseScreen(item)} style={styles.button}>
    //   <Text>{item.name}</Text>
    // </TouchableOpacity>
    <ListItem style={styles.listStyle} onPress={() => {navigateToExerciseScreen(item)}}>
      
      <ListItem.Content>
        <ListItem.Title style={{fontSize: 16}}>{item.name}</ListItem.Title>
        
      </ListItem.Content>
    </ListItem>
  )

  return hasLoaded ?
    <SafeAreaView style={styles.container}>
      <View style={{padding: 30}}>
        <Text style={styles.title}>Liked Gyms</Text>
        <FlatList
          horizontal={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          data={gymList}
          renderItem={renderItem}
          style={{marginTop: 50}}
          // contentContainerStyle={{alignSelf: 'center', flex: 1}}
            
        />
        
      </View>
    </SafeAreaView>
  : <LoadingIndicator />
}

export default DiscussionScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%'
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  listStyle: {
    padding: 5,
    paddingLeft: 0,

  }
})