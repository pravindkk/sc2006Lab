import { OurObject } from "./OurObject";

export class Exercise extends OurObject
{
    #internalUuid;
    #name;
    #muscles;
    #equipments;
    #photoUuidForDb;

    /** 
     * @typedef { Object } ExercisePOJO
     * @property { string } internalUuid
     * @property { string } name
     * @property { string[] } muscles
     * @property { string[] } equipments
     * @property { string } photoUuidForDb
     * @param { ExercisePOJO } obj
     */
     constructor(obj)
     {
        this.#internalUuid = obj.internalUuid;
        this.#name = obj.name;
        this.#muscles = obj.muscles;
        this.#equipments = obj.equipments;
        this.#photoUuidForDb = obj.photoUuidForDb;
     }
 
     /** 
      * @returns { WorkoutExerciseInfoPOJO } obj
      */
     toObj()
     {
        obj = {};
        obj.internalUuid = this.#internalUuid;
        obj.#name = this.#name;
        obj.#muscles = this.#muscles;
        obj.#equipments = this.#equipments;
        obj.#photoUuidForDb = this.#photoUuidForDb;
        return obj;
     }

     getInternalUuid = () => this.#internalUuid;

     getName = () => this.#name;
     setName = _ => this.#name = _;

     getMuscles = () => this.#muscles;
     setMuscles = _ => this.#muscles = _;

     getEquipments = () => this.#equipments;
     setEquipments = _ => this.#equipments = _;
     
     getPhotoUuidForDb = () => this.#photoUuidForDb;
     setPhotoUuidForDb = _ => this.#photoUuidForDb = _;
}