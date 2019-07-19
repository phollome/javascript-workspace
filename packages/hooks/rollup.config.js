export default {
  input: "./src/index.js",
  output: {
    file: "./dist/hooks.js",
    format: "cjs",
  },
  external: ["react"],
};
