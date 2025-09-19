import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";

import CancelButton from "@components/atoms/button/cancelButton";
import CloseButton from "@components/atoms/button/closeButton";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import LoadingButton from "@components/molecules/loadingButton";
import React from "react";

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
      className="free-draft-dialog rounded-lg flex flex-col bg-white w-auto min-w-[90%] max-w-[90%] xs:min-w-[400px] xs:max-w-[400px] -mb-[60vh] xs:mb-0"
      dismiss={{
        enabled: false,
      }}
      {...({} as Omit<React.ComponentProps<typeof Dialog>, "placeholder" | "open" | "handler">)}
    >
      <DialogHeader
        placeholder="dialog header"
        className="dialog-header flex items-center justify-between px-5 pt-5 pb-4 xs:py-5 xs:px-6 border-b-none xs:border-b-[0.5px] border-normal"
        {...({} as Omit<React.ComponentProps<typeof DialogHeader>, "placeholder">)}
      >
        <div className="flex items-center">
          <Typography 
          className="form__title"
          {...({} as React.ComponentProps<typeof Typography>)}
          > آزادسازی ویرایشگر </Typography>
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
        className="dialog-body flex-grow px-5 py-3 xs:p-6"
        {...({} as Omit<React.ComponentProps<typeof DialogBody>, "placeholder">)}
      >
        <div className="body_b3 flex text-primary_normal">
          مهلت استفاده شما از ویرایشگر به پایان رسیده.
          <br />
          آیا ادامه میدهید؟
        </div>
        <div className="dialog-body__timer flex justify-center mt-4">
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
        className="dialog-footer p-5 xs:px-6 xs:py-4 flex gap-2 xs:gap-3 border-t-none xs:border-t-[0.5px] border-normal"
        {...({} as Omit<React.ComponentProps<typeof DialogFooter>, "placeholder">)}
      >
        <LoadingButton
          className="dialog-footer__submit-button bg-primary-normal hover:bg-primary-normal active:bg-primary-normal !text-white flex-grow"
          onClick={onResume}
          disabled={onCloseLoading || onResumeLoading}
        >
          بله ادامه می دهم
        </LoadingButton>
        <CancelButton
          onClick={onClose}
          disabled={onResumeLoading || onCloseLoading}
          className="dialog-footer__cancel-button !flex-grow"
        >
          <Typography 
            className="text__label__button"
            {...({} as  React.ComponentProps<typeof Typography>)}
          >
            نه ، ذخیره و بستن ویرایشگر
          </Typography>
        </CancelButton>
      </DialogFooter>
    </Dialog>
  );
};

export default FreeDraftDialog;
