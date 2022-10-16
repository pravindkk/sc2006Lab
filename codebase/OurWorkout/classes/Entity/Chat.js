import { OurObject } from "./OurObject";

export class Chat extends OurObject
{
    #internalUuid;
    #creator;
    #nameAkaTitle;
    #users;
    #chatInvites;
    #deleted;

    /** 
     * @typedef { Object } ChatPOJO
     * @property { string } internalUuid
     * @property { User } creator 
     * @property { string } nameAkaTitle
     * @property { User[] } users
     * @property { boolean } deleted
     * @param { ChatPOJO } obj
     */
    constructor(obj)
    {
        this.#internalUuid = obj.internalUuid;
        this.#user = obj.user;
        this.#nameAkaTitle = obj.nameAkaTitle;
        this.#users = obj.users;
        this.#chatInvites = obj.chatInvites;
        this.#deleted = obj.deleted;
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
        obj.users = this.#users;
        obj.chatInvites = this.#chatInvites;
        obj.deleted = this.#deleted;
        return obj;
    }

    getInternalUUid = () => this.#internalUuid;
    
    getCreator = () => this.#creator;
    setCreator = _ => this.#creator = _;

    getTitle = () => this.#nameAkaTitle;
    setTitle = _ => this.#nameAkaTitle = _;
    getName = this.getTitle;
    setName = this.setTitle;

    getUsers = () => this.#users;
    /**
     * 
     * @param {User} user 
     */
    deleteUser(user)
    {
        let idx = -1;
        for (let i = 0; i < this.#users.length; i++)
        {
            if (this.#users[i].internalUuid == user.getInternalUuid())
            {
                idx = i;
            }
        }
        if (idx > -1) {
            array.splice(idx, 1);
        }
    } 
    addUser(user)
    {
        this.#users.push(user);
    }

    getChatInvites = () => this.#chatInvites;
    /**
     * 
     * @param {ChatInvite} chatInvite 
     */
    deleteChatInvite(chatInvite)
    {
        let idx = -1;
        for (let i = 0; i < this.#chatInvites.length; i++)
        {
            if (this.#chatInvites[i].internalUuid == chatInvite.getInternalUuid())
            {
                idx = i;
            }
        }
        if (idx > -1) {
            array.splice(idx, 1);
        }
    } 
    addChatInvite(chatInvite)
    {
        this.#chatInvites.push(chatInvite);
    }

    isDeleted = () => this.#deleted;
    delete = () => this.#deleted = true;
}