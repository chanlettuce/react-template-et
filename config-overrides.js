const path = require('path');

module.exports = function override(config) {
  config.target = 'electron-renderer';
  config.resolve = {
    ...config.resolve,
    alias: { '@': path.resolve(__dirname, 'src') }
  };

  return config;
};
