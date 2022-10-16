import { OurObject } from "./OurObject";

export class UserDetails extends OurObject
{
    #name;
    #firstName;
    #lastName;
    #biography;
    #tags;
    #ageInYears;
    #birthDate;
    #photoUuidForDb;

    constructor(obj)
    {
        this.#name = obj.name;
        this.#firstName = obj.firstName;
        this.#lastName = obj.lastName;
        this.#biography = obj.biography;
        this.#tags = obj.tags;
        this.#ageInYears = obj.ageInYears;
        this.#photoUuidForDb = obj.photoUuidForDb;
        this.#birthDate = obj.birthDate;
    }

    toObj()
    {
        obj = {};
        obj.name = this.#name;
        obj.firstName = this.#firstName;
        obj.lastName = this.#lastName;
        obj.biography = this.#biography;
        obj.tags = this.#tags;
        obj.ageInYears = this.#ageInYears;
        obj.photoUuidForDb = this.#photoUuidForDb;
        obj.birthDate = this.#birthDate;
        return obj;
    }

    getName = () => this.#name;
    setName = _ => this.#name = _;

    getFirstName = () => this.#firstName;
    getLastName = _ => this.#lastName = _; 

    getLastName = () => this.#lastName;
    setLastName = _ => this.#lastName = _;

    getBiography = () => this.#biography;
    setBiography = _ => this.#biography = _;

    getTags = () => this.#tags;
    newTag = _ => this.#tags.push(_);
    deleteTag = _ => {
        const idx = this.#tags.indexOf(_);
        if (idx > -1) {
            this.#tags.splice(idx, 1);
        }
    };

    getAgeInYears = () => this.#ageInYears;
    setAgeInYears = _ => this.#ageInYears = _;

    getBirthDate = () => this.#birthDate;
    setBirthDate = _ => this.#birthDate = _;

    getPhotoUuidForDb = () => this.#photoUuidForDb;
    setPhotoUuidForDb = _ => this.#photoUuidForDb = _;
}