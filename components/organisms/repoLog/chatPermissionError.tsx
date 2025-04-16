import React from "react";
import { CardBody, CardHeader, Typography } from "@material-tailwind/react";
import CloseButton from "@components/atoms/button/closeButton";
import LoadingButton from "@components/molecules/loadingButton";

interface IProps {
  handleClose: () => void;
  retryLoad: () => void;
  isLoading: boolean;
}

const ChatPermissionError: React.FC<IProps> = ({ handleClose, retryLoad, isLoading }) => {
  return (
    <>
      <CardHeader className="m-0 flex justify-between rounded-none shadow-none" floated={false}>
        <Typography className="form__title">فعالیت ها</Typography>
        <CloseButton onClose={handleClose} />
      </CardHeader>
      <CardBody className="mt-4 flex items-center justify-center p-0">
        <LoadingButton
          className="!w-full bg-purple-normal hover:bg-purple-normal active:bg-purple-normal"
          onClick={retryLoad}
          loading={isLoading}
        >
          <Typography className="text__label__button text-white">
            خطایی رخ داد. تلاش مجدد
          </Typography>
        </LoadingButton>
      </CardBody>
    </>
  );
};

export default ChatPermissionError; 