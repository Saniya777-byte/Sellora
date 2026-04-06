module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', 'node_modules', 'coverage', 'public'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  settings: {
    react: { version: 'detect' },
  },
  plugins: ['react-refresh'],
  rules: {
    // React Refresh (HMR)
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

    // Code quality
    'no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: true }],
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-debugger': 'error',
    'eqeqeq': ['error', 'always', { null: 'ignore' }],
    'prefer-const': 'error',
    'no-var': 'error',
    'no-duplicate-imports': 'error',

    // React
    'react/prop-types': 'off',
    'react/display-name': 'warn',
  },
  overrides: [
    // Test files – relax rules
    {
      files: ['**/*.test.{js,jsx}', '**/*.spec.{js,jsx}', 'src/setupTests.js'],
      env: { node: true },
      rules: {
        'no-console': 'off',
        'react-refresh/only-export-components': 'off',
        'no-unused-vars': 'warn',
      },
    },
  ],
};
