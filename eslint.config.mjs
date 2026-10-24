import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({ baseDirectory: dirname(fileURLToPath(import.meta.url)) });

// Rules and their reasons: docs/checks.md.
const config = [
  { ignores: [".next/", "node_modules/", "next-env.d.ts", "coverage/", "playwright-report/", "test-results/"] },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "max-lines": ["error", { max: 300, skipBlankLines: true, skipComments: true }],
      "max-lines-per-function": ["error", { max: 60, skipBlankLines: true, skipComments: true }],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/consistent-type-imports": "error",
      "react/button-has-type": "error",
      "no-console": ["error", { allow: ["error"] }],
      "import/order": ["error", { alphabetize: { order: "asc" } }],
      // Images are plain <img> sized by Tailwind classes; moving to next/image is a
      // separate, visual change. See docs/checks.md.
      "@next/next/no-img-element": "off",
    },
  },
  {
    files: ["**/*.test.ts", "**/*.test.tsx", "e2e/**"],
    rules: {
      "max-lines": ["error", { max: 700, skipBlankLines: true, skipComments: true }],
      "max-lines-per-function": "off",
    },
  },
];

export default config;
