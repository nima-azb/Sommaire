import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  ...compat.extends("next/core-web-vitals", "next/typescript", "prettier"),
  {
    plugins: {
      prettier: (await import("eslint-plugin-prettier")).default,
    },
    rules: {
      // Disable Prettier build errors
      "prettier/prettier": "warn",

      // React
      "react/no-unescaped-entities": "off",

      // TypeScript
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": "warn",

      // Optional (common ones people disable)
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-require-imports": "off",
    },
  },
];
