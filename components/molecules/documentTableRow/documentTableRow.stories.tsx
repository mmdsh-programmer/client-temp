import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import DocumentTableRow from ".";
import { RecoilRoot } from "recoil";
import { IDocumentMetadata } from "@interface/document.interface";
import { EDocumentTypes } from "@interface/enums";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <div className="w-full p-4">
            <Story />
          </div>
        </RecoilRoot>
      </QueryClientProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof DocumentTableRow>;

export const Default: Story = {
  render: () => <DocumentTableRow document={mockDocument} />,
};
