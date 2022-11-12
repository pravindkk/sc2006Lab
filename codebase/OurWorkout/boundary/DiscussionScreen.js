import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import LoadingIndicator from './LoadingIndicator';
import { GetUser } from '../controller/UserComponent';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { firebase } from '../config'
import { ListItem } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'
import { GymImg } from '../assets/icons/GymImg'
import DiscussionCard from './gym/DiscussionCard';

const DiscussionScreen = () => {
  const [user, setUser] = useState('');
  const [gymList, setGymList] = useState([]);
  const [hasLoaded, setLoaded] = useState(false);

  /**
   * Runs when the component is loaded
   */
  useEffect(() => {
    getLoggedInUser().then();
  },[])

  /**
   * gets the app current logged in user
   */
  const getLoggedInUser = async () => {
    setGymList([]);
    await GetUser().then(async (user) => {
      setUser(user);
      await getLikedGyms(user);
    })

  }

  /**
   * get the user's liked gyms' from firebase API
   * @param {*} user - current user details
   */
  const getLikedGyms = async (user) => {
    // console.log(GymImg[Math.floor(Math.random() * GymImg.length)]);
    try {
      await firebase.firestore().collection('gyms')
      .where(firebase.firestore.FieldPath.documentId(), 'in', user.likedGyms).get()
      .then((snapshot) => {
        // console.log(snapshot.docs[0].data());
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
    catch(err) {
      setGymList([]);
      setLoaded(true);
    }


  }

  /**
   * displays item in discussionList
   * @param {*} param0 - discussion item in discussionList
   */
  const renderItem = ({ item }) => (
    <DiscussionCard item={item} user={user} />
  )
  

  return hasLoaded ?
    <SafeAreaView style={styles.container}>
      
      <View style={{padding: 30}}>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent:'space-between'}}>
          <Text style={styles.title}>Liked Gyms</Text>
          <TouchableOpacity onPress={() => {getLoggedInUser();}}>
            <Icon
              name='reload-circle-outline'
              color='#72777A'
              size={30}
            />
          </TouchableOpacity>
        </View>
        {/* {gymList.map((item, index) => (
          <RenderItem item={item} />
        ))} */}
        {gymList.length != 0 ? 
          <FlatList
            horizontal={false}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id}
            data={gymList}
            renderItem={renderItem}
            style={{marginTop: 30, height: '87%'}}
            
            // contentContainerStyle={{alignSelf: 'center', flex: 1}}
              
          />
          :<View style={{marginTop: 30, height: '87%'}}><Text style={{justifyContent: 'center', alignSelf:'center'}}>You do not have any favourite gyms!</Text></View>
          
        }
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
    // paddingLeft: 0,

  }
})