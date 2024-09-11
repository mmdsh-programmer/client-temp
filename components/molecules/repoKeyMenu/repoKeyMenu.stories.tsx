import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import RepoKeyMenu from ".";
import { RecoilRoot } from "recoil";
import { IPublicKey } from "@interface/repo.interface";

const mockKeyItem: IPublicKey = {
  key: "ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAQEArDQxkzsh1...",
  createdAt: "2024-01-01T00:00:00Z",
  updatedAt: "2024-01-01T00:00:00Z",
  repoId: 1,
  creatorSSOID: 8756565,
  id: 123456,
  name: "public key",
};

export default {
  title: "Components/Molecules/RepoKeyMenu",
  component: RepoKeyMenu,
  decorators: [
    (Story) => (
      <RecoilRoot>
        <Story />
      </RecoilRoot>
    ),
  ],
  args: {
    keyItem: mockKeyItem,
    isList: false,
  },
} as Meta<typeof RepoKeyMenu>;

export const Default: StoryObj<typeof RepoKeyMenu> = {
  render: (args) => <RepoKeyMenu {...args} />,
};

export const ListMode: StoryObj<typeof RepoKeyMenu> = {
  args: {
    isList: true,
  },
};
