const path = require("path");


const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");
const { resolver: { sourceExts, assetExts } } = defaultConfig;

const {
 createSentryMetroSerializer
} = require("@sentry/react-native/dist/js/tools/sentryMetroSerializer");

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  transformer: {
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
  },
  resolver: {
    assetExts: assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...sourceExts, "svg"],
    resolverMainFields: ["sbmodern", "react-native", "browser", "main"],
  },
  watchFolders: [path.resolve(__dirname, "../")],
 serializer: {
  customSerializer: createSentryMetroSerializer()
 }
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
