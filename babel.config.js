/** @type {import('@babel/core').TransformOptions} */
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      '@babel/plugin-proposal-export-namespace-from',
      [
        'module-resolver',
        {
          root: ['.'],
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
          alias: {
            '^@app/(.+)': './app/\\1',
            '^@assets/(.+)': './assets/\\1',
          },
        },
      ],
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: process.env.ENVFILE || '.env',
          allowUndefined: false,
        },
      ],
    ],
  };
};
