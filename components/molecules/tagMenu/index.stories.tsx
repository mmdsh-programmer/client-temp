import type {
 Meta,
 StoryObj
} from "@storybook/react";
import {
 QueryClient,
 QueryClientProvider
} from "@tanstack/react-query";
import React, { useState } from "react";

import { ITag } from "@interface/tags.interface";
import { RecoilRoot } from "recoil";
import TagMenu from "./tagMenu";

const queryClient = new QueryClient();

const meta: Meta<typeof TagMenu> = {
  title: "components/Molecules/TagMenu",
  component: TagMenu,
  parameters: { nextjs: { appDirectory: true } },
  decorators: [
    (Story) => {
      return (
        <QueryClientProvider client={queryClient}>
          <RecoilRoot>
            <div className="">
              <Story />
            </div>
          </RecoilRoot>
        </QueryClientProvider>
      );
    },
  ],
};

export default meta;

type Story = StoryObj<typeof TagMenu>;

export const Default: Story = {render: () => {
    const [showDrawer] = useState<boolean>(false);

    const mockTag: ITag = {
      id: 1,
      name: "Sample Tag",
      createDate: 0,
    };

    return (
      <div>
        <TagMenu tag={mockTag} showDrawer={showDrawer} />
      </div>
    );
  },};
