const mineflayer = require("mineflayer");
const pathfinder = require('mineflayer-pathfinder').pathfinder
const { requestGPT } = require("./utils/openai");
const { prompts, constructContext } = require("./prompts");
const { commands } = require("./commands");

const bot = mineflayer.createBot({
    host: 'localhost',
    username: 'openai',
    auth: 'offline',
    // port: 25565,
    // version: '1.20.1',
});

bot.loadPlugin(pathfinder);

bot.once('spawn', async () => {
    // Welcome Message, AI generated
    bot.chat(await requestGPT(await constructContext("spawn"), 1, 1, 0, 0));
});

bot.on('chat', async (username, message) => {
    if (username === bot.username) return;
    let interpreted = await requestGPT(await constructContext("interpret", message), 0.2, 0.8, 0, 0);
    console.log(`interpreted: ${interpreted}`);
    await handleInterpreted(bot, username, interpreted, message);
});

bot.on('kicked', console.log);
bot.on('error', console.log);

async function handleInterpreted(bot, username, interpreted, message) {
    if (commands[interpreted]) {
        console.log(message);
        console.log(interpreted);
        await commands[interpreted](bot, username, message);
    } else {
        bot.chat('Unknown command: ' + interpreted);
    }
}