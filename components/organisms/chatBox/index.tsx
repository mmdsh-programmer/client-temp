/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import {
  Author,
  ChatBubbleStyles,
  LastSeenAvatarStyles,
  AvatarStyles,
  ChatFeed,
  Message,
} from "react-bell-chat";
import Chat from "@utils/chatAgent";
import { IChatError } from "@interface/chat.interface";
import { toast } from "react-toastify";
import useGetUser from "@hooks/auth/useGetUser";
import useEnableDocChat from "@hooks/chat/useEnableDocChat";
import { useRecoilValue } from "recoil";
import { selectedDocumentAtom } from "@atom/document";
import LoadingButton from "@components/molecules/loadingButton";
import { Typography } from "@material-tailwind/react";
import InputAtom from "@components/atoms/input";
import Image from "next/image";
import { FaDateFromTimestamp } from "@utils/index";

const chatBubbleStyles: ChatBubbleStyles = {
  chatBubble: {
    boxShadow: "none",
    borderRadius: "12px",
    padding: "12px",
    margin: "8px 0",
  },
  recipientChatBubble: {
    backgroundColor: "#f5f5f5",
  },
  userChatBubble: {
    backgroundColor: "#f5f5f5",
    color: "black",
  },
  text: {
    fontSize: "14px",
    fontWeight: "normal",
  },
};

const lastSeenAvatarStyles: LastSeenAvatarStyles = {
  container: {
    boxShadow: "#cacaca 0px 0px 10px 0px, rgb(187 187 187) 0px 0px 2px 0",
    backgroundColor: "white",
    overflow: "hidden",
  },
};

const avatarStyles: AvatarStyles = {
  container: {
    backgroundColor: "white",
    overflow: "hidden",
  },
};

const style: React.CSSProperties = {
  backgroundColor: "#fff",
  height: "calc(100% - 100px)",
};

interface IChatState {
  authors: Author<string>[];
  messages: Message<string>[];
  useCustomBubble: boolean;
  currentUser: number;
  messageText: string;
  showAvatar: boolean;
  showLastSeen: boolean;
  showDateRow: boolean;
  showIsTyping: boolean;
  showLoadingMessages: boolean;
  hasOldMessages: boolean;
  useCustomStyles: boolean;
  useAvatarBg: boolean;
  useCustomIsTyping: boolean;
  showMsgProgress: boolean;
  chatDisabled: boolean;
  replyedMessage: string | null;
}

