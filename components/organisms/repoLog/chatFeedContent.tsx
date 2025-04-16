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
  };
  chatRef: React.RefObject<ChatFeed<string>>;
  containerRef: React.RefObject<HTMLDivElement>;
  renderCustomChatBubble: (props: ChatBubbleProps<string, Message<string>, Author<string>>) => JSX.Element;
  isMobile: boolean;
}

const ChatFeedContent = ({
  handleClose,
  chatState,
  chatRef,
  containerRef,
  renderCustomChatBubble,
  isMobile
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
      <CardHeader className="m-0 p-4 flex justify-between rounded-none shadow-none" floated={false}>
        <Typography className="form__title">فعالیت ها</Typography>
        <CloseButton onClose={handleClose} />
      </CardHeader>
      <CardBody className="p-0 flex-grow overflow-hidden">
        <div className="chat-log flex h-full flex-col" ref={containerRef}>
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
            />
          ) : (
            <Typography className="text-center">هیچ تغییری یافت نشد</Typography>
          )}
        </div>
      </CardBody>
    </>
  );
};

export default ChatFeedContent; 