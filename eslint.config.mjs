import next from "eslint-config-next";

const eslintConfig = [
  ...next,
  {
    ignores: ["legacy/**", ".next/**", "node_modules/**", "out/**"],
  },
];

export default eslintConfig;
