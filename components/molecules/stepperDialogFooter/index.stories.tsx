import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import DialogStepperFooter from ".";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const meta: Meta<typeof DialogStepperFooter> = {
  title: "components/Molecules/DialogStepperFooter",
  component: DialogStepperFooter,
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

type Story = StoryObj<typeof DialogStepperFooter>;

export const Default: Story = {
  render: () => {
    const [loading, setLoading] = useState(false);

    const handlePreviousStep = () => {
      console.log("Previous step");
    };

    const handleNextStep = () => {
      console.log("Next step");
      setLoading(true);
      setTimeout(() => {
        return setLoading(false);
      }, 2000);
    };

    return (
      <DialogStepperFooter
        hasPreviousStep
        hasNextStep
        handlePreviousStep={handlePreviousStep}
        handleNextStep={handleNextStep}
        loading={loading}
      />
    );
  },
};
