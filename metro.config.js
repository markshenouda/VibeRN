// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Configure src/app as the app directory for expo-router
config.resolver.sourceExts = [...config.resolver.sourceExts, 'mjs'];

module.exports = config;
