/**
 * The job of this component is to define our entities.
 * And also to insert the test data in the firebase db.
*/

import { firebase } from '../config'
import AsyncStorage from '@react-native-async-storage/async-storage';

class OurObject
{
    constructor(obj) {
        fromObj(obj);
    }

    static fromObj(obj)
    {
        for (var item in obj) {
            if (item === undefined) item = null;
        }
        return Object.assign(this, obj);
    }

    static toObj(obj)
    {
        return Object.assign({}, this);
    }
}

class User extends OurObject {
    static fromObj(obj)
    {
        that = super.fromObj(obj);
        that.userDetails = UserDetails.fromObj(that.userDetails);
        return that;
    }
};
class EmailUser extends User {};
class UserDetails extends OurObject {};
class Workout extends OurObject {};
class Gym extends OurObject {};
class Chat extends OurObject {};

async function putStuffInDb()
{
    await putUsersInDb();
    await putChatsInDb();
    await putGymsInDb();
    await putWorkoutsInDb();
}

async function putUsersInDb()
{
    let users = require('../testData/User.json');

    let image = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
    let blob = fetch(image);

    for (let user of users)
    {
        await firebase.firestore().collection('users')
            .doc(user.internalUuid)
            .set(user)
            .catch((error) => {
                alert(error.message)
            }).then(() => {
                firebase.storage().ref().child('users/' + user.internalUuid).put(blob)
                // setRedirect(true);
            }).catch((error) => {
                alert(error.message)
            });
    }
}

async function putChatsInDb()
{
    let chats = require('../testData/Chat.json');

    for (let chat of chats)
    {
        await firebase.firestore().collection('chats')
            .doc(chat.internalUuid)
            .set(chat)
            .catch((error) => {
                alert(error.message)
            });
    }
}

async function putWorkoutsInDb()
{
    let workouts = require('../testData/Workout.json');

    for (let workout of workouts)
    {
        await firebase.firestore().collection('workouts')
            .doc(workout.internalUuid)
            .set(workout)
            .catch((error) => {
                alert(error.message)
            });
    }
}

async function putGymsInDb()
{
    let gyms = require('../testData/Workout.json');

    for (let gym of gyms)
    {
        await firebase.firestore().collection('gyms')
            .doc(gym.internalUuid)
            .set(gym)
            .catch((error) => {
                alert(error.message)
            });
    }
}

export const putTestDataInDb = putStuffInDb; 