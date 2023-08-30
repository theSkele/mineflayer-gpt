const { requestGPT } = require('../../utils/openai');
const config = require('../../config');

let context = [
    { role: 'system', content: config.prompts.chat },
];

module.exports = async function (bot, targets) {
    console.log(`targets.chatMessage ${targets.chatMessage}`);
    context.push({ role: 'user', content: targets.chatMessage });

    while (context.length > 51) {
        if (context[1].role === 'user') {
            context.splice(1, 1);
        }
    }
    console.log(context);

    const reply = await requestGPT(context, 1.2, 0.5, 0.1, 0.25);
    bot.chat(reply);
}