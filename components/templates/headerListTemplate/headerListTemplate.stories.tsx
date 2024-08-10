import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import HeaderListTemplate, { IProps } from ".";
import { RecoilRoot } from "recoil";

// Mock components for storybook, as the actual components (DesktopHeaderList, TabletHeaderList, MobileHeaderList, ListMode) may rely on specific contexts or states
const DesktopHeaderList = ({ buttonText, onClick }: any) => (
  <button onClick={onClick}>{buttonText} (Desktop)</button>
);

const TabletHeaderList = ({ onClick }: any) => (
  <button onClick={onClick}>Tablet List</button>
);

const MobileHeaderList = ({ onClick }: any) => (
  <button onClick={onClick}>Mobile List</button>
);

const ListMode = () => <div>List Mode</div>;

export default {
  title: "Components/Templates/HeaderListTemplate",
  component: HeaderListTemplate,
  argTypes: {
    header: { control: "text" },
    buttonText: { control: "text" },
    listModeHide: { control: "boolean" },
  },

  decorators: [
    (Story)=>(
        <RecoilRoot>
            <Story />
        </RecoilRoot>
    )
  ]
} as Meta;

const Template: StoryFn<IProps> = (args) => (
  <HeaderListTemplate {...args} />
);

export const Default = Template.bind({});
Default.args = {
  header: "لیست مخزن ها",
  buttonText: "ایجاد مخزن جدید",
  onClick: () => alert("مخزن جدید درست شد!"),
  listModeHide: false,
};

export const WithoutListMode = Template.bind({});
WithoutListMode.args = {
  ...Default.args,
  listModeHide: true,
};


