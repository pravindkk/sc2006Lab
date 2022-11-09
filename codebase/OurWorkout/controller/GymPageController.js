import { GetUser, StoreUser } from "./UserComponent"
import { firebase } from '../config'

const LikeGymPage = async (gymId, user) => {
    var liked=false;
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