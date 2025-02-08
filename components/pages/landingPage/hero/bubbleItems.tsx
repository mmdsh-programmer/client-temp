"use client";

import React, { useState } from "react";

const getRandomNumber = () => {
  const random = Math.random() * 100;
  return random - 50;
};

interface IProps{
    children: React.ReactNode,
    className?: string;
}
const BubbleItems = ({ children, className }: IProps) => {
  const [_, setRerender] = useState(0);

  return (
    <div
      className={`animate-floatBubble ${className}`}
      style={{
        "--randomX": `${getRandomNumber()}px`,
        "--randomY": `${getRandomNumber()}px`,
      } as { [key: string]: string }}
      onAnimationIteration={() => { setRerender(Date.now()); }}
    >
      {children}
    </div>
  );
};

export default BubbleItems;
