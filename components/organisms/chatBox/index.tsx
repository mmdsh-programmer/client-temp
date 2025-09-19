/* eslint-disable @typescript-eslint/no-explicit-any */

import { Author, ChatFeed } from "react-bell-chat";
import { IChatError, IChatState } from "@interface/chat.interface";
import React, { useEffect, useRef, useState } from "react";
import {
  avatarStyles,
  chatBubbleStyles,
  chatFeedStyle,
  lastSeenAvatarStyles,
} from "./styles";
import Chat from "@utils/chatAgent";
import ChatBubble from "./chatBubble";
import ChatInput from "./chatInput";
import LoadingButton from "@components/molecules/loadingButton";
import { Typography } from "@material-tailwind/react";
import { useDocumentStore } from "@store/document";
import { toast } from "react-toastify";
import useEnableDocChat from "@hooks/chat/useEnableDocChat";
import useGetUser from "@hooks/auth/useGetUser";

const ChatBox = () => {
  const chat = React.useRef<any>(null);
  const selectedDocument = useDocumentStore((s) => {
    return s.selectedDocument;
  });
  const [permissionError, setPermissionError] = useState(false);
  const [enabledThreadId, setEnabledThreadId] = useState(
    selectedDocument?.chatThreadId
  );
  const chatAgentRef = React.useRef<any>(null);
  const { data: userInfo } = useGetUser();
  const enableChatHook = useEnableDocChat();
  let currentAuthorId = -1;

  const [chatState, setState] = useState<IChatState>({
    authors: [],
    messages: [],
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

  const containerRef = useRef<HTMLDivElement>(null);
  const inputAreaRef = useRef<HTMLDivElement>(null);

  const [userCanAccessChat, setUserCanAccessChat] = useState<boolean>(false);

  const renderCustomBubble = React.useCallback(
    (props: any) => {
      return <ChatBubble {...props} currentUser={chatState.currentUser} />;
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

  const onMessageSubmit = (e: React.FormEvent) => {
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
            setState((previousState) => {
              return {
                ...previousState,
                messageText: "",
                authors: previousState.authors.map((a) => {
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
          onDeliver: () => {},
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
            setState((previousState) => {
              return {
                ...previousState,
                messages: previousState.messages.find((message) => {
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
      await Chat.getInstance().check({
        token: userInfo?.access_token || "",
      });
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
        setUserCanAccessChat(true);
        getChat();
        toast.success("چت با موفقیت برای این سند فعال شد");
      },
    });
  };

  const checkUserAccess = async () => {
    try {
      await Chat.getInstance().check({
        token: userInfo?.access_token || "",
      });
      chatAgentRef.current = Chat.getInstance().chatAgent;
      
      const isParticipant = await Chat.getInstance().isUserInThread(
        enabledThreadId as number,
        userInfo?.userId as number
      );
      
      if (isParticipant) {
        setUserCanAccessChat(true);
        getChat();
      }
    } catch {
      console.log(">>>>>>>>>>>>>>>>>>>> error in checking user access");
    }
  };

  useEffect(() => {
    if (enabledThreadId) {
      checkUserAccess();
    }
  }, [enabledThreadId]);

  if (!enabledThreadId || !userCanAccessChat) {
    return (
      <div className="h-full flex items-end px-6 py-4">
        <LoadingButton
          className="!w-full bg-primary-normal hover:bg-primary-normal active:bg-primary-normal"
          onClick={enableChat}
          loading={enableChatHook.isPending}
        >
          <Typography
            placeholder=""
            className="text__label__button text-white"
            {...({} as  Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
          >
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
          className="!w-full bg-primary-normal hover:bg-primary-normal active:bg-primary-normal"
          onClick={enableChat}
          loading={enableChatHook.isPending}
        >
          <Typography
            placeholder=""
            className="text__label__button text-white"
            {...({} as  Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
          >
            خطایی رخ داد. تلاش مجدد
          </Typography>
        </LoadingButton>
      </div>
    );
  }

  return (
    <div className="chat-body h-full flex flex-col" ref={containerRef}>
      <ChatFeed
        ref={chat}
        yourAuthorId={chatState.currentUser}
        authors={chatState.authors}
        messages={chatState.messages}
        style={{
          ...chatFeedStyle,
          overflow: "auto",
          height: "calc(100vh - 300px)",
        }}
        avatarStyles={avatarStyles}
        showRecipientAvatar={false}
        showRecipientLastSeenMessage={false}
        showIsTyping={chatState.showIsTyping}
        showLoadingMessages={chatState.showLoadingMessages}
        lastSeenAvatarStyles={lastSeenAvatarStyles}
        chatBubbleStyles={chatBubbleStyles}
        CustomChatBubble={renderCustomBubble}
        showDateRow={chatState.showDateRow}
        hasOldMessages={chatState.hasOldMessages}
      />
      <div ref={inputAreaRef}>
        <ChatInput
          messageText={chatState.messageText}
          onMessageChange={onMessageChange}
          onMessageSubmit={onMessageSubmit}
        />
      </div>
    </div>
  );
};

export default ChatBox;
