
import { Meta, StoryObj } from "@storybook/react";
import ProgressBar from ".";
import { IReport } from "@interface/repo.interface";

const meta: Meta<typeof ProgressBar> = {
  title: "Components/Molecules/ProgressBar",
  component: ProgressBar,
  argTypes: {
    report: {
      control: "object",
      description: "Report object containing podSpaceStatus",
    },
  },
};

export default meta;

type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {
  args: {
    report: {
      podSpaceStatus: {
        bandwidthLimit: 45,
        plan: {
          title: "string",
          hash: "string",
          description: "string",
          type: "string",
          size: 74,
          bandwidth: 7,
          connections: 2,
          versions: 7,
        },
        storageLimit: 54875,
        storageUsage: 2048,
      },
    } as IReport,
  },
};

export const Empty: Story = {
  args: {
    report: {
      podSpaceStatus: {
        bandwidthLimit: 45,
        plan: {
          title: "string",
          hash: "string",
          description: "string",
          type: "string",
          size: 74,
          bandwidth: 7,
          connections: 2,
          versions: 7,
        },
        storageLimit: 54875,
        storageUsage: 0,
      },
    } as IReport,
  },
};

export const Full: Story = {
  args: {
    report: {
      podSpaceStatus: {
        bandwidthLimit: 45,
        plan: {
          title: "string",
          hash: "string",
          description: "string",
          type: "string",
          size: 74,
          bandwidth: 7,
          connections: 2,
          versions: 7,
        },
        storageLimit: 5400875,
        storageUsage: 5400875,
      },
    } as IReport,
  },
};
