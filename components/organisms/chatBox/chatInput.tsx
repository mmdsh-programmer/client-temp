import React from "react";
import { Typography } from "@material-tailwind/react";
import InputAtom from "@components/atoms/input";
import LoadingButton from "@components/molecules/loadingButton";
import { IChatInputProps } from "./types";

const ChatInput: React.FC<IChatInputProps> = ({
  messageText,
  onMessageChange,
  onMessageSubmit,
}) => {
  return (
    <form
      onSubmit={onMessageSubmit}
      className="comment-create gap-2 justify-center items-center rounded-lg !w-[300px] left-0 bg-white shadow-lg md:shadow-none z-[9999]"
    >
      <div className="flex flex-col h-full">
        <div className="px-4 py-3 flex flex-grow flex-col gap-4 justify-end">
          <div className="border-b-[1px] border-normal" />
          <div className="flex items-center gap-2 !h-12 pr-3 pl-2 !bg-gray-50 border-[1px] !border-normal rounded-lg">
            <InputAtom
              value={messageText}
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
  );
};

export default ChatInput;
