import React from "react";
import { ChatIcon, DislikeIcon, LikeIcon } from "@components/atoms/icons";
import { Button } from "@material-tailwind/react";
import { editorChatDrawerAtom } from "@atom/editor";
import { useRecoilState } from "recoil";

const LikeAndComment = () => {
  const [getChatDrawer, setChatDrawer] = useRecoilState(editorChatDrawerAtom);
  return (
    <div className="flex">
      <Button
        className="w-8 h-8 p-0 rounded-full bg-transparent hover:bg-gray-700"
        onClick={() => {
          setChatDrawer(!getChatDrawer);
        }}
      >
        <ChatIcon className="h-5 w-5 " />
      </Button>
      <Button className="w-8 h-8 p-0 rounded-full bg-transparent hover:bg-gray-700">
        <LikeIcon className="h-5 w-5 " />
      </Button>
      <Button className="w-8 h-8 p-0 rounded-full bg-transparent hover:bg-gray-700">
        <DislikeIcon className="h-5 w-5 " />
      </Button>
    </div>
  );
};

export default LikeAndComment;
