import { GymPageItem } from "./GymPageItem";

export class Thread extends GymPageItem
{
    #posts;
    #workout;

    constructor(obj)
    {
        super(obj);
        this.setTypeOfItem("Thread");
        this.#posts = obj.posts;
        this.#workout = obj.workout;
    }

    toObj()
    {
        obj = super.toObj();
        obj.posts = this.#posts;
        obj.workout = this.#workout;
        return obj;
    }

    getPosts = () => this.#posts;
    addPost = _ => this.#posts.push(_);
    deletePost(post)
    {
        let idx = -1;
        for (let i = 0; i < this.#posts.length; i++)
        {
            if (this.#posts[i].getInternalUuid() == post.getInternalUuid())
            {
                idx = i;
            }
        }
        if (idx > -1)
        {
            this.#posts.splice(idx, 1);
        }
    }

    getWorkout = () => this.#workout;
    setWorkout = _ => this.#workout = _;
}