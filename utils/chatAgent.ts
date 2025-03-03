/* eslint-disable @typescript-eslint/no-explicit-any */
import ChatSdk from "podchat-browser";
import { v4 as uuidv4 } from "uuid";
import q from "q";
import { IThreadInfo } from "@interface/app.interface";
import {
  IAddContact,
  ICreateThread,
  IInvitees,
} from "@interface/chat.interface";
import { EChatType } from "@interface/enums";
import { getMe } from "@actions/auth";

interface ChatInitParams {
  token: string;
}

export default class Chat {
  private static instance: Chat;

  private chatInstance: any = null;

  private pending = false;

  private constructor() {
    console.log("constructor is called");
  }

  public static getInstance(): Chat {
    if (!Chat.instance) Chat.instance = new Chat();
    return Chat.instance;
  }

  public get chatAgent(): any {
    return this.chatInstance;
  }

  public check = async (params: ChatInitParams) => {
    if (this.pending) {
      this.waitForInit();
    }
    if (!this.chatInstance) await this.init(params);
  };

  private init = async (params: ChatInitParams) => {
    console.log("server render>>>>>>>>>>>>>>>>>>>>");
    if (!window) {
      return;
    }
    this.pending = true;

    const chatParams = {
      appId: "POD-Chat",
      socketAddress: "wss://chat-sandbox.sandpod.ir/ws",
      ssoHost: "http://sso-sandbox.sandpod.ir",
      platformHost: "https://sandbox.sandpod.ir/srv/basic-platform",
      fileServer: "https://core.sandpod.ir",
      podSpaceFileServer: "https://podspace.sandpod.ir",
      serverName: "chat-server",
      grantDeviceIdFromSSO: false,
      enableCache: false,
      fullResponseObject: false,
      mapApiKey: "https://api.neshan.org/v1",
      typeCode: "Clasor",
      token: params.token,
      wsConnectionWaitTime: 500,
      connectionRetryInterval: 5000,
      connectionCheckTimeout: 10_000,
      messageTtl: 86_400,
      reconnectOnClose: true,
      httpRequestTimeout: 30_000,
      httpUploadRequestTimeout: 0,
      asyncLogging: {
        onFunction: true,
        onMessageReceive: false,
        onMessageSend: false,
        actualTiming: false,
      },
      callOptions: {
        callNoAnswerTimeout: 5000,
        streamCloseTimeout: 5000,
      },
    };

    const deferred = q.defer();
    this.chatInstance = new ChatSdk(chatParams);
    const chatReadyEventListener = this.chatAgent?.on("chatReady", () => {
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
      console.log("chatReady");
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
      deferred.resolve();
      this.pending = false;
    });
    const chatErrorEventListener = this.chatAgent?.on(
      "error",
      async (error: any) => {
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Error in chat sdk");
        console.log(error);
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
        switch (error.code) {
          case 21: {
            const userInfo = await getMe();
            this.chatAgent?.setToken(userInfo.access_token);
            break;
          }
          case 109: {
            break;
          }
          case 999: {
            this.chatAgent?.off("chatReady", chatReadyEventListener);
            this.chatAgent?.off("error", chatErrorEventListener);
            this.chatInstance = null;
            this.pending = false;
            deferred.reject(error);

            break;
          }
          default:
            console.log(">>>>>>>>>>>>>>>>>>>>>>>> ERROR", error.code);
          // No default
        }
      }
    );

    return deferred.promise;
  };

  createThread = (
    description: string,
    type: EChatType,
    invitees: IInvitees[],
    title?: string
  ) => {
    console.log("create thread called");
    const deferred = q.defer();
    const params = {
      title: title || uuidv4(),
      description,
      type,
      invitees,
    };
    this.chatAgent?.createThread(params, (result: ICreateThread) => {
      if (result.hasError) deferred.reject(result);
      deferred.resolve(result);
    });
    return deferred.promise;
  };

