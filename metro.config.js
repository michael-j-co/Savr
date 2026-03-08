const { getDefaultConfig } = require('expo/metro-config');

/**
 * Metro config extended to support importing SVGs as React components
 * via react-native-svg-transformer.
 */
module.exports = (() => {
  const config = getDefaultConfig(__dirname);
  const { transformer, resolver } = config;
  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve('react-native-svg-transformer/expo'),
  };
  config.resolver.assetExts = resolver.assetExts.filter((ext) => ext !== 'svg');
  config.resolver.sourceExts = [...resolver.sourceExts, 'svg'];
  return config;
})();
