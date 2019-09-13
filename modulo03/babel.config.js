module.exports = {
  presets: [
    "@babel/preset-env", //Make things understood that browser does not understand, example: import / export
    "@babel/preset-react" //Make things understood that browser does not understand, example: JSX
  ],
  plugins: ["@babel/plugin-proposal-class-properties"]
};
