import React from "react";
import Input from "../../atoms/input/formInput";
import Button from "../../atoms/button/button";

interface IProps {
  classNameButton?: string;
  classNameInput?: string;
  placeholder?: string;
  children: JSX.Element;
  onClick: () => void;
}

const InputButton = ({
  classNameButton,
  classNameInput,
  placeholder,
  children,
  onClick,
}: IProps) => {
  return (
    <>
      <Button onClick={onClick} className={classNameButton}>
        {children}
      </Button>
      <Input type="text" className={classNameInput} placeholder={placeholder} />
    </>
  );
};

export default InputButton;
