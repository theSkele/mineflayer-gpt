const mineflayer = require('mineflayer');
const { botSettings } = require('../config');

const options = {};

if (botSettings.config.host) options.host = botSettings.config.host;
if (botSettings.config.username) options.username = botSettings.config.username;
if (botSettings.config.auth) options.auth = botSettings.config.auth;
if (botSettings.config.port) options.port = botSettings.config.port;
if (botSettings.config.version) options.version = botSettings.config.version;
if (botSettings.config.password) options.password = botSettings.config.password;

if (botSettings.config.logErrors) options.logErrors = botSettings.config.logErrors;
if (botSettings.config.hideErrors) options.hideErrors = botSettings.config.hideErrors;
if (botSettings.config.client) options.client = botSettings.config.client;
if (botSettings.config.brand) options.brand = botSettings.config.brand;
if (botSettings.config.respawn) options.respawn = botSettings.config.respawn;
if (botSettings.config.plugins) options.plugins = botSettings.config.plugins;
if (botSettings.config.pluginName) options.pluginName = botSettings.config.pluginName;
if (botSettings.config.physicsEnabled) options.physicsEnabled = botSettings.config.physicsEnabled;
if (botSettings.config.chatLengthLimit) options.chatLengthLimit = botSettings.config.chatLengthLimit;
if (botSettings.config.defaultChatPatterns) options.defaultChatPatterns = botSettings.config.defaultChatPatterns;

if (botSettings.config.chat) options.chat = botSettings.config.chat;
if (botSettings.config.colorsEnabled) options.colorsEnabled = botSettings.config.colorsEnabled;
if (botSettings.config.viewDistance) options.viewDistance = botSettings.config.viewDistance;
if (botSettings.config.difficulty) options.difficulty = botSettings.config.difficulty;
if (botSettings.config.skinParts) options.skinParts = botSettings.config.skinParts;
if (botSettings.config.enableTextFiltering) options.enableTextFiltering = botSettings.config.enableTextFiltering;
if (botSettings.config.enableServerListing) options.enableServerListing = botSettings.config.enableServerListing;


const bot = mineflayer.createBot(options);

module.exports = bot;