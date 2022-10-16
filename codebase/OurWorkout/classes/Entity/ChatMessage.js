import { OurObject } from "./OurObject";

export class ChatMessage extends OurObject
{
    #internalUuid;
    #text;
    #chat;
    #creator;
    #photoUuidForDb;
    #workout;
    #deleted;

    /** 
     * @typedef { Object } ChatMessagePOJO
     * @property { string } internalUuid
     * @property { string } text
     * @property { Chat } chat
     * @property { User } creator 
     * @property { Workout } workout
     * @property { string } photoUuidForDb
     * @property { boolean } deleted
     * @param { ChatMessagePOJO } obj
     */
    constructor(obj)
    {
        this.#internalUuid = obj.internalUuid;
        this.#creator = obj.user;
        this.#photoUuidForDb = obj.photoUuidForDb;
        this.#deleted = obj.deleted;
        this.#workout = obj.workout;
        this.#text = obj.text;
        this.#chat = obj.chat;
    }

    /** 
     * @returns { ChatMessagePOJO } obj
     */
    toObj()
    {
        obj = {};
        obj.internalUuid = this.#internalUuid;
        obj.creator = this.#user;
        obj.photoUuidForDb = this.#photoUuidForDb;
        obj.deleted = this.#deleted;
        obj.workout = this.#workout;
        obj.text = this.#text;
        obj.chat = this.#chat;
        return obj;
    }

    getInternalUUid = () => this.#internalUuid;
    
    getCreator = () => this.#creator;
    setCreator = _ => this.#creator = _;

    getText = () => this.#text;
    setText = _ => this.#text = _;

    getChat = () => this.#chat;
    setChat = _ => this.#chat = _;

    getPhotoUuidForDb = () => this.#photoUuidForDb;
    setPhotoUuidForDb = _ => this.#photoUuidForDb = _;

    getWorkout = () => this.#chat;
    setWorkout = _ => this.#chat = _;

    isDeleted = () => this.#workout;
    delete = () => this.#workout = true;

    isDeleted = () => this.#deleted;
    delete = () => this.#deleted = true;
}