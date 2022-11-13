import { GetUser, StoreUser } from "./UserComponent"
import { firebase } from '../config'

/**
 * Async` void function which marks a Gym as liked by a User.
 * 
 * Assumption: The User provided is that which has been logged in by the app
 * @param { string } gymId The UUID of the Gym. 
 * @param { Object } user The data of the User liking the Gym.
 * @param { Array<string> } user.likedGyms The list of UUIDs of Gyms the User has liked. 
 * @param { string } user.uid The UUID of the User.
 * @returns { Promise<void> } 
 */
const LikeGymPage = async(gymId, user) => {
    // const user = await GetUser().then(console.log(user))
    // const user = 
    console.log(user);
    const likedGymsArray = user.likedGyms != undefined ? user.likedGyms : [];
    if (likedGymsArray.includes(gymId)) {
        var index = likedGymsArray.indexOf(gymId);
        if (index >= 0) {
            likedGymsArray.splice( index, 1 );
            liked=false;
        }
    }
    else {
        likedGymsArray.push(gymId);
        liked=true;
    }
    
    
    console.log(user.likedGyms);
    await firebase.firestore().collection('users').doc(user.uid).update({
        likedGyms: likedGymsArray
    }).then(() =>{
        user.likedGyms = likedGymsArray;
        StoreUser(user)
        alert(liked ? "Liked Gym!" : "Unliked Gym!")
    })

}

export { LikeGymPage }