  getThreads = (offset: number, count: number) => {
    const deferred = q.defer<IThreadInfo[]>();
    const Params = {
      count,
      offset,
    };
    let threadList: IThreadInfo[] = [];
    this.chatAgent?.getThreads(Params, (threadsResult: any) => {
      if (!threadsResult.hasError) {
        threadList = threadsResult.result.threads;
        deferred.resolve(threadList || []);
      }
    });
    return deferred.promise;
  };

  seen = (messageId: number, ownerId: number) => {
    this.chatAgent?.seen({
      messageId,
      ownerId,
    });
  };

  addChatContact = (
    givenName: string,
    familyName: string,
    userName: string,
  ) => {
    const deferred = q.defer<IAddContact>();
    const params = {
      firstName: givenName,
      lastName: familyName,
      email: "",
      typeCode: "Clasor",
      username: userName,
    };
    this.chatAgent?.addContacts(params, (result: IAddContact) => {
      if (result.hasError) deferred.reject(result);
      deferred.resolve(result);
    });
    return deferred.promise;
  };

  removeChatContact = (contactId: number) => {
    const deferred = q.defer();
    const params = {
      id: contactId,
    };
    this.chatAgent?.removeContacts(params, (result: any) => {
      if (result.hasError) deferred.reject();
      deferred.resolve(result);
    });
    return deferred.promise;
  };

  getChatContact = () => {
    const deferred = q.defer();
    const params = {};
    // eslint-disable-next-line no-underscore-dangle
    this.chatAgent?.getContacts(params, (result: any) => {
      if (result.hasError) deferred.reject();
      deferred.resolve(result);
    });
    return deferred.promise;
  };

  addParticipants(threadId: number, contactIds: number[]) {
    const deferred = q.defer();
    const params = {
      threadId,
      contactIds,
    };
    this.chatAgent?.addParticipants(params, (result: any) => {
      if (result.hasError) deferred.reject();
      deferred.resolve(result);
    });
    return deferred.promise;
  }

  getThreadParticipants(threadId: number) {
    const deferred = q.defer();
    const params = {
      threadId,
    };
    this.chatAgent?.getThreadParticipants(params, (result: any) => {
      if (result.hasError) deferred.reject();
      deferred.resolve(result);
    });
    return deferred.promise;
  }

  removeParticipants(threadId: number, participantIds: number[]) {
    const deferred = q.defer();
    const params = {
      threadId,
      participantIds,
    };
    this.chatAgent?.removeParticipants(params, (result: any) => {
      if (result.hasError) deferred.reject();
      deferred.resolve(result);
    });
    return deferred.promise;
  }

  sendTextMessage(threadId: number, message: string, systemMetadata: string) {
    const deferred = q.defer();
    const params = {
      threadId,
      textMessage: message,
      messageType: "TEXT",
      systemMetadata,
    };

    this.chatAgent?.sendTextMessage(params, {
      onSent: (result: any) => {
        deferred.resolve(result);
      },
      onDeliver: (result: any) => {
        console.log(`${result.uniqueId} \t has been Delivered!`);
      },
      onSeen: (result: any) => {
        console.log(`${result.uniqueId} \t has been Seen!`);
      },
    });
    return deferred.promise;
  }

  closeThread(threadId: number) {
    const deferred = q.defer();
    this.chatAgent?.closeThread(
      {
        threadId,
      },
      (result: any) => {
        if (result.hasError) deferred.reject();
        deferred.resolve(result);
      }
    );
    return deferred.promise;
  }

  getAllThreads() {
    const deferred = q.defer();
    this.chatAgent?.getAllThreads({}, (result: any) => {
      if (result.hasError) deferred.reject();
      deferred.resolve(result);
    });
    return deferred.promise;
  }

  waitForInit = (): Promise<void> => 
    {return new Promise((resolve) => {
      setTimeout(() => {
        if (!this.pending) {
          resolve();
          return;
        }
        this.waitForInit();
      }, 1000);
    });};
}
