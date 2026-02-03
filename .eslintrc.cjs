module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ["eslint:recommended", "plugin:react-hooks/recommended"],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["react-refresh"],
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    // 配置 no-unused-vars 规则，忽略以大写字母开头的变量（React 组件约定）
    "no-unused-vars": [
      "warn",
      {
        varsIgnorePattern: "^[A-Z]", // 忽略以大写字母开头的变量（React 组件）
        argsIgnorePattern: "^_", // 忽略以 _ 开头的参数
      },
    ],
  },
};
