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
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  staticDirs: ["..\\public"],
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

    config.plugins = [
      ...(config.plugins || []),
      new webpack.ProvidePlugin({
        Buffer: ["buffer", "Buffer"],
        process: "process/browser",
      }),
    ];

    return config;
  },
};
export default config;
