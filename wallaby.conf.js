module.exports = function (wallaby) {
  return {
    files: [
      'apis/**/*.ts'
    ],

    tests: [
      'apis/**/*.test.ts'
    ],
    env: {
      type: 'node',
      params: {
        env: 'NODE_OPTIONS=--experimental-vm-modules'
      }
    },
    testFramework: "jest",
    compilers: {
      "**/*.+(t|j)s?(x)": wallaby.compilers.typeScript({
        outDir: './any',
      }),
    },
  };
};