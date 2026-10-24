import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

// Unit tests sit beside their source (*.test.ts[x]); e2e/ is Playwright's.
// Coverage rules and exclusions: docs/checks.md.
export default defineConfig({
  oxc: { jsx: { runtime: "automatic" } },
  resolve: { alias: { "~": fileURLToPath(new URL(".", import.meta.url)) } },
  test: {
    environment: "jsdom",
    include: ["**/*.test.{ts,tsx}"],
    exclude: ["node_modules/**", ".next/**", "e2e/**"],
    setupFiles: ["./vitest.setup.ts"],
    restoreMocks: true,
    coverage: {
      provider: "v8",
      include: ["app/**/*.{ts,tsx}", "mdx-components.tsx"],
      exclude: ["**/*.test.{ts,tsx}", "**/__fixtures__/**", "app/layout.tsx"],
      thresholds: { lines: 85, statements: 85, functions: 85, branches: 85 },
    },
  },
});
