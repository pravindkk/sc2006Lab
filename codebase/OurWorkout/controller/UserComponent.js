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

  export const getSettingsForUser = (user) => {
    return user.settings != undefined ?
      user.settings : { allowNotifications: true };
  }

  export const setSettingsForUser = async (uid, settings) => {
    const user = await GetUser();
    user.settings = settings;
    await firebase.firestore().collection('users')
      .doc(uid)
      .set(user);
    updateLocalStorage(uid);
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