module.exports = {
  root: true,
  extends: ['handlebarlabs'],
  rules: {
    'react/jsx-closing-bracket-location': 0,
    'react/jsx-props-no-spreading': 0,
    'react/jsx-curly-new-line': 0,
    'no-param-reassign': 0,
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
        json: 'never',
      },
    ],
  },
}
