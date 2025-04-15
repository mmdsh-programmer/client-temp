import { ChatBubbleStyles, LastSeenAvatarStyles, AvatarStyles } from "react-bell-chat";

export const chatBubbleStyles: ChatBubbleStyles = {
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

export const lastSeenAvatarStyles: LastSeenAvatarStyles = {
  container: {
    boxShadow: "#cacaca 0px 0px 10px 0px, rgb(187 187 187) 0px 0px 2px 0",
    backgroundColor: "white",
    overflow: "hidden",
  },
};

export const avatarStyles: AvatarStyles = {
  container: {
    backgroundColor: "white",
    overflow: "hidden",
  },
};

export const chatFeedStyle: React.CSSProperties = {
  backgroundColor: "#fff",
  height: "calc(100% - 100px)",
}; 