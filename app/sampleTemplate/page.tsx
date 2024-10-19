import React from "react";
import SampleTemplate from "@components/sampleTemplate";

const Page = () => {
  return (
    <div className="w-full h-full p-4">
      <div className="w-full h-full p-4 bg-primary">
        <div className="w-full h-full p-4 bg-secondary">
          <div className="w-full h-full p bg-tertiary">
            <div className="w-full h-full p bg-quaternary">
              <div className="w-full h-full p bg-quinary">
                <div className="w-full h-full p bg-senary">
                  <div className="w-full h-full p-4 bg-septenary">
                    <div className="w-full h-full p-4 bg-octonary flex justify-center items-center" >
                        <SampleTemplate />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
