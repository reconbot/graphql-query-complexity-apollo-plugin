export default {
  input: './dist-ts/index.js',
  output: [
    { format: 'esm', file: './dist/index-esm.mjs' },
    { format: 'umd', name: 'streamingIterables', file: './dist/index.js' },
  ],
  external: [],
}
