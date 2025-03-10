module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  overrides: [
    {
      plugins: [
        [
          "@babel/plugin-transform-private-methods",
          {
            loose: true,
          },
        ],
      ],
    },
  ],
  plugins: [
    [
      "module:react-native-dotenv",
      {
        moduleName: "@env",
      },
    ],
  ],
};
