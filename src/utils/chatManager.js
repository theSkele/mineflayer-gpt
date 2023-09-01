const { requestGPT } = require('./openai');
const config = require('../config');
const queue = require('./queue');
module.exports = function chatManager(bot, targets, callback) {
    return async function(message) {
        if (targets.awaitingPlayerResponse) {
            playerReplied(message);
            targets.awaitingPlayerResponse = false;
        }
        await queue.scheduleTask(async () => {
            targets.state = await determineNewState(message);
        }, Date.now());
        
        if (await requiresPlayerInput(message)) {
            bot.chat(await generatePrompt(message));
            targets.awaitingPlayerResponse = true;
        }
        callback(message);
    };

    async function determineNewState(message) {
        const context = [
            { role: 'system', content: `${config.prompts.interpret} \n${targets.states}` },
            { role: 'user', content: message },
        ];
        const interpreted = await requestGPT(context);
        if (targets.states.includes(interpreted)) {
            targets[interpreted] = true;
        } else {
            console.error(`GPT response is NOT valid state: ${interpreted}`);
        }
        return interpreted;
    }

    async function requiresPlayerInput(message) {
        const context = [
            { role: 'system', content: `Player's Message interpreted as State: ${targets.state}, What data is missing? If none, reply ONLY 'none'. FORMAT REPLY as Javascript OBJECT: { missing: 'none' }, { missing: 'blocks', 'amount' }` },
            { role: 'user', content: `Player's message: ${message}` },
        ];
        const reply = await requestGPT(context);
        if (!reply.missing == 'none') {
            generateReply(reply);
        } 
    }

    async function playerReplied(message) {
        console.log(message);
    }

    async function generateReply(message) {
        const context = [
            { role: 'system', content: `To execute State: ${targets.state}, we need to ask player for ${message}` },
            { role: 'system', content: `Generate a question relevant to ${targets.state}, asking player for missing data.` },
            { role: 'system', content: `Example: player requested mining but missing amount of block to mine, so ask 'How many of x Blocks?' or similar` }
        ];
        bot.chat(requestGPT(context));
    }
}