// Define the CustomChatBubble component outside of ChatBox
const CustomChatBubble = (props: any) => {
  const { message, author, currentUser } = props;
  const isUser = author.id === currentUser;

  return (
    <div
      className={`flex flex-col mb-4 ${isUser ? "items-end" : "items-start"}`}
    >
      <div className="bg-[#f5f5f5] rounded-xl p-3 w-full relative">
        <div className="w-full flex gap-4 mb-1">
          <div className="flex flex-none items-start gap-2">
            {author.bgImageUrl && (
              <Image
                src={author.bgImageUrl}
                alt={author.name}
                className="rounded-full object-cover"
                width={24}
                height={24}
              />
            )}
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium">{author.name}</span>
              <span className="text-xs text-gray-500 mr-auto">
                {FaDateFromTimestamp(message.createdOn)}
              </span>
            </div>
            <p className="text-sm">{message.message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ChatBox = () => {
  const chat = React.useRef<any>();
  const selectedDocument = useRecoilValue(selectedDocumentAtom);
  const [permissionError, setPermissionError] = useState(false);
  const [enabledThreadId, setEnabledThreadId] = useState(
    selectedDocument?.chatThreadId
  );
  const chatAgentRef = React.useRef<any>(null);
  const { data: userInfo } = useGetUser();
  const enableChatHook = useEnableDocChat();
  let currentAuthorId = -1;

  const [chatState, setState] = useState<IChatState>({
    authors: [
      {
        id: 1,
        name: "محمد شاکری",
        isTyping: false,
        lastSeenMessageId: 1,
        bgImageUrl:
          "https://podspace.pod.ir/api/links/RTM324KYGFCP89D1GZOGRNX12US9GIEAH229SD7ISKDGFNCKJF#FAZHI25MNNB6B624",
      },
    ],
    messages: [
      {
        id: 1,
        authorId: 1,
        message: "سلام",
        createdOn: new Date(),
        isSend: true,
      },
      {
        id: 2,
        authorId: 1,
        message: "سلام",
        createdOn: new Date(),
        isSend: false,
      },
    ],
    chatDisabled: false,
    useCustomBubble: true,
    currentUser: currentAuthorId,
    messageText: "",
    showAvatar: true,
    showDateRow: true,
    showLastSeen: true,
    showIsTyping: false,
    showLoadingMessages: true,
    hasOldMessages: true,
    useCustomStyles: true,
    useAvatarBg: true,
    useCustomIsTyping: false,
    showMsgProgress: false,
    replyedMessage: null,
  });

  const renderCustomBubble = React.useCallback(
    (props: any) => {
      return (
        <CustomChatBubble {...props} currentUser={chatState.currentUser} />
      );
    },
    [chatState.currentUser]
  );

  const onMessageChange = (e: any) => {
    setState((previousState) => {
      return {
        ...previousState,
        messageText: e.target.value,
      };
    });
  };

  const getThreadParticipants = async () => {
    chatAgentRef.current.getThreadParticipants(
      {
        threadId: enabledThreadId,
      },
      (participantResult: any) => {
        if (!participantResult.hasError) {
          const authorsList = participantResult.result.participants;
          const currentAuthorInfo = authorsList.find((author: any) => {
            return author.username === userInfo?.username;
          });
          currentAuthorId = currentAuthorInfo
            ? currentAuthorInfo.id
            : currentAuthorId;

          setState((previousState) => {
            return {
              ...previousState,
              currentUser: currentAuthorId,
              authors: authorsList.map((authorInfo: any) => {
                return {
                  id: authorInfo.id,
                  name: authorInfo.name,
                  bgImageUrl: authorInfo.image,
                  isTypingMessage: "",
                } as Author<string>;
              }),
            };
          });
        }
      }
    );
  };

  const getHistory = (offset: number) => {
    if (chatAgentRef.current) {
      const historyCount = 10;
      chatAgentRef.current.getHistory(
        {
          count: historyCount,
          offset,
          threadId: enabledThreadId,
        },
        (historyResult: any) => {
          const { history } = historyResult.result;
          if (history.length) {
            setState((previousState) => {
              return {
                ...previousState,
                messages: [
                  ...history
                    .map((messageInfo: any) => {
                      return {
                        id: messageInfo.id,
                        createdOn: new Date(messageInfo.timeMiliSeconds),
                        message: messageInfo.message,
                        authorId: messageInfo.ownerId,
                        isSend: true,
                        participant: messageInfo.participant,
                        editable: messageInfo.editable,
                        deletable: messageInfo.deletable,
                        replyInfo: messageInfo.replyInfo || null,
                      };
                    })
                    .reverse(),
                  ...previousState.messages,
                ],
              };
            });
            if (offset === 0 && history[0].ownerId !== currentAuthorId) {
              chatAgentRef.current.seen({
                messageId: history[0].id,
                ownerId: history[0].ownerId,
              });
            }
          } else {
            setState((previousState) => {
              return {
                ...previousState,
                hasOldMessages: false,
              };
            });
          }
        }
      );
    }
  };

  const onMessageSubmit = (e: any) => {
    e.preventDefault();
    if (chatState.messageText !== "") {
      chatAgentRef.current.sendTextMessage(
        {
          threadId: enabledThreadId,
          textMessage: chatState.messageText,
          messageType: "TEXT",
        },
        {
          onSent: () => {
            setState((previousState: any) => {
              return {
                ...previousState,
                messageText: "",
                authors: [...previousState.authors].map((a) => {
                  return a.id === chatState.currentUser
                    ? a
                    : {
                        ...a,
                        isTypingMessage: "",
                      };
                }),
              };
            });
            if (chat.current?.onMessageSend) {
              chat.current.onMessageSend();
            }
          },
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onDeliver: () => {},
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onSeen: () => {},
        }
      );
    }
  };

  const getChatMessageEvents = () => {
    chatAgentRef.current.on("messageEvents", (res: any) => {
      switch (res.type) {
        case "MESSAGE_NEW":
          if (enabledThreadId === res.result.message.threadId) {
            setState((previousState: any) => {
              return {
                ...previousState,
                // eslint-disable-next-line unicorn/prefer-array-some
                messages: previousState.messages.find((message: any) => {
                  return message?.id === res.result.message.id;
                })
                  ? previousState.messages
                  : [
                      ...previousState.messages,
                      {
                        id: res.result.message.id,
                        createdOn: new Date(res.result.message.timeMiliSeconds),
                        message: res.result.message.message,
                        authorId: res.result.message.ownerId,
                        isSend: true,
                        participant: res.result.message.participant,
                        editable: res.result.message.editable,
                        deletable: res.result.message.deletable,
                        replyInfo: res.result.message.replyInfo || null,
                      },
                    ],
              };
            });
            if (
              res.result.message.ownerId !== currentAuthorId &&
              res.result.message.conversation.lastSeenMessageId <
                res.result.message.id
            ) {
              chatAgentRef.current.seen({
                messageId: res.result.message.id,
                ownerId: res.result.message.ownerId,
              });
            }
          }
          break;
        default:
          console.log("Message not supported");
      }
    });
  };

  const handleError = () => {
    chatAgentRef.current.on("error", (error: IChatError) => {
      if (error.code === 111) {
        setPermissionError(true);
      }
    });
  };

  const getChat = async () => {
    try {
      await Chat.getInstance().check();
      chatAgentRef.current = Chat.getInstance().chatAgent;
      await getThreadParticipants();
      getHistory(0);
      getChatMessageEvents();
      handleError();
    } catch {
      console.log(">>>>>>>>>>>>>>>>>>>> error in getChat");
    }
  };

  const enableChat = () => {
    if (!selectedDocument?.repoId || !selectedDocument?.id) return;

    const { repoId, id: docId } = selectedDocument;

    enableChatHook.mutate({
      repoId,
      docId,
      callBack: (threadId) => {
        setEnabledThreadId(threadId);
        toast.success("چت با موفقیت برای این سند فعال شد");
      },
    });
  };

  useEffect(() => {
    if (enabledThreadId) {
      getChat();
    }
  }, [enabledThreadId]);

  if (!enabledThreadId) {
    return (
      <div className="h-full flex items-end px-6 py-4">
        <LoadingButton
          className="!w-full bg-purple-normal hover:bg-purple-normal active:bg-purple-normal"
          onClick={enableChat}
          loading={enableChatHook.isPending}
        >
          <Typography className="text__label__button text-white">
            فعالسازی چت
          </Typography>
        </LoadingButton>
      </div>
    );
  }

  if (permissionError) {
    return (
      <div className="h-full flex items-end px-6 py-4">
        <LoadingButton
          className="!w-full bg-purple-normal hover:bg-purple-normal active:bg-purple-normal"
          onClick={enableChat}
          loading={enableChatHook.isPending}
        >
          <Typography className="text__label__button text-white">
            خطایی رخ داد. تلاش مجدد
          </Typography>
        </LoadingButton>
      </div>
    );
  }

  return (
    <div className="chat-body h-full flex flex-col">
      <ChatFeed
        ref={chat}
        yourAuthorId={chatState.currentUser}
        messages={chatState.messages}
        authors={chatState.authors}
        style={style}
        avatarStyles={avatarStyles}
        showRecipientAvatar={false}
        showRecipientLastSeenMessage={false}
        showIsTyping={chatState.showIsTyping}
        showLoadingMessages={chatState.showLoadingMessages}
        lastSeenAvatarStyles={lastSeenAvatarStyles}
        chatBubbleStyles={chatBubbleStyles}
        maxHeight="100%"
        CustomChatBubble={renderCustomBubble}
        showDateRow={chatState.showDateRow}
        hasOldMessages={chatState.hasOldMessages}
      />
      <form
        onSubmit={(e) => {
          return onMessageSubmit(e);
        }}
        className="comment-create gap-2 justify-center items-center rounded-lg !w-[300px] left-0 bg-white shadow-lg md:shadow-none z-[9999]"
      >
        <div className="flex flex-col h-full">
          <div className="px-4 py-3 flex flex-grow flex-col gap-4 justify-end">
            <div className="border-b-[1px] border-normal" />
            <div className="flex items-center gap-2 !h-12 pr-3 pl-2 !bg-gray-50 border-[1px] !border-normal rounded-lg">
              <InputAtom
                value={chatState.messageText}
                onChange={onMessageChange}
                placeholder="نظر خود را بنویسید."
                className="!w-auto h-auto overflow-hidden !p-0 border-none"
              />
              <LoadingButton
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                onClick={(e) => {
                  return onMessageSubmit(e);
                }}
                className="!h-8 !bg-white !w-[70px] !rounded-sm shadow-none hover:shadow-none hover:bg-white"
                isPrimary
              >
                <Typography className="text__label__button !text-primary px-3 font-medium">
                  ارسال
                </Typography>
              </LoadingButton>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatBox;
