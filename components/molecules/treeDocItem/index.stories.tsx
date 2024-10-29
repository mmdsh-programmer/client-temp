import type {
 Meta,
 StoryObj
} from "@storybook/react";
import {
 QueryClient,
 QueryClientProvider
} from "@tanstack/react-query";

import { EDocumentTypes } from "@interface/enums";
import { IDocumentTreeItem } from "atom/category";
import React from "react";
import { RecoilRoot } from "recoil";
import TreeDocItem from "./treeDocItem";

const queryClient = new QueryClient();

const meta: Meta<typeof TreeDocItem> = {
  title: "components/Molecules/TreeDocItem",
  component: TreeDocItem,
  parameters: {nextjs: {appDirectory: true,},},
  decorators: [
    (Story) => 
{return (
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <div className="flex w-full items-center justify-center !font-iranYekan bg-gray-50 p-4">
            <Story />
          </div>
        </RecoilRoot>
      </QueryClientProvider>
    );},
  ],
};

export default meta;

type Story = StoryObj<typeof TreeDocItem>;

const mockDocItem: IDocumentTreeItem = {
  id: 1,
  name: "doc root",
  isHidden: false,
  description: "",
  type: "document",
  repoId: 0,
  categoryId: 0,
  categoryName: "",
  extraDetails: null,
  createdAt: "",
  updatedAt: null,
  deletedAt: null,
  creatorSSOID: 0,
  isBookmarked: false,
  hasPassword: false,
  creator: null,
  tags: [],
  contentType: EDocumentTypes.classic,
  lastVersionId: null,
  isTemplate: false,
  chatThreadId: null,
  isPublish: false,
  publishLinkPassword: null,
  publishExpireTime: null,
  userGroupHash: null,
  attachmentUserGroup: null,
  hasWhiteList: false,
  hasBlackList: false
};

export const Default: Story = {render: () => 
{return <TreeDocItem docItem={mockDocItem} />;},};
