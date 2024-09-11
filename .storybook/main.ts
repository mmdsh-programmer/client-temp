import type { StorybookConfig } from "@storybook/nextjs";
import webpack from "webpack";

const config: StorybookConfig = {
  stories: [
    "../components/atoms/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../components/molecules/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../components/organisms/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../components/templates/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],

  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
    "storybook-addon-module-mock",
    "msw-storybook-addon",
    "@storybook/addon-a11y",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },

  core: {
    builder: "webpack5",
  },

  features: {
    experimentalRSC: true,
  },
  staticDirs: ["../public"],

  webpackFinal: async (config) => {
    config.resolve = {
      ...config.resolve,
      fallback: {
        ...config.resolve?.fallback,
        crypto: require.resolve("crypto-browserify"),
        stream: require.resolve("stream-browserify"),
        buffer: require.resolve("buffer/"),
      },
    };

    config.plugins?.push(
      new webpack.ProvidePlugin({
        process: "process/browser",
        Buffer: ["buffer", "Buffer"],
      }),
    );

    return config;
  },
};
export default config;
