module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/recommended',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': 'error',
    'no-debugger': 'error',
    'no-return-assign': 0,
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: [
          'state',
          'acc',
          'e',
          'ctx',
          'req',
          'request',
          'res',
          'response',
          '$scope',
        ],
      },
    ],
    'vue/max-attributes-per-line': ['error', {
      singleline: 3,
      multiline: {
        max: 1,
        allowFirstLine: false,
      },
    }],
    'vue/no-template-shadow': 'error',
    'vue/require-prop-types': 'error',
    'vue/require-default-prop': 'warn',
    'vue/no-v-html': 'warn',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
