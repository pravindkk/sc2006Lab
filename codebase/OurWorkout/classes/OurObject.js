export class OurObject
{
    constructor(obj) {
        throw new Error("Abstract method!");
    }

    static fromObj(obj)
    {
        throw new Error("Abstract method!");
    }

    toObj()
    {
        throw new Error("Abstract method!");
    }
}