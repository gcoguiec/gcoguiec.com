module.exports = {
  root: true,
  extends: ['@gcoguiec/stylelint-config'],
  plugins: ['stylelint-prettier'],
  overrides: [
    {
      files: ['**/*.scss'],
      customSyntax: 'postcss-scss'
    },
    {
      files: ['**/*.(html|vue)'],
      customSyntax: 'postcss-html'
    }
  ],
  rules: {
    'prettier/prettier': true
  }
};
