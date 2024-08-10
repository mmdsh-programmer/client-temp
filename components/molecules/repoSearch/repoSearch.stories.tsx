import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import RepoSearch from ".";
import { RecoilRoot } from "recoil";

export default {
  title: "Components/Molecules/RepoSearch",
  component: RepoSearch,
  decorators: [
    (Story) => (
      <RecoilRoot>
        <div style={{ padding: "20px", maxWidth: "500px" }}>
          <Story />
        </div>
      </RecoilRoot>
    ),
  ],
} as Meta<typeof RepoSearch>;

export const Default: StoryObj<typeof RepoSearch> = {
  render: () => <RepoSearch />,
};
