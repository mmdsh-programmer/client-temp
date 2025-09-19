import { Step, Stepper, Typography } from "@material-tailwind/react";
import { StepperIcon, TickIcon } from "@components/atoms/icons";

import React from "react";

interface IProps {
  getActiveStep: number;
  stepList: string[];
}

const StepperComponent = ({ getActiveStep, stepList }: IProps) => {
  return (
    <Stepper
      activeStep={getActiveStep}
      placeholder="stepper"
      lineClassName="stepper__line bg-transparent !border-b-gray-300 border-b-2 border-dashed"
      activeLineClassName="!bg-transparent border-b-0"
      {...({} as Omit<React.ComponentProps<typeof Stepper>, "placeholder">)}
    >
      {stepList.map((step, index) => {
        return (
          <Step
            key={step}
            placeholder="step"
            className="stepper__step h-8 w-8"
            activeClassName="!bg-gray-400"
            completedClassName="bg-primary-normal"
            {...({} as Omit<React.ComponentProps<typeof Step>, "placeholder">)}
          >
            {getActiveStep > index ? (
              <TickIcon className="h-4 w-4 fill-white" />
            ) : (
              <StepperIcon
                className={`h-full w-full ${getActiveStep === index ? "!fill-primary-normal" : "fill-gray-50"} `}
              />
            )}
            <div className="absolute -bottom-8 w-max text-center">
              {getActiveStep === index && (
                <div className="flex items-center justify-center rounded-xl bg-gray-100 px-2 py-1">
                  <Typography
                    {...({} as React.ComponentProps<typeof Typography>)}
                    className="text-center text-xs font-medium text-primary_normal"
                  >
                    {step}
                  </Typography>
                </div>
              )}
            </div>
          </Step>
        );
      })}
    </Stepper>
  );
};

export default StepperComponent;
