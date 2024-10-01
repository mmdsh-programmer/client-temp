import type {
 Meta,
 StoryObj
} from "@storybook/react";
import {
 QueryClient,
 QueryClientProvider
} from "@tanstack/react-query";
import React, { useState } from "react";

import { ERoles } from "@interface/enums";
import { IRepo } from "@interface/repo.interface";
import { RecoilRoot } from "recoil";
import RepoMenu from ".";

const mockRepo: IRepo = {
  id: 487521,
  name: " Repository ssss",
  roleName: ERoles.owner,
  isArchived: false,
  isPublish: false,
  bookmark: false,
  description: "",
  createDate: "",
  lastAccessDate: "",
  imageFileHash: "",
  updatedAt: "",
  userGroupHash: "",
  publishExpireTime: 0,
  adminPublicLink: null,
  viewerPublicLink: null,
  writerPublicLink: null,
  editorPublicLink: null,
};

const queryClient = new QueryClient();

const meta: Meta<typeof RepoMenu> = {
  title: "components/Molecules/RepoMenu",
  component: RepoMenu,
  parameters: {nextjs: {appDirectory: true,},},
  decorators: [
    (Story) => 
{return (
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <div className="flex w-full items-center justify-center bg-gray-50">
            <Story />
          </div>
        </RecoilRoot>
      </QueryClientProvider>
    );},
  ],
};

export default meta;

type Story = StoryObj<typeof RepoMenu>;

export const Default: Story = {render: () => {
    const [showDrawer,] = useState<boolean>(false);

    return <RepoMenu repo={mockRepo} showDrawer={showDrawer} />;
  },};
