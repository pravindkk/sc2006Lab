import { OurObject } from "./OurObject"

export class User extends OurObject {
    #internalUuid;
    #usesEmailRegistration;
    #authProvider;
    #userDetails;
    #workouts;
    #gymsFollowed;
    #likeWorkouts;
    #gymcChatsCreated;
    #chatsIn;
    #messagesCreated;

    constructor(obj)
    {
        this.#internalUuid = obj.internalUuid || null;
        this.#usesEmailRegistration = obj.usesEmailRegistration || null;
        this.#authProvider = obj.authProvider || null;
        this.#userDetails = obj.userDetails || null;
        this.#workouts = obj.workouts || null;
        this.#gymsFollowed = obj.gymsFollowed || null;
        this.#likeWorkouts = obj.likeWorkouts || null;
        this.#gymPageItemsCreated = obj.gymPageItemsCreated || null;
        this.#chatsCreated = obj.chatsCreated || null;
        this.#chatsIn = obj.chats || null;
        this.#messagesCreated = obj.messageCreated || null;
    }

    toObj()
    {
        obj = {};
        obj.internalUuid = this.#internalUuid || null;
        obj.usesEmailRegistration = this.#usesEmailRegistration || null;
        obj.authProvider = this.#authProvider || null;
        obj.userDetails = this.#userDetails || null;
        obj.workouts = this.#workouts || null;
        obj.gymsFollowed = this.#gymsFollowed || null;
        obj.likeWorkouts = this.#likeWorkouts || null;
        obj.gymPageItemsCreated = this.#gymPageItemsCreated || null;
        obj.chatsCreated = this.#chatsCreated || null;
        obj.chatsIn = this.#chats || null;
        obj.messageCreated = this.#messagesCreated || null;
        return obj;
    }

    getInternalUuid = () => this.#internalUuid;

    getAuthProvider = () => this.#authProvider;
    setAuthProvider = _ => this.#authProvider = _;

    getUserDetails = () => this.#userDetails;
    setUserDetails = _ => this.#userDetails = _;

    getWorkouts = () => this.#workouts;
    addWorkout = _ => this.#workouts.push(_);
    deleteWorkout = _ => {
        const idx = this.#workouts.indexOf(_);
        if (idx > -1) {
          array.splice(idx, 1);
        }
    };

    getGymsFollowed = () => this.#gymsFollowed;
    addGymFollowed = _ => this.#gymsFollowed.push(_);
    deleteGymFollowed = _ => {
        const idx = this.#gymsFollowed.indexOf(_);
        if (idx > -1) {
          array.splice(idx, 1);
        }
    };

    getLikeWorkouts = () => this.#likeWorkouts;
    addLikeWorkout = _ => this.#likeWorkouts.push(_);
    deleteLikeWorkout = _ => {
        const idx = this.#likeWorkouts.indexOf(_);
        if (idx > -1) {
          array.splice(idx, 1);
        }
    };

    getGymPageItemsCreated = () => this.#gymPageItemsCreated;
    addGymPageItemCreated = _ => this.#gymPageItemsCreated.push(_);
    deleteGymPageItemCreated = _ => {
        const idx = this.#gymPageItemsCreated.indexOf(_);
        if (idx > -1) {
          array.splice(idx, 1);
        }
    };

    getChatsCreated = () => this.#chatsCreated;
    addChatCreated = _ => this.#chatsCreated.push(_);
    deleteChatCreated = _ => {
        const idx = this.#chatsCreated.indexOf(_);
        if (idx > -1) {
          array.splice(idx, 1);
        }
    };

    getChatsIn = () => this.#chatsIn;
    addChatIn = _ => this.#chatsIn.push(_);
    deleteChatIn = _ => {
        const idx = this.#chatsIn.indexOf(_);
        if (idx > -1) {
          array.splice(idx, 1);
        }
    };

    getMessagesCreated = () => this.#messagesCreated;
    addMessageCreated = _ => this.#messagesCreated.push(_);
    deleteMessageCreated = _ => {
        const idx = this.#messagesCreated.indexOf(_);
        if (idx > -1) {
          array.splice(idx, 1);
        }
    };

    getUserName = () => this.#userDetails.getName();
};
