import { FunctionComponent } from "react";

export interface TypeAnimationProps {
    sequence: Array<string | number>;
    wrapper?: string;
    repeat?: number;
    cursor?: boolean;
    className?: string;
}

declare const TypeAnimation: FunctionComponent<TypeAnimationProps>;

export default TypeAnimation;

declare global {
    interface Window {
      metrics: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [key: string]: any;
      };
    }
  }