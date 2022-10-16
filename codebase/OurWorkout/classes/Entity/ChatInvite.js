import { GymPageItem } from "./GymPageItem";

export class ChatInvite extends GymPageItem
{
    #chat;

    constructor(obj)
    {
        super(obj);
        this.setTypeOfItem("ChatInvite");
        this.#chat = obj.chat;
    }

    toObj()
    {
        obj = super.toObj();
        obj.chat = this.#chat;
        return obj;
    }

    delete = super.deleteThisItem();
    getChat = _ => this.#chat;
    setChat = _ => this.#chat = _;
}