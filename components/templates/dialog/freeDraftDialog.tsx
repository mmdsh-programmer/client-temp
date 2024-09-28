import React from "react";
import { Dialog, DialogFooter, DialogBody, DialogHeader, Typography } from "@material-tailwind/react";
import CloseButton from "@components/atoms/button/closeButton";
import LoadingButton from "@components/molecules/loadingButton";
import CancelButton from "@components/atoms/button/cancelButton";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

interface IProps {
  onClose: () => void;
  onResume: () => void;
  onResumeLoading: boolean;
  onCloseLoading: boolean;
}

const FreeDraftDialog = ({
  onClose,
  onResume,
  onCloseLoading,
  onResumeLoading,
}: IProps) => {
  const renderTime = ({ remainingTime }: { remainingTime: number }) => {
    return (
      <div className="timer">
        <div className="value font-iranYekan">{remainingTime}</div>
      </div>
    );
  };

  return (
    <Dialog
      placeholder=""
      size="sm"
      open
      handler={onResume}
      className="rounded-lg flex flex-col bg-primary w-auto min-w-[90%] max-w-[90%] xs:min-w-[400px] xs:max-w-[400px] -mb-[60vh] xs:mb-0"
    >
      <DialogHeader
        placeholder="dialog header"
        className="flex items-center justify-between px-5 pt-5 pb-4 xs:py-5 xs:px-6 border-b-none xs:border-b-[0.5px] border-normal"
      >
        <div className="flex items-center">
          <Typography className="form__title"> آزادسازی ویرایشگر </Typography>
        </div>
        <div className="hidden xs:block">
          <CloseButton
            onClose={onResume}
            disabled={onResumeLoading || onCloseLoading}
          />
        </div>
      </DialogHeader>
      <DialogBody
        placeholder="dialog body"
        className="flex-grow px-5 py-3 xs:p-6"
      >
        <div className="body_b3 flex text-primary">
          مهلت استفاده شما از ویرایشگر به پایان رسیده.
          <br />
          آیا ادامه میدهید؟
        </div>
        <div className="flex justify-center mt-4">
          <CountdownCircleTimer
            isPlaying
            size={50}
            strokeWidth={2}
            duration={20}
            colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
            colorsTime={[10, 6, 3, 0]}
          >
            {renderTime}
          </CountdownCircleTimer>
        </div>
      </DialogBody>
      <DialogFooter
        placeholder="dialog footer"
        className="p-5 xs:px-6 xs:py-4 flex gap-2 xs:gap-3 border-t-none xs:border-t-[0.5px] border-normal"
      >
        <LoadingButton
          className="bg-purple-normal hover:bg-purple-normal active:bg-purple-normal !text-white flex-grow"
          onClick={onResume}
          disabled={onCloseLoading || onResumeLoading}
        >
          بله ادامه می دهم
        </LoadingButton>
        <CancelButton
          onClick={onClose}
          disabled={onResumeLoading || onCloseLoading}
          className="!flex-grow"
        >
          <Typography className="text__label__button">
            نه ، ذخیره و بستن ویرایشگر
          </Typography>
        </CancelButton>
      </DialogFooter>
    </Dialog>
  );
};

export default FreeDraftDialog;
