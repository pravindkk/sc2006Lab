import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebase } from '../config'

/**
 * Stores the current logged in user in the device local storage
 * @param {*} value - Object value of the currently logged in user
 */
export const StoreUser = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@user', jsonValue)
    } catch (e) {
      alert(e)
    }
  }

/**
 * Gets the saved user from the device local storage
 * @returns object value of the saved user
 */
export const GetUser = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@user')
    // console.log(JSON.parse(jsonValue))
    return jsonValue != null ? JSON.parse(jsonValue) : '';
  } catch(e) {
    alert(e)
  }
}

/**
 * updates both the user details on firebase and device local storage
 * @param {*} uid - user's unique id
 */
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