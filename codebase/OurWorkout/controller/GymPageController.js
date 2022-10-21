import { GetUser, StoreUser } from "./UserComponent"
import { firebase } from '../config'

const LikeGymPage = async(gymId, user) => {
    // const user = await GetUser().then(console.log(user))
    // const user = 
    console.log(user);
    const likedGymsArray = user.likedGyms != undefined ? user.likedGyms : [];
    if (likedGymsArray.includes(gymId)) {
        var index = likedGymsArray.indexOf(gymId);
        if (index >= 0) {
            likedGymsArray.splice( index, 1 );
        }
    }
    else {
        likedGymsArray.push(gymId);
    }
    
    
    console.log(user.likedGyms);
    await firebase.firestore().collection('users').doc(user.uid).update({
        likedGyms: likedGymsArray
    }).then(() =>{
        user.likedGyms = likedGymsArray;
        StoreUser(user)
        alert("updated!")
    })
    // await firebase.firestore().collection('users').doc(user.uid).update({
    //     firstName: user.firstName,
    //     lastName: user.lastName,
    //     email: user.email,
    //     likedGyms: likedGymsArray,
    // }).then(() => {
    //     user.firstName = firstName;
    //     user.lastName = lastName;
    //     user.email = email;
    //     user.likedGyms = likedGymsArray;
    //     StoreUser(user);
    //     alert("User has been updated!")
    // })
}

export { LikeGymPage }