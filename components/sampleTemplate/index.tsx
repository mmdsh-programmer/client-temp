"use client";

import Button from "@material-tailwind/react/components/Button";
import React from "react";

const SampleTemplate = () => {
  return (
    <Button {...({} as React.ComponentProps<typeof Button>)} className="bg-primary p-5">
      SampleTemplate
    </Button>
  );
};

export default SampleTemplate;
