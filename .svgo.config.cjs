module.exports = {
  multipass: true,
  js2svg: {
    indent: 2,
    pretty: true
  },
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeTitle: false,
          cleanupIds: false,
          removeUnknownsAndDefaults: {
            keepRoleAttr: true
          }
        }
      }
    },
    {
      name: 'removeAttrs',
      params: {
        attrs: ['svg:width', 'svg:height', '*:data-name']
      }
    }
  ]
};
