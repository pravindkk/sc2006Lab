import { OurObject } from "./OurObject";

export class Workout extends OurObject
{
    #internalUuid;
    #user;
    #nameAkaTitle;
    #description;
    #workoutExerciseInfos;
    #photoUuidsForDb;
    #likeUsers;

    /** 
     * @typedef { Object } WorkoutPOJO
     * @property { string } internalUuid
     * @property { string } description
     * @property { User } user
     * @property { string } nameAkaTitle
     * @property { string } description
     * @property { WorkoutExerciseInfo[] } workoutExerciseInfos
     * @property { string[] } photoUuidsForDb
     * @property { User[] } likeUsers
     * @param { WorkoutPOJO } obj
     */
    constructor(obj)
    {
        this.#internalUuid = obj.internalUuid;
        this.#user = obj.user;
        this.#nameAkaTitle = obj.nameAkaTitle;
        this.#description = obj.description;
        this.#workoutExerciseInfos = obj.workoutExerciseInfos;
        this.#photoUuidsForDb = obj.photoUuidsForDb;
        this.#likeUsers = obj.likeUsers;
    }

    /** 
     * @returns { WorkoutPOJO } obj
     */
    toObj()
    {
        obj = {};
        obj.internalUuid = this.#internalUuid;
        obj.user = this.#user;
        obj.nameAkaTitle = this.#nameAkaTitle;
        obj.description = this.#description;
        obj.workoutExerciseInfos = this.#workoutExerciseInfos;
        obj.photoUuidsForDb = this.#photoUuidsForDb;
        obj.likeUsers = this.#likeUsers;
        return obj;
    }

    getInternalUUid = () => this.#internalUuid;
    
    getUser = () => this.#user;
    setUser = _ => this.#user = _;

    getTitle = () => this.#nameAkaTitle;
    setTitle = _ => this.#nameAkaTitle = _;
    getWorkoutName = this.getTitle;
    setWorkoutName = this.setTitle;

    getDescription = () => this.#description;
    setDescription = _ => this.#description = _;

    getWorkoutExerciseInfos = () => this.#workoutExerciseInfos;
    addWorkoutExerciseInfo = _ => this.#workoutExerciseInfos.push(_);
    deleteWorkoutExerciseInfo = _ => {
        const idx = this.#workoutExerciseInfos.indexOf(_);
        if (idx > -1) {
          array.splice(idx, 1);
        }
    };

    getPhotoUuidsForDb = () => this.#photoUuidsForDb;
    addPhotoUuidForDb = _ => this.#photoUuidsForDb.push(_);
    deletePhotoUuidForDb = _ => {
        const idx = this.#photoUuidsForDb.indexOf(_);
        if (idx > -1) {
          array.splice(idx, 1);
        }
    };

    getLikeUsers = () => this.#likeUsers;
    addLikeUser = _ => this.#likeUsers.push(_);
    deleteLikeUser = _ => {
        const idx = this.#likeUsers.indexOf(_);
        if (idx > -1) {
          array.splice(idx, 1);
        }
    };
}