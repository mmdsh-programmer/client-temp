import {
 Meta,
 StoryObj
} from "@storybook/react/*";

import React from "react";
import { RecoilRoot } from "recoil";
import RepoSearch from ".";

export default {
  title: "Components/Molecules/RepoSearch",
  component: RepoSearch,
  decorators: [
    (Story) => 
{return (
      <RecoilRoot>
        <div style={{
 padding: "20px", maxWidth: "500px" 
}}>
          <Story />
        </div>
      </RecoilRoot>
    );},
  ],
} as Meta<typeof RepoSearch>;

export const Default: StoryObj<typeof RepoSearch> = {render: () => 
{return <RepoSearch />;},};
