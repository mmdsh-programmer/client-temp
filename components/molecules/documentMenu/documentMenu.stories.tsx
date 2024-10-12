import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import DocumentMenu from ".";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { IDocumentMetadata } from "@interface/document.interface";
import { EDocumentTypes } from "@interface/enums";

const mockDocument: IDocumentMetadata = {
  id: 1,
  name: "Mock Document",
  isHidden: false,
  hasPassword: false,
  isBookmarked: false,
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
  creator: null,
  tags: [],
  contentType: EDocumentTypes.classic,
  lastVersionId: null,
  isTemplate: false,
  chatThreadId: null,
  isPublish: false,
  publishLinkPassword: null,
  publishExpireTime: null,
  userGroupHash: null
};

const queryClient = new QueryClient();

const meta: Meta<typeof DocumentMenu> = {
  title: "components/Molecules/DocumentMenu",
  component: DocumentMenu,
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
            <div className="flex w-full items-center justify-center !font-iranYekan bg-gray-50 p-4">
              <Story />
            </div>
          </RecoilRoot>
        </QueryClientProvider>
      );
    },
  ],
};

export default meta;

type Story = StoryObj<typeof DocumentMenu>;

export const Default: Story = {
  render: () => {
    return <DocumentMenu document={mockDocument} showDrawer />;
  },
};
