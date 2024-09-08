import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import RepoCardMode from ".";
import { RecoilRoot } from "recoil";
import { IRepo } from "@interface/repo.interface";
import { repoAtom } from "@atom/repository";
import { ERoles } from "@interface/enums";

const mockRepo: IRepo = {
    name: "874577",
    id: 1447858,
    description: "",
    bookmark: false,
    createDate: "",
    lastAccessDate: "",
    imageFileHash: "",
    roleName: ERoles.owner,
    updatedAt: "",
    userGroupHash: "",
    isPublish: false,
    isArchived: false,
    publishExpireTime: 0,
    adminPublicLink: null,
    viewerPublicLink: null,
    writerPublicLink: null,
    editorPublicLink: null
};

const meta: Meta<typeof RepoCardMode> = {
  title: "components/Molecules/RepoCardMode",
  component: RepoCardMode,
  decorators: [
    (Story) => (
      <RecoilRoot
        initializeState={({ set }) => {
          set(repoAtom, mockRepo);
        }}
      >
        <div className="w-full p-4">
          <Story />
        </div>
      </RecoilRoot>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof RepoCardMode>;

export const Default: Story = {
  args: {
    repo: mockRepo,
  },
};
