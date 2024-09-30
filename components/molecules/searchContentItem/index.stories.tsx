import type {
 Meta, StoryObj 
} from "@storybook/react";
import {
 QueryClient, QueryClientProvider 
} from "@tanstack/react-query";

import { IContentSearchListItem } from "@interface/contentSearch.interface";
import React from "react";
import { RecoilRoot } from "recoil";
import { ResultItem } from ".";

const queryClient = new QueryClient();

const meta: Meta<typeof ResultItem> = {
  title: "components/Molecules/ResultItem",
  component: ResultItem,
  decorators: [
    (Story) => {
      return (
        <QueryClientProvider client={queryClient}>
          <RecoilRoot>
            <div className="w-full max-w-md mx-auto p-4">
              <Story />
            </div>
          </RecoilRoot>
        </QueryClientProvider>
      );
    },
  ],
};

export default meta;

type Story = StoryObj<typeof ResultItem>;

const mockData: IContentSearchListItem = {
  repoId: 478547,
  documentId: 96524,
  repoName: "Repository Name",
  documentName: "Document Name",
  versionId: 45878,
  versionName: "version name",
};

export const Default: Story = {args: {
    data: mockData,
    onClick: () => {
      return console.log("Document clicked");
    },
  },};

export const Disabled: Story = {args: {
    data: mockData,
    onClick: () => {
      return console.log("This should not be clickable");
    },
  },};
