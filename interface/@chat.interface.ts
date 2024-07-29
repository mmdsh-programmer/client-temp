export interface ICreateThread {
  hasError: boolean;
  cache: boolean;
  errorMessage: string;
  errorCode: number;
  result: {
    thread: {
      id: number;
      joinDate: number;
      title: string;
      inviter: {
        id: number;
        coreUserId: number;
        threadId: number;
        firstName: string;
        lastName: string;
        name: string;
        image: string;
        notSeenDuration: number;
        contactId: number;
        contactName: string;
        contactFirstName: string;
        contactLastName: string;
        blocked: boolean;
        username: string;
      };
      participants: {
        id: number;
        coreUserId: number;
        threadId: number;
        firstName: number;
        lastName: number;
        name: string;
        image: string;
        notSeenDuration: number;
        auditor: boolean;
        username: string;
      }[];
      time: number;
      lastMessage: string;
      group: boolean;
      partner: number;
      lastParticipantImage: string;
      image: string;
      unreadCount: number;
      lastSeenMessageId: number;
      lastSeenMessageTime: number;
      lastMessageVO: {
        id: number;
        threadId: number;
        ownerId: number;
        uniqueId: string;
        previousId: number;
        message: string;
        messageType: number;
        edited: boolean;
        editable: boolean;
        deletable: boolean;
        mentioned: boolean;
        pinned: boolean;
        participant: {
          id: number;
          coreUserId: number;
          threadId: number;
          firstName: string;
          lastName: string;
          name: string;
          image: string;
          notSeenDuration: number;
          contactId: number;
          contactName: string;
          contactFirstName: string;
          contactLastName: string;
          blocked: boolean;
          username: string;
        };
        metadata: {[key:string]: string};
        time: number;
        timeMiliSeconds: number;
        timeNanos: number;
      };
      partnerLastSeenMessageId: number;
      partnerLastSeenMessageTime: number;
      partnerLastDeliveredMessageId: number;
      partnerLastDeliveredMessageTime: number;
      type: number;
      mute: boolean;
      participantCount: number;
      pin: boolean;
      userGroupHash: string;
    };
  };
}

export interface IAddContact {
  hasError: boolean;
  cache: boolean;
  errorCode: number;
  result: {
    contacts: {
      id: number;
      blocked: boolean;
      firstName: string;
      lastName: string;
      email: string;
      cellphoneNumber: string;
      uniqueId: string;
      linkedUser: {
        coreUserId: number;
        username: string;
        nickname: string;
        name: string;
      };
    }[];
    contentCount: number;
  };
}

export interface IInvitees {
  id: number;
  idType: any;
}

export interface IChatError {
  code: number;
  error: {
    message: string;
    code: number;
  }
  message: string;
  uniqueId: string;
}
