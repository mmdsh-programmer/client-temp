"use client";

interface IProps {
  children: JSX.Element;
  isTrue: boolean;
}
const RenderIf = ({ children, isTrue }: IProps) => {
  return isTrue ? children : null;
};

export default RenderIf;
