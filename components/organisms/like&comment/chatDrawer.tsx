import React from "react";
import { Typography } from "@material-tailwind/react";
import LoadingButton from "@components/molecules/loadingButton";
import InputAtom from "@components/atoms/input";

const ChatDrawer = () => {
  return (
    <div className="absolute md:relative !w-[300px] left-0 bg-white shadow-lg md:shadow-none z-[9999] h-full">
      <div className="flex flex-col h-full">
        <div className="px-4 h-[60px] flex items-center">
          <Typography className="title_t4 !text-primary">گفتگو </Typography>
        </div>
        <div className="border-b-[1px] border-normal" />
        <div className="px-4 py-3 flex flex-grow flex-col justify-end">
          <div className="flex items-center gap-2 !h-12 pr-3 pl-2 !bg-gray-50 border-[1px] !border-normal rounded-lg">
            <InputAtom
              id="username"
              className="!w-auto h-auto overflow-hidden !p-0 border-none"
              placeholder="نظر خود را بنویسید."
            />
            <LoadingButton
              loading={false}
              onClick={() => {}}
              className="!h-8 !bg-white !w-auto !rounded-sm shadow-none hover:shadow-none hover:bg-white"
            >
              <Typography className="text__label__button !text-primary px-3 font-medium">
                ارسال
              </Typography>
            </LoadingButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatDrawer;
