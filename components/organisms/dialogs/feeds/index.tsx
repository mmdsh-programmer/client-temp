import React from "react";
import Feeds from "@components/organisms/feeds";
import InfoDialog from "@components/templates/dialog/infoDialog";
import { DialogBody, DialogFooter } from "@material-tailwind/react";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const FeedsDialog = ({ setOpen }: IProps) => {
  return (
    <InfoDialog
      className="!max-w-[unset]"
      customSize="lg"
      setOpen={setOpen}
      dialogHeader="خبرنامه ها"
    >
      <DialogBody {...({} as React.ComponentProps<typeof DialogBody>)} className="flex-grow p-0">
        <Feeds />
      </DialogBody>
      <DialogFooter {...({} as React.ComponentProps<typeof DialogFooter>)}>
        {null}
      </DialogFooter>
    </InfoDialog>
  );
};

export default FeedsDialog;
