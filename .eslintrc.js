module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
  ],
  parser: 'babel-eslint',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    "linebreak-style": 0,
    "indent": ["error", 4],
    "import/no-extraneous-dependencies": ["error", { "devDependencies": true }]
  },
  settings: {
    "import/no-extraneous-dependencies": [
      "error",
      {
        "perDependencies": true
      }]
  },
};