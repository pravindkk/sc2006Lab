import { OurObject } from "./OurObject";

export class WorkoutExerciseInfo extends OurObject
{
    #internalUuid;
    #exercise;
    #weightTarget;
    #setsTarget;
    #repsTarget;
    #timeTargetMins;
    #timeTargetSecs;
    #description;

    /** 
     * @typedef { Object } WorkoutExerciseInfoPOJO
     * @property { string } internalUuid
     * @property { Exercise } exercise
     * @property { number } weightTarget
     * @property { number } setsTarget
     * @property { number } repsTarget
     * @property { number } timeTargetMins
     * @property { number } timeTargetSecs
     * @property { string } description
     * @param { WorkoutExerciseInfoPOJO } obj
     */
     constructor(obj)
     {
         this.#internalUuid = obj.internalUuid;
         this.#exercise = obj.exercise;
         this.#weightTarget = obj.weightTarget;
         this.#setsTarget = obj.setsTarget;
         this.#repsTarget = obj.repsTarget;
         this.#timeTargetMins = obj.timeTargetMins;
         this.#timeTargetSecs = obj.timeTargetSecs;
         this.#description = obj.description;
     }
 
     /** 
      * @returns { WorkoutExerciseInfoPOJO } obj
      */
     toObj()
     {
         obj = {};
         obj.internalUuid = this.#internalUuid;
         obj.exercise = this.#exercise;
         obj.weightTarget = this.#weightTarget;
         obj.setsTarget = this.#setsTarget;
         obj.repsTarget = this.#repsTarget;
         obj.timeTargetMins = this.#timeTargetMins;
         obj.timeTargetSecs = this.#timeTargetSecs;
         obj.description = this.#description;
         return obj;
     }

     getInternalUuid = () => this.#internalUuid;

     getExercise = () => this.#exercise;
     setExercise = _ => this.#exercise = _;

     getWeightTarget = () => this.#weightTarget;
     setWeightTarget = _ => this.#weightTarget = _;

     getSetsTarget = () => this.#setsTarget;
     setSetsTarget = _ => this.#setsTarget = _;
     
     getRepsTarget = () => this.#repsTarget;
     setRepsTarget = _ => this.#repsTarget = _;

     getTimeTargetMins = () => this.#timeTargetMins;
     setTimeTargetMins = _ => this.#timeTargetMins = _;

     getTimeTargetSecs = () => this.#timeTargetSecs;
     setTimeTargetSecs = _ => this.#timeTargetSecs = _;

     getDescription = () => this.#description;
     setDescription = _ => this.#description = _;
}