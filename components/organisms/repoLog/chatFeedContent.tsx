import React from "react";
import { CardBody, CardHeader, Typography } from "@material-tailwind/react";
import CloseButton from "@components/atoms/button/closeButton";
import { ChatFeed, Author, Message, ChatBubbleProps } from "react-bell-chat";
import {
  avatarStyles,
  chatBubbleStyles,
  chatFeedStyle,
  lastSeenAvatarStyles,
} from "../chatBox/styles";

interface IProps {
  handleClose: () => void;
  chatState: {
    authors: Author<string>[];
    messages: Message<string>[];
    currentUser: number;
    hasOldMessages: boolean;
  };
  chatRef: React.RefObject<ChatFeed<string, Message<string>, Author<string>> | null>;
  containerRef: React.RefObject<HTMLDivElement | null>;
  renderCustomChatBubble: (props: ChatBubbleProps<string, Message<string>, Author<string>>) => React.JSX.Element;
  isMobile: boolean;
  handleScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
  isLoadingMore?: boolean;
}

const ChatFeedContent = ({
  handleClose,
  chatState,
  chatRef,
  containerRef,
  renderCustomChatBubble,
  isMobile,
  handleScroll,
  isLoadingMore
}: IProps) => {
  // Configure styles based on mobile or desktop
  const feedStyle = {
    ...chatFeedStyle,
    overflow: "auto",
    height: isMobile ? "55vh" : "100%",
    maxHeight: isMobile ? "55vh" : "calc(100vh - 120px)",
    minHeight: isMobile ? "250px" : "auto",
  };

  return (
    <>
      <CardHeader {...({} as React.ComponentProps<typeof CardHeader>)} className="m-0 p-4 flex justify-between rounded-none shadow-none" floated={false}>
        <Typography {...({} as React.ComponentProps<typeof Typography>)} className="form__title">فعالیت ها</Typography>
        <CloseButton onClose={handleClose} />
      </CardHeader>
      <CardBody {...({} as React.ComponentProps<typeof CardBody>)} className="p-0 flex-grow overflow-hidden">
        <div 
          className="chat-log flex h-full flex-col" 
          ref={containerRef}
          onScroll={handleScroll}
        >
          {isLoadingMore && chatState.hasOldMessages && (
            <div className="text-center py-2">
              <Typography {...({} as React.ComponentProps<typeof Typography>)} className="text-sm">در حال بارگذاری پیام‌های بیشتر...</Typography>
            </div>
          )}
          {chatState.messages.length > 0 ? (
            <ChatFeed
              ref={chatRef}
              yourAuthorId={chatState.currentUser}
              authors={chatState.authors}
              messages={chatState.messages}
              style={feedStyle}
              avatarStyles={avatarStyles}
              lastSeenAvatarStyles={lastSeenAvatarStyles}
              chatBubbleStyles={chatBubbleStyles}
              CustomChatBubble={renderCustomChatBubble}
              hasOldMessages={chatState.hasOldMessages}
            />
          ) : (
            <Typography {...({} as React.ComponentProps<typeof Typography>)} className="text-center">هیچ تغییری یافت نشد</Typography>
          )}
        </div>
      </CardBody>
    </>
  );
};

export default ChatFeedContent; 