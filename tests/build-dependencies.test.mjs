import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { runInNewContext } from "node:vm";
import test from "node:test";

const require = createRequire(import.meta.url);

test("patched schema loader still compiles TypeScript into executable code", () => {
  const { transformSync } = require("@esbuild-kit/core-utils");
  const result = transformSync(
    "const count: number = 2; export default count + 1;",
    "/tmp/schema-loader-compatibility.ts",
    { format: "cjs" },
  );
  const module = { exports: {} };
  runInNewContext(result.code, { module, exports: module.exports });
  assert.equal(module.exports.default, 3);
});

test("patched Satori compression dependency preserves ZIP file contents", () => {
  const satoriRequire = createRequire(require.resolve("satori"));
  const { strToU8, strFromU8, zipSync, unzipSync } = satoriRequire("fflate");
  const text = "Typography compatibility: café, naïef, español.";
  const restored = unzipSync(zipSync({ "sample.txt": strToU8(text) }));
  assert.deepEqual(Object.keys(restored), ["sample.txt"]);
  assert.equal(strFromU8(restored["sample.txt"]), text);
});
