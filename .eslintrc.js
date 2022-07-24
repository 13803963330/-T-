module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/standard'],
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/multi-word-component-names': 'off',
    'vue/return-in-computed-property': 'off',
    camelcase: 'off',
    'vue/no-side-effects-in-computed-properties': 'off',
    'key-spacing': 'off',
    'vue/valid-template-root': 'off',
    'vue/no-dupe-keys': 'off',
    'no-undef': 'off',
    'space-before-function-paren': 'off',
    'no-dupe-keys':'off',
    'vue/no-parsing-error':'off',
    'no-const-assign':'off',
    'no-unused-vars':'off'
  }
}
