import React from "react";
import { DislikeIcon, LikeIcon } from "@components/atoms/icons";
import { Button } from "@material-tailwind/react";
import useGetLikeList from "@hooks/core/useGetLikeList";
import useGetDislikeList from "@hooks/core/useGetDislikeList";
import { IVersion } from "@interface/version.interface";
import useLike from "@hooks/core/useLike";
import useDislike from "@hooks/core/useDislike";

interface IProps {
  version?: IVersion;
}

const LikeAndComment = ({ version }: IProps) => {
  const { data: getLikes } = useGetLikeList(version!.postId, 30);
  const { data: getDislikes } = useGetDislikeList(version!.postId, 30);

  const likeHook = useLike();
  const disLikeHook = useDislike();

  const handleLike = () => {
    if (!version) return;
    likeHook.mutate({
      postId: version.postId,
    });
  };

  const handleDisLike = () => {
    if (!version) return;
    disLikeHook.mutate({
      postId: version.postId,
    });
  };

  return (
    <div className="flex">
      <Button
        onClick={handleLike}
        className="w-8 h-8 p-0 rounded-full bg-transparent hover:bg-gray-700"
        title={getLikes?.pages[0].total.toString()}
      >
        <LikeIcon className="h-5 w-5 " />
      </Button>
      <Button
        onClick={handleDisLike}
        className="w-8 h-8 p-0 rounded-full bg-transparent hover:bg-gray-700"
        title={getDislikes?.pages[0].total.toString()}
      >
        <DislikeIcon className="h-5 w-5 " />
      </Button>
    </div>
  );
};

export default LikeAndComment;
