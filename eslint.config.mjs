import js from "@eslint/js";
import pluginNext from "@next/eslint-plugin-next";
import eslintConfigPrettier from "eslint-config-prettier";
import pluginReact from "eslint-plugin-react";
import pluginImport from "eslint-plugin-import";
import pluginReactHooks from "eslint-plugin-react-hooks";
import storybook from "eslint-plugin-storybook";
import globals from "globals";
import tseslint from "typescript-eslint";

/**
 * ESLint flat config matching blog-box app rules.
 * @type {import("eslint").Linter.Config[]}
 */
const blogBoxRules = [
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    ...pluginReact.configs.flat.recommended,
    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
  },
  {
    plugins: {
      "@next/next": pluginNext,
    },
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs["core-web-vitals"].rules,
    },
  },
  {
    plugins: {
      "react-hooks": pluginReactHooks,
    },
    settings: { react: { version: "detect" } },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
    },
  },
  {
    plugins: { import: pluginImport },
    rules: {
      "import/no-extraneous-dependencies": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-use-before-define": "error",
      "@typescript-eslint/no-shadow": "error",
      "@typescript-eslint/no-empty-function": "off",
      "react/no-array-index-key": "off",
      "react/jsx-props-no-spreading": "off",
      "react/button-has-type": "off",
      "react/no-unescaped-entities": "off",
      "react/require-default-props": "off",
      "no-shadow": "off",
      "no-use-before-define": "off",
      "no-debugger": "off",
      "no-async-promise-executor": "off",
      "no-await-in-loop": "off",
      "no-restricted-syntax": "off",
      "no-useless-constructor": "off",
      "consistent-return": "off",
      "class-methods-use-this": "off",
      "max-classes-per-file": "off",
      camelcase: "off",
      "prefer-regex-literals": "off",
      semi: ["error", "always"],
      quotes: ["error", "double"],
      "arrow-body-style": ["error", "always"],
      "jsx-a11y/anchor-is-valid": "off",
      "jsx-a11y/control-has-associated-label": "off",
      "jsx-a11y/label-has-associated-control": "off",
      "jsx-a11y/no-noninteractive-tabindex": "off",
      "jsx-a11y/click-events-have-key-events": "off",
      "jsx-a11y/no-static-element-interactions": "off",
      "jsx-a11y/no-noninteractive-element-interactions": "off",
    },
  },
  ...(Array.isArray(storybook.configs?.["flat/recommended"])
    ? storybook.configs["flat/recommended"]
    : []),
  {
    ignores: [
      "dist/**",
      ".next/**",
      "node_modules/**",
      "tailwind.config.js",
      "next.config.js",
      "postcss.config.js",
      "components/ui/**",
    ],
  },
];

export default blogBoxRules;
