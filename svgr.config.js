module.exports = {
  plugins: [
    "@svgr/plugin-jsx",
    {
      svgo: false,
    },
  ],
  jsx: {
    babelConfig: {
      plugins: [
        [
          "@babel/plugin-transform-react-jsx",
          {
            pragma: "h",
            pragmaFrag: "Fragment",
          },
        ],
      ],
    },
  },
};
