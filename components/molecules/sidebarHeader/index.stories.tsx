import type { Meta, StoryObj } from "@storybook/react";

import React from "react";
import SiderbarHeader from "./index";

const meta: Meta<typeof SiderbarHeader> = {
  title: "components/Molecules/SiderbarHeader",
  component: SiderbarHeader,

  parameters: {
    backgrounds: {
      default: "dark",
    },
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof SiderbarHeader>;

export const ArchiveFolder: Story = {
  args: {},
  render: function Render() {
    return (
      <div dir="rtl">
        <SiderbarHeader domainInfo={{}} />
      </div>
    );
  },
};
