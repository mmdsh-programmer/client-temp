import React from "react";
import Image from "next/image";
import { IRepoLogBubbleProps } from "@interface/chat.interface";
import { formatTimeAgo } from "@utils/index";

interface IProps extends Omit<IRepoLogBubbleProps, "author"> {
  author?: IRepoLogBubbleProps["author"];
}

const ChatLogBubble = ({ message: messageProps, author, currentUser }: IProps) => {
  const isUser = author?.id === currentUser;
  const timestamp = messageProps.createdOn;
  let parsedContent;
  try {
    parsedContent =
      typeof messageProps.message === "string"
        ? JSON.parse(messageProps.message)
        : messageProps.message;
  } catch {
    parsedContent = { message: messageProps.message, action: "", user: null };
  }
  const { message, action, user } = parsedContent;

  return (
    <div
      className={`flex flex-col border-b border-gray-200 px-4 py-5 ${isUser ? "items-end" : "items-start"}`}
    >
      <div className="relative w-full">
        <div className="w-full">
          <div className="flex flex-none items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 overflow-hidden rounded-full">
                <Image
                  src={user?.img || "/no-image.jpg"}
                  alt={author?.name || ""}
                  className="h-full w-full rounded-full object-cover"
                  width={32}
                  height={32}
                  style={{ borderRadius: "9999px" }}
                />
              </div>
              <p
                className="max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap text-sm"
                title={action}
              >
                {action}
              </p>
            </div>

            <span
              className="mr-auto max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap text-xs text-gray-400"
              title={timestamp ? timestamp.toLocaleString() : ""}
            >
              {timestamp ? formatTimeAgo(timestamp) : ""}
            </span>
          </div>

          <p className="mt-2.5 text-sm font-light leading-snug text-gray-500">
            {message?.length ? message : "بدون متن"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatLogBubble;
