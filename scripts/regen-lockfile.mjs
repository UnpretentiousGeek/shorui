import { execSync } from "child_process";

console.log("Regenerating pnpm-lock.yaml...");
execSync("pnpm install --no-frozen-lockfile", {
  stdio: "inherit",
  cwd: process.cwd(),
});
console.log("Done! Lockfile regenerated.");
