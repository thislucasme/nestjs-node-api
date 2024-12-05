module.exports = {
  parser: '@typescript-eslint/parser', 
  parserOptions: {
    ecmaVersion: 2020, 
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended', 
    'plugin:import/typescript', 
    'prettier', 
  ],
  plugins: ['@typescript-eslint', 'import'], 
  rules: {
    '@typescript-eslint/no-unused-vars': 'warn', 
    '@typescript-eslint/no-explicit-any': 'off', 
    'import/no-unresolved': 'off',
    'no-console': 'off',
  },
};
