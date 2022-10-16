import { User } from "./User"; 

export class EmailUser extends User
{
    #isEmailVerified;
    #userEmail;

    constructor(obj)
    {
        super(obj);
        this.#isEmailVerified = obj.isEmailVerified;
        this.#userEmail = obj.#userEmail;
    }

    toObj()
    {
        obj = super.toObj();
        obj.isEmailVerified = this.#isEmailVerified;
        obj.userEmail = this.#userEmail;
        return obj;
    }

    getVerificationStatus = () => this.#isEmailVerified;
    setVerificationStatus = _ => this.isEmailVerified = _;

    getEmail = () => this.#userEmail;
    setEmail = _ => this.#userEmail = _;

    resendVerificationEmail = () => { throw new Error("Not implemented yet.") };
}