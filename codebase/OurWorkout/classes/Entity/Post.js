import { GymPageItem } from "./GymPageItem";

export class Post extends GymPageItem
{
    #workout;

    constructor(obj)
    {
        super(obj);
        this.setTypeOfItem("Post");
        this.#workout = obj.workout;
    }

    toObj()
    {
        obj = super.toObj();
        obj.workout = this.#workout;
        return obj;
    }

    getWorkout = () => this.#workout;
    setWorkout = _ => this.#workout = _;
}