import type { Meta, StoryObj } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import DocumentTableRow from ".";
import { EDocumentTypes } from "@interface/enums";
import { IDocumentMetadata } from "@interface/document.interface";
import React from "react";
import { RecoilRoot } from "recoil";

const queryClient = new QueryClient();

const mockDocument: IDocumentMetadata = {
  id: 1,
  name: "Mock Document",
  order: 1,
  createdAt: "",
  updatedAt: "",
  isHidden: false,
  isBookmarked: false,
  hasPassword: false,
  description: "",
  type: "document",
  repoId: 0,
  categoryId: 0,
  categoryName: "",
  extraDetails: null,
  deletedAt: null,
  creatorSSOID: 0,
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
  hasBlackList: false,
  repoName: "",
  hasDirectAccess: false,
  createDate: 0,
  customPostEntityId: 0,
  customPostId: 0,
  deleteDate: null,
  domainTags: [],
  imageAlt: null,
  imageUrl: null,
  isCommitted: false,
  isPublished: false,
  parentId: null,
  participants: [],
  participantsRoles: {},
  readTime: null,
  repoTypeId: 0,
  sharedArray: [],
  updateDate: 0
};

const meta: Meta<typeof DocumentTableRow> = {
  title: "components/Molecules/DocumentTableRow",
  component: DocumentTableRow,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    (Story) => {
      return (
        <QueryClientProvider client={queryClient}>
          <RecoilRoot>
            <div className="w-full p-4">
              <Story />
            </div>
          </RecoilRoot>
        </QueryClientProvider>
      );
    },
  ],
};

export default meta;

type Story = StoryObj<typeof DocumentTableRow>;

export const Default: Story = {
  render: () => {
    return <DocumentTableRow document={mockDocument} />;
  },
};
