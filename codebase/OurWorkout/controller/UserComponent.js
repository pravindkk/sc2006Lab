import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebase } from '../config'

export const StoreUser = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@user', jsonValue)
    } catch (e) {
      alert(e)
    }
  }

  export const GetUser = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@user')
      // console.log(JSON.parse(jsonValue))
      return jsonValue != null ? JSON.parse(jsonValue) : '';
    } catch(e) {
      alert(e)
    }
  }

  export const updateLocalStorage = async (uid) => {
    await firebase.firestore().collection('users').doc(uid).get()
    .then(async (snapshot) => {
      if (snapshot.exists) {
        
        loggedInUser = snapshot.data()
        loggedInUser['uid'] = uid;
        
        StoreUser(loggedInUser)
        console.log("login :" + loggedInUser.photoURL)
      }
      else {
        console.log("error app cannot find user")
      }
    })
    
    
  }