module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["./tsconfig.app.json", "./tsconfig.node.json"]
  },
  plugins: ["@typescript-eslint", "react", "react-hooks", "react-refresh"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended"
  ],
  settings: {
    react: {
      version: "detect"
    }
  },
  ignorePatterns: ["dist/", "coverage/"],
  rules: {
    "react/react-in-jsx-scope": "off",
    "react-refresh/only-export-components": "warn"
  }
};
