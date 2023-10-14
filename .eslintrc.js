module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'prettier'
  ],
  plugins: ['@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    // tsconfigRootDir: __dirname,
  },
  root: true,
  overrides: [
    {
      files: ['*.js', '*.jsx'],
      extends: ['plugin:@typescript-eslint/disable-type-checked'],
    },
  ],
};
