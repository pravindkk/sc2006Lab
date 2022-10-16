import { OurObject } from "./OurObject";

export class GymPageItem extends OurObject
{
   #internalUuid;
   #typeOfItem;
   #title;
   #text;
   #user;
   #photoUuidsForDb;
   #deleted;
   #hasParent;
   #parent;

   /** 
    * @typedef { Object } GymPageItemPOJO
    * @property { string } internalUuid
    * @property { string } typeOfItem
    * @property { string } title
    * @property { string } text
    * @property { User } user
    * @property { string[] } photoUuidsForDb
    * @property { boolean } hasParent
    * @property { GymPageItem } parent
    * @param { GymPageItemPOJO } obj
    */
   constructor(obj)
   {
   if (this.constructor == GymPageItem)
   {
      throw new Error("Abstract class GymPageItem cannot be constructed.");
   }
      this.#internalUuid = obj.internalUuid;
      this.#typeOfItem = obj.typeOfItem;
      this.#title = obj.title;
      this.#text = obj.text;
      this.#user = obj.user;
      this.#photoUuidsForDb = obj.photoUuidsForDb;
      this.#hasParent = obj.hasParent;
      this.#parent = obj.parent;
   }
 
     /** 
      * @returns { GymPageItemPOJO } obj
      */
     toObj()
     {
        obj = {};
        obj.#internalUuid = this.#internalUuid;
        obj.#typeOfItem = this.#typeOfItem;
        obj.#title = this.#title;
        obj.#text = this.#text;
        obj.#user = this.#user;
        obj.#photoUuidsForDb = this.#photoUuidsForDb;
        obj.#hasParent = this.#hasParent;
        obj.#parent = this.#parent;
        return obj;
     }

     getInternalUuid = () => this.#internalUuid;

     getTitle = () => this.#title;
     setTitle = _ => this.#title = _;

     getTypeOfItem = () => this.#typeOfItem;
     setTypeOfItem = _ => this.#typeOfItem = _;

     getText = () => this.#text;
     setText = _ => this.#text = _;
     
     getPhotoUuidsForDb = () => this.#photoUuidsForDb;
     setPhotoUuidsForDb = _ => this.#photoUuidsForDb = _;

     isDeleted = () => this.#deleted;
     deleteThisItem = () => this.#deleted = true;

     getUser = () => this.#user;
     setUser = _ => this.#user = _;

     getHasParent = () => this.#hasParent;
     getParent = () => this.#parent;
     setParent = _ => {
      this.#parent = _;
      this.hasParent = true;
     }
     makeThisOrphan = () => this.hasParent = false;
}