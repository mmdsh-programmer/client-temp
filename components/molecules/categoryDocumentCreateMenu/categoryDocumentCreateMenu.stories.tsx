import { Meta, StoryObj } from "@storybook/react";
import CategoryDocumentCreateMenu from ".";
import { RecoilRoot } from "recoil";

const meta: Meta<typeof CategoryDocumentCreateMenu> = {
  title: "components/Molecules/CategoryDocumentCreateMenu",
  component: CategoryDocumentCreateMenu,
  decorators: [
    (Story) => (
      <RecoilRoot>
        <div className="flex w-full items-center justify-center !font-iranYekan">
          <Story />
        </div>
      </RecoilRoot>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof CategoryDocumentCreateMenu>;

export const Default: Story = {
  args: {
    showDrawer: false,
  },
};


