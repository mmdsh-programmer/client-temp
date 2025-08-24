import React, { useEffect, useRef, useState } from "react";
import { Author, ChatBubbleProps, ChatFeed, Message } from "react-bell-chat";
import Chat from "@utils/chatAgent";
import useGetUser from "@hooks/auth/useGetUser";
import { toast } from "react-toastify";
import useEnableRepoChat from "@hooks/chat/useEnableRepoChat";
import ChatLogBubble from "./chatLogBubble";
import useWindowSize from "@hooks/useWindowSize";
import ChatMobileRepoLog from "./chatMobile";
import ChatDesktopRepoLog from "./chatDesktop";
import { IRepo } from "@interface/repo.interface";
import {
  IHistoryResult,
  IMessageType,
  IThreadParams,
  IParticipantResult,
  ChatState,
} from "@interface/chat.interface";
import { useRepoActivityStore, useRepositoryStore } from "@store/repository";

// Define breakpoint for mobile/tablet
const MOBILE_BREAKPOINT = 768;

// Define MessageEvent type for chat message events
interface MessageEvent {
  type: string;
  result: {
    message: {
      id: number;
      threadId: number;
      timeMiliSeconds: number;
      message: string;
      ownerId: number;
      participant: Record<string, unknown>;
      editable: boolean;
      deletable: boolean;
      replyInfo?: Record<string, unknown> | null;
      conversation: {
        lastSeenMessageId: number;
      };
    };
  };
}

// Define error event type
interface ErrorEvent {
  code: number;
}

type ChatAgentType = {
  getThreadParticipants: (
    params: IThreadParams,
    callback: (result: IParticipantResult) => void,
  ) => void;
  getHistory: (
    params: IThreadParams & { count: number; offset: number },
    callback: (result: IHistoryResult) => void,
  ) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  on: (eventName: string, callback: (response: any) => void) => void;
  seen?: (params: { messageId: number; ownerId: number }) => void;
};

export interface RepoLogProps {
  showRepoActivity: boolean;
  setShowRepoActivity: (show: boolean) => void;
  selectedRepo: IRepo | null;
  setRepo: (repo: IRepo | null) => void;
  userInfo: { access_token?: string; userId?: number; username?: string } | undefined;
  chatState: ChatState;
  setChatState: React.Dispatch<React.SetStateAction<ChatState>>;
  chatRef: React.RefObject<ChatFeed<string>>;
  containerRef: React.RefObject<HTMLDivElement>;
  userCanAccessChat: boolean;
  permissionError: boolean;
  enableChatHook: ReturnType<typeof useEnableRepoChat>;
  enableChat: () => void;
  loadChatData: (threadId?: number) => void;
  renderCustomChatBubble: (
    props: ChatBubbleProps<string, Message<string>, Author<string>>,
  ) => JSX.Element;
  handleClose: () => void;
  isCheckingAccess: boolean;
  handleScroll: (e: React.UIEvent<HTMLDivElement>) => void;
  isLoadingMore: boolean;
}

