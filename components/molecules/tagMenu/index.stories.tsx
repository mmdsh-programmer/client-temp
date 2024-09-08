import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import TagMenu from "./tagMenu";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ITag } from "@interface/tags.interface";

const queryClient = new QueryClient();

const meta: Meta<typeof TagMenu> = {
  title: "components/Molecules/TagMenu",
  component: TagMenu,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <div className="">
            <Story />
          </div>
        </RecoilRoot>
      </QueryClientProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof TagMenu>;

export const Default: Story = {
  render: () => {
    const [showDrawer, setShowDrawer] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);

    const mockTag: ITag = {
      id: 1,
      name: "Sample Tag",
      createDate: 0,
    };

    return (
      <div>
        <TagMenu tag={mockTag} setOpen={setOpen} showDrawer={showDrawer} />
      </div>
    );
  },
};
