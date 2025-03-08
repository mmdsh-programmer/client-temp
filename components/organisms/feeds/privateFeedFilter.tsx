import React from "react";
import SelectBox from "@components/molecules/selectBox";
import { Typography } from "@material-tailwind/react";

interface IProps {
  selectedOptions: number[];
  setSelectedOptions: (options: number[]) => void;
}

const PrivateFeedFilter = ({ selectedOptions, setSelectedOptions }: IProps) => {
  return (
    <div className="flex flex-grow flex-col gap-2">
      <Typography className="form_label">فیلتر مخزن</Typography>
      <SelectBox
        options={[
          { label: "همه", value: undefined },
          { label: "مخزن 1", value: 1 },
        ]}
        className="h-12 xs:!h-10 w-full"
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
        defaultOption="همه"
        singleSelect
      />
    </div>
  );
};

export default PrivateFeedFilter;
