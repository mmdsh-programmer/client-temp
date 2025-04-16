import React from "react";
import Image from "next/image";
import { FaDateFromTimestamp } from "@utils/index";
import { IRepoLogBubbleProps } from "@interface/chat.interface";

const ChatBubble = ({ message, author, currentUser }: IRepoLogBubbleProps) => {
  const isUser = author.id === currentUser;
  const timestamp =
    message.createdOn instanceof Date
      ? message.createdOn.getTime()
      : Date.now();

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
              <span
                className="text-xs font-medium ml-2 overflow-hidden text-ellipsis whitespace-nowrap max-w-[100px]"
                title={author.name}
              >
                {author.name}
              </span>
              <span
                className="text-xs text-gray-500 mr-auto overflow-hidden text-ellipsis whitespace-nowrap max-w-[100px]"
                title={FaDateFromTimestamp(timestamp)}
              >
                {FaDateFromTimestamp(timestamp)}
              </span>
            </div>
            <p className="text-sm">{message.message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
