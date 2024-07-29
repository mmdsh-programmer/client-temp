import React from "react";
import Text from "@components/atoms/typograghy/text";
import CardItemRow from "./cardItemRow";

interface IProps {
  name: string;
  createDate?: string;
  creator?: string;
  cardAction?: React.JSX.Element;
}

const MobileCard = ({
  name,
  createDate,
  creator,
  cardAction,
}: IProps) => {

  return (
    <div className="flex flex-col w-full shadow-xSmall bg-primary rounded-lg p-4 gap-4">
      <div className="flex justify-between items-center w-full gap-[10px]">
        <Text className="text-[14px] flex-grow font-medium leading-[21px] -treacking-[0.14] text-ellipsis whitespace-nowrap">
          {name}
        </Text>
        <div className="rounded-lg border-[1px] border-normal h-8 w-8 flex justify-center items-center">
          {cardAction}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <CardItemRow title="تاریخ ایجاد" value={createDate} />
        <CardItemRow title="سازنده" value={creator} />
      </div>
    </div>
  );
};

export default MobileCard;
