import EmptyList, { EEmptyList } from "@components/molecules/emptyList";
import React from "react";

interface IProps {
  type: EEmptyList;
}

const EmptyPage = ({ type }: IProps) => {
  return (
    <section className="w-full h-full flex justify-center items-center">
      <EmptyList type={type} />
    </section>
  );
};

export default EmptyPage;
