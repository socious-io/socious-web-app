module.exports = {
  extends: ['next/core-web-vitals', 'plugin:storybook/recommended'],
  rules: {
    'prettier/prettier': 'error',
    'array-bracket-spacing': ['error', 'never'],
    'object-curly-spacing': ['error', 'never'],
    '@next/next/no-img-element': 'off',
  },
  plugins: ['prettier'],
};
