export interface IBLockDocument {
    blockTime : number;
    user : {name : string, ssoId : number}
    vId : number
}

export interface IRefClasorEditor {
    getData: () => {
      content: string;
      outline: string;
    };
  }
