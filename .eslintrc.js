module.exports = {
  parserOptions: {
    ecmaVersion: 2017
  },
  extends: ['plugin:prettier/recommended'],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'prettier/prettier': ['error', { printWidth: 120 }],
  },
};
