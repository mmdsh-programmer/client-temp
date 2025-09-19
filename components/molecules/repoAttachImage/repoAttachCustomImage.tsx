import { Button, Typography } from "@material-tailwind/react";
import { AddImageIcon } from "@components/atoms/icons";
import React from "react";
import RepoAttachDefaultImage from "@components/molecules/repoAttachImage/repoAttachDefaultImage";
import RepoDefaultImage from "../repoDefaultImage";
import Radio from "@components/atoms/radio";

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
    <div className="repo-attach-image flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <Radio
          name="default_image"
          className="repo-attach-default-image__radio"
          label={
            <div>
              <Typography
                placeholder=""
                className="text-[13px] font-medium leading-[19.5px] -tracking-[0.13px] text-primary_normal"
                {...({} as  Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
              >
                تصویر پیش‌فرض
              </Typography>
              <Typography
                placeholder=""
                className="text-[12px] font-normal leading-[20px] -tracking-[0.12px] text-hint"
                {...({} as  Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
              >
                انتخاب تصویر پیش‌فرض برای مخزن
              </Typography>
            </div>
          }
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
          name="custom_image"
          label={
            <div>
              <Typography
                placeholder=""
                className="text-[13px] font-medium leading-[19.5px] -tracking-[0.13px] text-primary_normal"
                {...({} as  Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
              >
                تصویر سفارشی
              </Typography>
              <Typography
                placeholder=""
                className="text-[12px] font-normal leading-[20px] -tracking-[0.12px] text-hint"
                {...({} as  Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
              >
                انتخاب تصویر دلخواه برای مخزن
              </Typography>
            </div>
          }
          checked={imageType === "custom"}
          value={imageType}
          onChange={() => {
            setImageType("custom");
          }}
          className="repo-attach-custom-image__radio"
        />
        <Button
          onClick={() => {
            setOpenFileManagement(true);
          }}
          className="repo-attach-custom-image-button flex h-[82px] w-[82px] items-center justify-center rounded-lg border-[1px] border-dashed border-normal bg-secondary p-0"
          placeholder=""
          disabled={imageType !== "custom"}
          {...({} as  Omit<React.ComponentProps<typeof Button>, "placeholder">)}
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
