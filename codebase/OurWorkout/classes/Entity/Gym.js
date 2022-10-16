import { OurObject } from "./OurObject";

export class Gym extends OurObject
{
    #internalUuid;
    #name;
    #followers;
    #gymPageItems;
    #gpsLatitude;
    #gpsLongitude;

    /** 
     * @typedef { Object } GymPOJO
     * @property { string } internalUuid
     * @property { string } name
     * @property { User[] } followers
     * @property { number } gpsLatitude
     * @property { number } gpsLongitude
     */
    constructor(obj)
    {
        this.#internalUuid = obj.internalUuid;
        this.#name = obj.name;
        this.#followers = obj.followers;
        this.#gpsLatitude = obj.gpsLatitude;
        this.#gpsLongitude = obj.gpsLongitude;
    }

    /** 
     * @returns { GymPOJO } obj
     */
    toObj()
    {
        obj = {};
        obj.internalUuid = this.#internalUuid;
        obj.name = this.#name;
        obj.followers = this.#followers;
        obj.gpsLatitude = this.#gpsLatitude;
        obj.gpsLongitude = this.#gpsLongitude;
        return obj;
    }

    getInternalUuid = () => this.#internalUuid;
    
    getName = () => this.#name;
    setName = _ => this.#name = _;

    getFollowers = () => this.#followers;
    /**
     * 
     * @param {User} follower 
     */
    deleteFollower(follower)
    {
        let idx = -1;
        for (let i = 0; i < this.#followers.length; i++)
        {
            if (this.#followers[i].internalUuid == follower.getInternalUuid())
            {
                idx = i;
            }
        }
        if (idx > -1) {
            array.splice(idx, 1);
        }
    } 
    addFollower(follower)
    {
        this.#followers.push(follower);
    }

    getGymPageItems = () => this.#gymPageItems;
    /**
     * 
     * @param {GymPageItem} gymPageItem 
     */
    deleteGymPageItem(gymPageItem)
    {
        let idx = -1;
        for (let i = 0; i < this.#gymPageItems.length; i++)
        {
            if (this.#gymPageItems[i].internalUuid == gymPageItem.getInternalUuid())
            {
                idx = i;
            }
        }
        if (idx > -1) {
            array.splice(idx, 1);
        }
    } 
    addGymPageItem(gymPageItem)
    {
        this.#gymPageItems.push(gymPageItem);
    }

    getGpsLatitude = () => this.#gpsLatitude;
    setGpsLatitude = _ => this.#gpsLatitude = _;

    getGpsLongitude = () => this.#gpsLongitude;
    setGpsLongitude = _ => this.#gpsLongitude = _;
}