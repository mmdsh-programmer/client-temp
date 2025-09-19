"use client";

interface IProps {
  children: React.ReactNode;
  isTrue: boolean;
}
const RenderIf = ({ children, isTrue }: IProps) => {
  return isTrue ? children : null;
};

export default RenderIf;
