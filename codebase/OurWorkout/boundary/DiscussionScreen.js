import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import LoadingIndicator from './LoadingIndicator';
import { GetUser } from '../controller/UserComponent';
import { FlatList } from 'react-native-gesture-handler';
import { firebase } from '../config'

const DiscussionScreen = () => {
  const [user, setUser] = useState('');
  const [hasLoaded, setLoaded] = useState(false);
  const [gymList, setGymList] = useState([]); 

  useEffect(() => {
    const startup = async () => {
      await getLoggedInUser()
      
    }


    startup().then(() => {
      
      console.log("This is the liked gym list",gymList);
    });
    
  },[])
  const getGymList = async(user) => {
    console.log(user);
    const snapshot = await firebase.firestore().collection('gyms')
                      .where(firebase.firestore.FieldPath.documentId(), 'in', user.likedGyms).get();
    console.log(snapshot.docs[0].data());
    snapshot.docs.map(item => {
      setGymList(arr => [...arr, item.data()]);
    })
    setLoaded(true)
    
    // const snapshot = await firebase
    // .firestore()
    //     .collection('gyms')
    //     .where(firebase.firestore.FieldPath.documentId(), 'in', user.likedGyms)
    //     .get();
    // console.log(snapshot.docs[0].data());
    // snapshot.docs.map(doc => {
    //   setGymList( arr => [...arr, doc.data()]);
    // })
    // console.log(gymList);
  }
  const getLoggedInUser = async () => {
    // setGymList([]);
    const loggedInUser = await GetUser();
    console.log(loggedInUser);
    if (loggedInUser == ''){
        
        setLoaded(false);
    }
    else {
        setUser(loggedInUser);
        getGymList(loggedInUser);
    }
    // console.log(gymList);
  }

  const renderItem = ({item}) => {
    <Text>{item.name}</Text> 
  }

  return hasLoaded ? 
    <SafeAreaView style={styles.container}>
      <View style={{padding: 30}}>
        <Text style={styles.title}>Followed Gyms</Text>
        {/* <FlatList
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          data={gymList}
          renderItem={renderItem}
        /> */}
        <Text>Hellp</Text>
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
})