const RepoLog = () => {
  const { showRepoActivity, setShowRepoActivity } = useRepoActivityStore();
  const selectedRepo = useRepositoryStore((state) => {
    return state.repo;
  });
  const setRepo = useRepositoryStore((state) => {
    return state.setRepo;
  });
  const { data: userInfo } = useGetUser();
  const chat = useRef<ChatFeed<string>>(null);
  const chatAgentRef = useRef<ChatAgentType | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  let currentAuthorId = -1;
  const enableChatHook = useEnableRepoChat();
  const [userCanAccessChat, setUserCanAccessChat] = useState<boolean>(false);
  const [permissionError, setPermissionError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isCheckingAccess, setIsCheckingAccess] = useState(false);
  const [messageOffset, setMessageOffset] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const { width } = useWindowSize();

  const [chatState, setChatState] = useState<ChatState>({
    authors: [],
    messages: [],
    currentUser: currentAuthorId,
    showAvatar: true,
    showDateRow: true,
    showIsTyping: false,
    showLoadingMessages: true,
    hasOldMessages: true,
  });

  // Update isMobile state when window size changes
  useEffect(() => {
    if (width) {
      setIsMobile(width < MOBILE_BREAKPOINT);
    }
  }, [width]);

  const handleClose = () => {
    setShowRepoActivity(false);
  };

  const getThreadParticipants = async (threadId: number) => {
    if (!chatAgentRef.current) return;

    chatAgentRef.current.getThreadParticipants(
      {
        threadId,
      },
      (participantResult: IParticipantResult) => {
        if (!participantResult.hasError) {
          const authorsList = participantResult.result.participants;
          const currentAuthorInfo = authorsList.find((author) => {
            return author.username === userInfo?.username;
          });
          currentAuthorId = currentAuthorInfo ? currentAuthorInfo.id : currentAuthorId;

          setChatState((previousState) => {
            return {
              ...previousState,
              currentUser: currentAuthorId,
              authors: authorsList.map((authorInfo) => {
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
      },
    );
  };

  const getHistory = (threadId: number) => {
    if (chatAgentRef.current) {
      const historyCount = 20; // Show more messages in the log
      chatAgentRef.current.getHistory(
        {
          count: historyCount,
          offset: 0,
          threadId,
        },
        (historyResult: IHistoryResult) => {
          const { history } = historyResult.result;
          if (history.length) {
            setChatState((previousState) => {
              return {
                ...previousState,
                messages: [
                  ...history.map((messageInfo) => {
                    return {
                      id: messageInfo.id,
                      createdOn: new Date(messageInfo.timeMiliSeconds),
                      message: messageInfo.message,
                      authorId: messageInfo.ownerId,
                      isSend: true,
                      participant: messageInfo.participant,
                      editable: false, // Disable editing in log view
                      deletable: false, // Disable deletion in log view
                      replyInfo: messageInfo.replyInfo || null,
                    } as IMessageType;
                  }),
                ],
                hasOldMessages: history.length >= historyCount, // If we got a full page, there might be more
              };
            });
            setMessageOffset(history.length);
            if (
              history.length > 0 &&
              history[0].ownerId !== currentAuthorId &&
              chatAgentRef.current?.seen
            ) {
              // Mark message as seen if it's not from current user
              chatAgentRef.current.seen({
                messageId: history[0].id,
                ownerId: history[0].ownerId,
              });
            }
          } else {
            setChatState((previousState) => {
              return {
                ...previousState,
                hasOldMessages: false,
              };
            });
          }
        },
      );
    }
  };

  const loadMoreMessages = () => {
    if (chatAgentRef.current && selectedRepo?.chatThreadId && !isLoadingMore) {
      setIsLoadingMore(true);
      const historyCount = 20;
      chatAgentRef.current.getHistory(
        {
          count: historyCount,
          offset: messageOffset,
          threadId: selectedRepo.chatThreadId,
        },
        (historyResult: IHistoryResult) => {
          const { history } = historyResult.result;
          if (history.length) {
            setChatState((previousState) => {
              return {
                ...previousState,
                messages: [
                  ...previousState.messages,
                  ...history.map((messageInfo) => {
                    return {
                      id: messageInfo.id,
                      createdOn: new Date(messageInfo.timeMiliSeconds),
                      message: messageInfo.message,
                      authorId: messageInfo.ownerId,
                      isSend: true,
                      participant: messageInfo.participant,
                      editable: false, // Disable editing in log view
                      deletable: false, // Disable deletion in log view
                      replyInfo: messageInfo.replyInfo || null,
                    } as IMessageType;
                  }),
                ],
                hasOldMessages: history.length >= historyCount, // There are more messages if we filled the page
              };
            });
            setMessageOffset((prevOffset) => {
              return prevOffset + history.length;
            });
          } else {
            setChatState((previousState) => {
              return {
                ...previousState,
                hasOldMessages: false,
              };
            });
          }
          setIsLoadingMore(false);
        },
      );
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    // If we're at the bottom of the scroll and have more messages to load
    if (
      scrollHeight - scrollTop - clientHeight < 100 &&
      chatState.hasOldMessages &&
      !isLoadingMore
    ) {
      loadMoreMessages();
    }
  };

  const getChatMessageEvents = () => {
    if (!chatAgentRef.current) return;

    try {
      chatAgentRef.current.on("messageEvents", (res: MessageEvent) => {
        if (!res || !res.type || !res.result || !res.result.message) return;

        switch (res.type) {
          case "MESSAGE_NEW":
            if (selectedRepo?.chatThreadId === res.result.message.threadId) {
              setChatState((previousState) => {
                // Check if the message already exists in the state
                return {
                  ...previousState,
                  messages: previousState.messages.find((message) => {
                    return message?.id === res.result.message.id;
                  })
                    ? previousState.messages
                    : [
                        {
                          id: res.result.message.id,
                          createdOn: new Date(res.result.message.timeMiliSeconds),
                          message: res.result.message.message,
                          authorId: res.result.message.ownerId,
                          isSend: true,
                          participant: res.result.message.participant,
                          editable: false, // Disable editing in log view
                          deletable: false, // Disable deletion in log view
                          replyInfo: res.result.message.replyInfo || null,
                        } as IMessageType,
                        ...previousState.messages,
                      ],
                };
              });

              // Mark message as seen if it's not from current user
              if (
                res.result.message.ownerId !== currentAuthorId &&
                res.result.message.conversation &&
                res.result.message.conversation.lastSeenMessageId < res.result.message.id &&
                chatAgentRef.current?.seen
              ) {
                chatAgentRef.current.seen({
                  messageId: res.result.message.id,
                  ownerId: res.result.message.ownerId,
                });
              }
            }
            break;
          case "MESSAGE_EDIT":
            // Update edited message
            if (selectedRepo?.chatThreadId === res.result.message.threadId) {
              setChatState((previousState) => {
                return {
                  ...previousState,
                  messages: previousState.messages.map((message) => {
                    if (message.id === res.result.message.id) {
                      return {
                        ...message,
                        message: res.result.message.message,
                      };
                    }
                    return message;
                  }),
                };
              });
            }
            break;
          case "MESSAGE_DELETE":
            // Remove deleted message
            if (selectedRepo?.chatThreadId === res.result.message.threadId) {
              setChatState((previousState) => {
                return {
                  ...previousState,
                  messages: previousState.messages.filter((message) => {
                    return message.id !== res.result.message.id;
                  }),
                };
              });
            }
            break;
          default:
            // Unsupported message type
            break;
        }
      });
    } catch (error) {
      console.error("Error setting up message event listener:", error);
    }
  };

  const handleError = () => {
    if (!chatAgentRef.current) return;

    try {
      chatAgentRef.current.on("error", (error: ErrorEvent) => {
        if (error.code === 111) {
          setPermissionError(true);
        }
      });
    } catch (error) {
      console.error("Error setting up error listener:", error);
    }
  };

  const loadChatData = async (threadId?: number) => {
    try {
      setIsCheckingAccess(true);
      const chatThreadId = threadId || selectedRepo?.chatThreadId;
      if (!chatThreadId) {
        setIsCheckingAccess(false);
        return;
      }

      await Chat.getInstance().check({
        token: userInfo?.access_token || "",
      });

      chatAgentRef.current = Chat.getInstance().chatAgent;
      await getThreadParticipants(chatThreadId);
      getHistory(chatThreadId);
      getChatMessageEvents(); // Start listening for new messages
      handleError();
      setUserCanAccessChat(true);
    } catch (error) {
      console.error("Error loading chat data for logs:", error);
    } finally {
      setIsCheckingAccess(false);
    }
  };

  const checkUserAccess = async () => {
    try {
      setIsCheckingAccess(true);
      if (!selectedRepo?.chatThreadId) {
        setIsCheckingAccess(false);
        return;
      }

      await Chat.getInstance().check({
        token: userInfo?.access_token || "",
      });

      chatAgentRef.current = Chat.getInstance().chatAgent;

      const isParticipant = await Chat.getInstance().isUserInThread(
        selectedRepo.chatThreadId as number,
        userInfo?.userId as number,
      );

      if (isParticipant) {
        setUserCanAccessChat(true);
        loadChatData();
      } else {
        setIsCheckingAccess(false);
      }
    } catch (error) {
      console.error("Error checking user access:", error);
      setIsCheckingAccess(false);
    }
  };

  const enableChat = () => {
    if (!selectedRepo?.id) return;

    enableChatHook.mutate({
      repoId: selectedRepo.id,
      callBack: (chatThreadId) => {
        if (chatThreadId && selectedRepo) {
          // Update the repo state with the new chatThreadId
          setRepo({
            ...selectedRepo,
            chatThreadId,
          });

          // Load chat data with the new threadId
          loadChatData(chatThreadId);
          setUserCanAccessChat(true);
          toast.success("چت با موفقیت برای این مخزن فعال شد");
        }
      },
    });
  };

  const renderCustomChatBubble = (
    props: ChatBubbleProps<string, Message<string>, Author<string>>,
  ) => {
    return <ChatLogBubble {...props} currentUser={chatState.currentUser} />;
  };

  useEffect(() => {
    if (showRepoActivity && selectedRepo?.chatThreadId) {
      checkUserAccess();
    }
  }, [showRepoActivity, selectedRepo?.chatThreadId]);

  if (!showRepoActivity) return null;

  const props: RepoLogProps = {
    showRepoActivity,
    setShowRepoActivity,
    selectedRepo,
    setRepo,
    userInfo,
    chatState,
    setChatState,
    chatRef: chat,
    containerRef,
    userCanAccessChat,
    permissionError,
    enableChatHook,
    enableChat,
    loadChatData,
    renderCustomChatBubble,
    handleClose,
    isCheckingAccess,
    handleScroll,
    isLoadingMore,
  };

  return isMobile ? <ChatMobileRepoLog {...props} /> : <ChatDesktopRepoLog {...props} />;
};

export default RepoLog;
