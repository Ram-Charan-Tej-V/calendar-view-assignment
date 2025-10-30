import type { StorybookConfig } from "@storybook/react-webpack5";

const config: StorybookConfig = {
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx|mdx)"],
  addons: ["@storybook/addon-essentials"],
  babel: async (options) => ({
    ...options,
    presets: [...(options.presets || []), "@babel/preset-typescript"],
  }),
  webpackFinal: async (config) => {
    config.module?.rules?.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve("babel-loader"),
          options: {
            presets: [
              require.resolve("@babel/preset-env"),
              require.resolve("@babel/preset-react"),
              require.resolve("@babel/preset-typescript"),
            ],
          },
        },
      ],
    });
    config.resolve?.extensions?.push(".ts", ".tsx");
    return config;
  },
};

export default config;
