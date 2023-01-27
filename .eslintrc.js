module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
  },
  extends: ['@js-omar/eslint-config/.eslintrc.base.js'],
  overrides: [
    {
      files: ['*.ts'],
      extends: ['@js-omar/eslint-config/.eslintrc.typescript.js'],
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json'],
        sourceType: 'module',
      },
    },
    {
      files: ['*.js', '*.jsx'],
      extends: ['@js-omar/eslint-config/.eslintrc.javascript.js'],
    },
  ],
  ignorePatterns: ['node_modules', 'tmp', 'android', 'ios', 'dist'],
};
