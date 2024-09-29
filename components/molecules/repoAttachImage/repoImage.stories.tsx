import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import RepoImage from "../repoDefaultImage";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { IRepo } from "@interface/repo.interface";
import { Spinner } from "@material-tailwind/react";
import { ERoles } from "@interface/enums";

const mockRepo: IRepo = {
  id: 475785,
  imageFileHash: "red",
  name: "Mock Repository",
  description: "",
  bookmark: false,
  createDate: "",
  lastAccessDate: "",
  roleName: ERoles.owner,
  updatedAt: "",
  userGroupHash: "",
  isPublish: false,
  isArchived: false,
  publishExpireTime: 0,
  adminPublicLink: null,
  viewerPublicLink: null,
  writerPublicLink: null,
  editorPublicLink: null,
};

const queryClient = new QueryClient();

const meta: Meta<typeof RepoImage> = {
  title: "components/Molecules/RepoImage",
  component: RepoImage,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <div className="flex w-[300px] items-center justify-center bg-gray-50">
            <Story />
          </div>
        </RecoilRoot>
      </QueryClientProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof RepoImage>;

export const Default: Story = {
  args: {
    repo: mockRepo,
  },
};

export const Fetching: Story = {
  args: {
    repo: null,
  },
  decorators: [
    (Story) => (
      <div className="flex w-full items-center justify-center bg-gray-50">
        <Story />
      </div>
    ),
  ],
};

export const NoImageHash: Story = {
  args: {
    repo: {
      ...mockRepo,
      imageFileHash: "",
    },
  },
};
