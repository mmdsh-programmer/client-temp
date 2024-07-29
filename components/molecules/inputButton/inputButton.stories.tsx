import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import InputButton from "./inputButton";

const meta: Meta<typeof InputButton> = {
  title: "components/Molecules/InputButton",
  component: InputButton,

  parameters: {
    backgrounds: {
      default: "dark",
    },
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof InputButton>;

export const InputButtonExample: Story = {
  args: {
    classNameInput:
      "text-right grow py-2 pr-2 w-[250px] bg-gray-50 outline-none rounded-lg focus:outline-none placeholder:text-hint text-black",
    classNameButton:
    "icon-button shrink bg-white ml-2 flex justify-center items-center rounded-lg px-3 py-1",
  },
  render: function Render(args) {
    function onClick() {
      console.log("=============== clicked ================");
    }
    return (
      <div className="flex items-center bg-gray-50 rounded-lg text-right">
        <InputButton
          {...args}
          onClick={onClick}
          placeholder="... جستجو "
        >
          <p className="text-xs text-black font-semibold">افزودن </p>
        </InputButton>
      </div>
    );
  },
};
