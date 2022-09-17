module.exports = {
  extends: ['next/core-web-vitals'],
  rules: {
    'prettier/prettier': 'error',
    'array-bracket-spacing': ['error', 'never'],
    'object-curly-spacing': ['error', 'never'],
  },
  plugins: ['prettier'],
};
