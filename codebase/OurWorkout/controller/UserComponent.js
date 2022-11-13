import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebase } from '../config'

/**
 * @typedef { Object } User The User stored by the UserComponent.
 * @property { string } uid The UUID of the logged-in User.
 * @property { string } photoURL The URL of the photo of the User. 
 * @property { string } firstName The first name of the User. 
 * @property { string } lastName The last name of the User. 
 * @property { UserSettings } settings Settings of this User?
 */

/**
 * @typedef { Object } UserSettings The settings of a User.
 * @property { boolean } allowNotifications Does this user want to receive notifications?
 */

/**
 * Async void function that stores data for the logged-in User, and thereby determines which User is currently logged-in, if any.
 * @param { UserComponentUser } value The currently logged-in User to store. 
 * @return { Promise<void> }
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
 * Async function that gets the stored User.
 * @return { User } The data corresponding to a User, stored using StoreUser. 
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
   * Get a User's settings
   * @param { UserComponentUser } user The User to get the settings for.
   * @returns { UserSettings } The settings for the User.
   */
  export const getSettingsForUser = (user) => {
    return user.settings != undefined ?
      user.settings : { allowNotifications: true };
  }

    /**
   * Async void method to set the current User's settings.
   * @param { string } uid The UUID of the current User.
   * @param { UserSettings } settings The settings to set for the current User.
   * @returns { Promise<void> }
   */
  export const setSettingsForUser = async (uid, settings) => {
    const user = await GetUser();
    user.settings = settings;
    await firebase.firestore().collection('users')
      .doc(uid)
      .set(user);
    updateLocalStorage(uid);
  }

  /**
   * Async void function to synchronise the local stored data of the logged-in User with that stored in the cloud DB.
   * @param { string } uid The UID of the current logged-in User.
   * @returns { Promise<void> }
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