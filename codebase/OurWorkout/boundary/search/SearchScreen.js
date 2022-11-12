import { Keyboard, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, {useEffect, useState} from 'react'
import LoadingIndicator from '../LoadingIndicator'
import { firebase } from '../../config'
import { ListItem, Avatar } from 'react-native-elements'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { Searchbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'
import { GetUser } from '../../controller/UserComponent'
import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import AntDesign from 'react-native-vector-icons/AntDesign'
import GymPreview from '../gym/GymPreview'
import ExercisePreview from '../excercise/ExercisePreview'


const SearchScreen = () => {
  const navigation = useNavigation();

  const [user, setUser] = useState('')
  const [hasLoaded, setLoaded] = useState(false);
  const [search, setSearch] = useState('');

  const [focus, setFocus] = useState(false);
  // const [searchRef, setSearchRef] = useState();
  var searchRef = React.createRef();

  const [allUser, setAllUser] = useState([]);
  const [allUserBackup, setAllUserBackup] = useState([]);

  const [allGym, setAllGym] = useState([]);
  const [allGymBackup, setAllGymBackup] = useState([]);

  const [exerciseList, setExerciseList] = useState([]);
  const [exerciseListBackup, setExerciseListBackup] = useState([]);

  /**
   * Runs when the component is loaded (get exercises from wger.de dataset, all the registered users, all the gyms)
   */
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

  /**
   * Searches according to the search text
   * @param {*} search - filter the userList, gymList and exerciseList according to the search
   */
  const searchUser = (search) => {
    setSearch(search);
    if (search == '') {
      Keyboard.dismiss();
      searchRef.focus = false;
      setFocus(false);
    }
    else {
      searchRef.focus= true;
      setFocus(true)
    }
    // if (searchRef.isFocused() == false && search == '') setFocus(false);
    // else setFocus(true);
    setAllUser(allUserBackup.filter(it => it.firstName.toLowerCase().match(search.toLowerCase())));
    setAllGym(allGymBackup.filter(it => it.name.toLowerCase().match(search.toLowerCase())));
    setExerciseList(exerciseListBackup.filter(it => it.name.toLowerCase().match(search.toLowerCase())));
  }

  /**
   * displays the user item from userList
   * @param {*} item - user item from userList
   */
  const UserCard = ({ item }) => (
    <ListItem bottomDivider style={styles.listStyle} onPress={() => {navigation.navigate("UserPage", {user: item})}}>
      <Avatar source={{uri: item.photoURL}} title={item.firstName} rounded size="medium" />
      <ListItem.Content>
        <ListItem.Title style={{fontSize: 14}}>{item.firstName} {item.lastName}</ListItem.Title>
        <ListItem.Subtitle style={{fontSize: 12}} numberOfLines={1}>{item.email}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
    
  );

  /**
   * displays the gym item from gymList
   * @param {*} item - gym item from gymList
   */
  const GymCard = ({ item }) => (
    <ListItem bottomDivider style={styles.listStyle} onPress={() => {navigation.navigate("GymScreen", {gymInfo: item, user: user})}}>
      <View style={{backgroundColor: '#303437', padding: 10, borderRadius: 90}}>
        <AntDesign
          name='home'
          size={30}
          color="#fff"
        />
      </View>
      <ListItem.Content>
        <ListItem.Title style={{fontSize: 14}}>{item.name}</ListItem.Title>
        <ListItem.Subtitle style={{fontSize: 12}} numberOfLines={1}>{item.streetName}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  )
  /**
   * displays the exercise item from exerciseList
   * @param {*} item - exercise item from exerciseList
   */
  const ExerciseCard = ({ item }) => (
    // <Text>{item.name}</Text>
    <ListItem bottomDivider style={styles.listStyle} onPress={() => {navigation.navigate("ExerciseScreen", {exerciseInfo: item})}}>
      {/* <Avatar size="medium" />*/}
      <View style={{backgroundColor: '#303437', padding: 10, borderRadius: 90}}>
      <FontAwesome
        name='dumbbell'
        size={25}
        color="#fff"
        style={{transform: [{ rotate: '-20deg'}]}}
      />
      </View>
      <ListItem.Content>
        <ListItem.Title style={{fontSize: 14}}>{item.name}</ListItem.Title>
        {/* <ListItem.Subtitle style={{fontSize: 12}} numberOfLines={1}>{item.streetName}</ListItem.Subtitle> */}
      </ListItem.Content>
    </ListItem>
  )

  /**
   * Renders the list of users from userList
   * @param {*} param0 - Render List item
   * @returns 
   */
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate("UserPage", {user: item})}>
      <Avatar containerStyle={{marginRight: 20}} source={{uri: item.photoURL}} rounded size="medium" />
    </TouchableOpacity>
  )


  return hasLoaded ?
    <SafeAreaView style={{backgroundColor: '#fff'}}>
      <Searchbar
        placeholder="Search..."
        onChangeText={searchUser}
        value={search}
        autoCapitalize={false}
        // autoComplete={false}
        style={{shadowOpacity :0, paddingTop: Platform.OS == 'ios' ? 0 : 30}}
        // onFocus={() => setFocus(true)}
        ref={(ref) => searchRef =ref}
        onFocus={() => {
          searchRef.focus = true;
          setFocus(true);
        }}
        
        onTouchCancel={() => {
          
          searchRef.focus= false;
          setFocus(false)
        }}
        // onTouc
        
        
      />
      {focus ? 
        <ScrollView style={{height: '80%'}}>

          {allUser.slice(0, 3).map((user, index) => (
            <UserCard key={index} item={user} />
          ))}
          
          {allGym.slice(0, 3).map((gym, index) => (
            // <Text>{gym.name}</Text> 
            <GymCard key={index} item={gym} />
          ))}
          {exerciseList.slice(10, 13).map((exercise, index) => (
            <ExerciseCard key={index} item={exercise} />
          ))}
        </ScrollView>
        :
        <ScrollView style={{padding: 30}} showsVerticalScrollIndicator={false}>
          <View>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>Exercises</Text>
            <ExercisePreview exerciseList={exerciseList.splice(0, 15)} />
          </View>
          <View style={{marginTop: 30}}>
          <Text style={{fontWeight: 'bold', fontSize: 20}}>Users</Text>
            <FlatList
              data={allUser}
              keyExtractor={item => item.id}
              horizontal={true}
              renderItem={renderItem}
              showsHorizontalScrollIndicator={false}
              style={{marginTop: 15}}
            />
          </View>
          <View style={{marginTop: 30}}>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>Gyms</Text>
            <GymPreview gymList={allGym.splice(0, 15)} user={user} />
          </View>
          <View style={{padding: 100}} />
        </ScrollView>
      }
      
      <View style={{backgroundColor: '#fff', padding: 30}}></View>

    </SafeAreaView>
  : <LoadingIndicator />
}

export default SearchScreen

const styles = StyleSheet.create({})