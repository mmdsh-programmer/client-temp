import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import DiffVersionAlert from ".";
import { RecoilRoot, atom, useSetRecoilState } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { compareVersionAtom } from "@atom/version";
import { EDocumentTypes, EDraftStatus, ERoles } from "@interface/enums";

const RecoilMock = ({ children }: { children: React.ReactNode }) => {
  const setCompareVersion = useSetRecoilState(compareVersionAtom);

  React.useEffect(
    () =>
      setCompareVersion({
        version: {
          data: {
            versionNumber: "1.0.0",
            createDate: 0,
            updateDate: 0,
            id: 0,
            status: EDraftStatus.editing,
            state: "version",
            postId: 0,
            repoId: 123456,
            categoryId: 0,
            documentId: 457896,
            dislikeCount: 0,
            likeCount: 0,
            hash: "",
            shareCount: 0,
            metadata: "",
            favoriteCount: 0,
            commentCount: 0,
            changeLog: "",
            draftId: 0,
          },
          document: {
            id: 457896,
            name: "",
            description: "",
            type: "document",
            repoId: 123456,
            categoryId: 0,
            categoryName: "",
            extraDetails: null,
            createdAt: "",
            updatedAt: null,
            deletedAt: null,
            creatorSSOID: 0,
            isHidden: false,
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
          },
          repo: {
            id: 123456,
            name: "",
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
            editorPublicLink: null,
          },
        },
        compare: null,
      }),
    [setCompareVersion],
  );

  return <RecoilRoot>{children}</RecoilRoot>;
};

const queryClient = new QueryClient();

const meta: Meta<typeof DiffVersionAlert> = {
  title: "components/Molecules/DiffVersionAlert",
  component: DiffVersionAlert,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <div className="flex w-full items-center justify-center !font-iranYekan bg-gray-50 p-4">
            <Story />
          </div>
        </RecoilRoot>
      </QueryClientProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof DiffVersionAlert>;

export const Default: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: "components/atoms/diffVersionAlert/index.tsx",
      },
    },
  },
};
