import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, {useEffect, useState} from 'react'
import LoadingIndicator from '../LoadingIndicator'
import { firebase } from '../../config'
import { ListItem, Avatar } from 'react-native-elements'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { Searchbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'
import { GetUser } from '../../controller/UserComponent'


const SearchScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState('')
  const [hasLoaded, setLoaded] = useState(false);
  const [allUser, setAllUser] = useState([]);
  const [allUserBackup, setAllUserBackup] = useState([]);
  const [search, setSearch] = useState('');

  const [allGym, setAllGym] = useState([]);
  const [allGymBackup, setAllGymBackup] = useState([]);

  const [exerciseList, setExerciseList] = useState([]);
  const [exerciseListBackup, setExerciseListBackup] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const loggedInUser = await GetUser();
      setUser(loggedInUser);
      const snapshot = await firebase.firestore().collection('users').where("email", "!=", firebase.auth().currentUser.email).get()
      const tempDoc = []
      snapshot.forEach((doc) => {
          tempDoc.push({ id: doc.id, ...doc.data() })
      })
      setAllUser(tempDoc);
      setAllUserBackup(tempDoc);
      
      const gymSnapshot = await firebase.firestore().collection('gyms').get()
      const gymDoc = []
      gymSnapshot.forEach((doc) => {
        gymDoc.push({ id: doc.id, ...doc.data() })
      })
      setAllGym(gymDoc);
      setAllGymBackup(gymDoc);

      await firebase.database().ref('/exercise/').on('value' , snapshot => {
        // console.log(snapshot.val());
        if (snapshot.val() != null) {
            const list = Object.values(snapshot.val());
            setExerciseList(list);
            setExerciseListBackup(list);
            // console.log(exerciseList);
            // setLoaded(true);
        }
    })


    };
    fetchData().then(setLoaded(true));
  },[])

  const searchUser = (search) => {
    setSearch(search);
    setAllUser(allUserBackup.filter(it => it.firstName.toLowerCase().match(search.toLowerCase())));
    setAllGym(allGymBackup.filter(it => it.name.toLowerCase().match(search.toLowerCase())));
    setExerciseList(exerciseListBackup.filter(it => it.name.toLowerCase().match(search.toLowerCase())));
  }
  const UserCard = ({ item }) => (
    <ListItem bottomDivider style={styles.listStyle} onPress={() => {}}>
      <Avatar source={{uri: item.photoURL}} title={item.firstName} rounded size="medium" />
      <ListItem.Content>
        <ListItem.Title style={{fontSize: 20}}>{item.firstName} {item.lastName}</ListItem.Title>
        <ListItem.Subtitle style={{fontSize: 12}} numberOfLines={1}>{item.email}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
    
  );

  const GymCard = ({ item }) => (
    // <Text>{item.name}</Text>
    <ListItem bottomDivider style={styles.listStyle} onPress={() => {navigation.navigate("GymScreen", {gymInfo: item, user: user})}}>
      <Avatar size="medium" />
      <ListItem.Content>
        <ListItem.Title style={{fontSize: 20}}>{item.name}</ListItem.Title>
        <ListItem.Subtitle style={{fontSize: 12}} numberOfLines={1}>{item.streetName}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  )

  const ExerciseCard = ({ item }) => (
    // <Text>{item.name}</Text>
    <ListItem bottomDivider style={styles.listStyle} onPress={() => {navigation.navigate("ExerciseScreen", {exerciseInfo: item})}}>
      <Avatar size="medium" />
      <ListItem.Content>
        <ListItem.Title style={{fontSize: 20}}>{item.name}</ListItem.Title>
        {/* <ListItem.Subtitle style={{fontSize: 12}} numberOfLines={1}>{item.streetName}</ListItem.Subtitle> */}
      </ListItem.Content>
    </ListItem>
  )


  return hasLoaded ?
    <SafeAreaView style={{backgroundColor: '#fff'}}>
      <Searchbar
        placeholder="Search..."
        onChangeText={searchUser}
        value={search}
        autoCapitalize={false}
        autoComplete={false}
        style={{shadowOpacity :0}}
      />
      <ScrollView style={{height: '90%'}}>

        {allUser.slice(0, 3).map((user, index) => (
          <UserCard item={user} />
        ))}
        {allGym.slice(0, 3).map((gym, index) => (
          // <Text>{gym.name}</Text> 
          <GymCard item={gym} />
        ))}
        {exerciseList.slice(10, 13).map((exercise, index) => (
          <ExerciseCard item={exercise} />
        ))}
      </ScrollView>

    </SafeAreaView>
  : <LoadingIndicator />
}

export default SearchScreen

const styles = StyleSheet.create({})