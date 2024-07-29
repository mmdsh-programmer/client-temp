import React from "react";
import { Step, Stepper, Typography } from "@material-tailwind/react";
import { StepperIcon, TickIcon } from "@components/atoms/icons";

interface IProps {
  getActiveStep: number;
  stepList: string[];
}

const StepperComponent = ({ getActiveStep, stepList }: IProps) => {
  return (
    <Stepper
      activeStep={getActiveStep}
      placeholder="stepper"
      lineClassName={`bg-transparent !border-b-gray-300 border-b-2 border-dashed`}
      activeLineClassName="!bg-transparent border-b-0"
    >
      {stepList.map((step, index) => {
        return (
          <Step
            key={step}
            placeholder="step"
            className="h-8 w-8"
            activeClassName="!bg-gray-400"
            completedClassName="bg-purple-normal"
          >
            {getActiveStep > index ? (
              <TickIcon className="h-full w-full" />
            ) : (
              <StepperIcon
                className={`h-full w-full 
              ${getActiveStep === index ? "!fill-purple-normal" : "fill-gray-50"}
              `}
              />
            )}
            <div className="absolute -bottom-8 w-max text-center">
              {getActiveStep === index && (
                <div className="bg-gray-100 px-2 py-1 rounded-xl flex justify-center items-center">
                  <Typography
                    placeholder="step"
                    className="font-medium font-iranYekan text-center text-primary text-xs"
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
