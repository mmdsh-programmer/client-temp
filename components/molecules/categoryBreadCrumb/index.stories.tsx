import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import CategoryBreadCrumb from ".";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RecoilRoot, useRecoilState, atom } from "recoil";
import { ICategoryMetadata } from "@interface/category.interface";

const mockCategory: ICategoryMetadata = {
  id: 1,
  name: "دسته بندی یک",
  parentId: null,
  description: "",
  repoId: 154875,
  type: "category",
  extraDetails: null,
  isHidden: false,
  creator: null,
  createdAt: null,
  updatedAt: null,
  deletedAt: null,
  active: false,
  isTemplate: false,
  userGroupHash: null,
};

const queryClient = new QueryClient();
const categoryShowAtom = atom<ICategoryMetadata | null>({
  key: "categoryShowAtom",
  default: mockCategory,
});

const meta: Meta<typeof CategoryBreadCrumb> = {
  title: "components/Molecules/CategoryBreadCrumb",
  component: CategoryBreadCrumb,
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

type Story = StoryObj<typeof CategoryBreadCrumb>;

export const Default: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: "components/molecules/categoryBreadCrumb/index.tsx",
      },
    },
  },
};

export const WithMockCategory: Story = {
  decorators: [
    (Story) => {
      const [categoryShow, setCategoryShow] = useRecoilState(categoryShowAtom);

      React.useEffect(() => {
        setCategoryShow(mockCategory);
      }, [categoryShow]);

      return <Story />;
    },
  ],
  parameters: {
    nextjs: {
      navigation: {
        pathname: "components/molecules/categoryBreadCrumb/index.tsx",
      },
    },
  },
};

export const NoCategory: Story = {
  decorators: [
    (Story) => {
      const [categoryShow, setCategoryShow] = useRecoilState(categoryShowAtom);

      React.useEffect(() => {
        setCategoryShow(null);
      }, [categoryShow]);

      return <Story />;
    },
  ],
  parameters: {
    nextjs: {
      navigation: {
        pathname: "components/molecules/categoryBreadCrumb/index.tsx",
      },
    },
  },
};
