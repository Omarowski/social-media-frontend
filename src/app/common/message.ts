export class Message {

    constructor(
      public id: number,
      public content: string,
      public sender: string,
      public recipient: string,
      public timestamp: Date,
      public senderProfieImage: string,
      public type: string
    ) {}
}