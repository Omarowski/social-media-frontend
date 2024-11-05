import { User } from "./user";

export class UserMessage {

    constructor (
      public user: User,
    public latestMessage: string
    ) {}
  }
  