import React from "react";
import { Button, Radio, Typography } from "@material-tailwind/react";
import { AddImageIcon } from "@components/atoms/icons";
import RepoAttachDefaultImage from "@components/molecules/repoAttachImage/repoAttachDefaultImage";
import RepoDefaultImage from "../repoDefaultImage";

interface IProps {
  imageType: "default" | "custom" | undefined;
  setOpenFileManagement: React.Dispatch<React.SetStateAction<boolean>>;
  setImageType: React.Dispatch<React.SetStateAction<"default" | "custom" | undefined>>;
  onSelect: (image: string) => void;
  imageHash?: string;
}

const RepoAttachCustomImage = ({
  imageType,
  setImageType,
  onSelect,
  setOpenFileManagement,
  imageHash,
}: IProps) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <Radio
          crossOrigin="anonymous"
          name="default_image"
          color="deep-purple"
          label={
            <div>
              <Typography className="text-primary font-medium text-[13px] leading-[19.5px] -tracking-[0.13px] ">
                تصویر پیش‌فرض
              </Typography>
              <Typography className="text-hint text-[12px] leading-[20px] -tracking-[0.12px] font-normal">
                انتخاب تصویر پیش‌فرض برای مخزن
              </Typography>
            </div>
          }
          containerProps={{
            className: "-mt-5",
          }}
          checked={imageType === "default"}
          value={imageType}
          onChange={() => {
            setImageType("default");
          }}
        />
        <div className="">
          <RepoAttachDefaultImage
            onClick={(image: string) => {
              return onSelect(image);
            }}
            disabled={imageType !== "default"}
          />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Radio
          crossOrigin="anonymous"
          name="custom_image"
          color="deep-purple"
          label={
            <div>
              <Typography className="text-primary font-medium text-[13px] leading-[19.5px] -tracking-[0.13px] ">
                تصویر سفارشی
              </Typography>
              <Typography className="text-hint text-[12px] leading-[20px] -tracking-[0.12px] font-normal">
                انتخاب تصویر دلخواه برای مخزن
              </Typography>
            </div>
          }
          containerProps={{
            className: "-mt-5",
          }}
          checked={imageType === "custom"}
          value={imageType}
          onChange={() => {
            setImageType("custom");
          }}
        />
        <Button
          onClick={() => {
            setOpenFileManagement(true);
          }}
          className="p-0 flex justify-center items-center rounded-lg border-[1px] border-dashed border-normal bg-secondary w-[82px] h-[82px]"
          placeholder=""
          disabled={imageType !== "custom"}
        >
          {imageHash ? (
            <RepoDefaultImage imageHash={imageHash} />
          ) : (
            <AddImageIcon className="h-6 w-6" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default RepoAttachCustomImage;
