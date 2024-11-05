import { Comment } from "./comment";
import { User } from "./user";

export class Post {

  constructor(
   
    public firstName: string,
    public lastName: string,
    public position: string,
    public profileImageUrl: string,
    public postDescription: string,
    public postId: number,
    public comments: Comment[],
    public postImage?: string,
    public postVideo?: string

  ) {}
}
