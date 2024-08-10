import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import RepoMenu from "./repoMenuStory";
import { RecoilRoot } from "recoil";
import { ERoles } from "@interface/enums";

const mockRepo = {
  id: 1,
  name: "مخزن یک",
  description: "توضیحات مخزن",
  bookmark: false,
  createDate: "2023-01-01",
  lastAccessDate: "2023-01-01",
  imageFileHash: "dsdsd",
  roleName: ERoles.owner,
  updatedAt: "2023-01-01",
  userGroupHash: "dddddww",
  isPublish: false,
  isArchived: false,
  publishExpireTime: 12555368,
  adminPublicLink: null,
  viewerPublicLink: null,
  writerPublicLink: null,
  editorPublicLink: null,
  metadata: null,
} as any;

export default {
  title: "Components/Molecules/RepoMenu",
  component: RepoMenu,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    (Story) => (
        <RecoilRoot>
          <Story />
        </RecoilRoot>
    ),
  ],
  args: {
    repo: mockRepo,
    archived: false,
  },
} as Meta<typeof RepoMenu>;

export const Default: StoryObj<typeof RepoMenu> = {
  render: (args) => <RepoMenu {...args} />,
};

export const ArchivedRepo: StoryObj<typeof RepoMenu> = {
  args: {
    archived: true,
  },
};
