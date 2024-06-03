const { constructContext } = require("./prompts")
const { requestGPT } = require("./utils/openai");
const logger = require("./utils/logger");
const Movements = require('mineflayer-pathfinder').Movements
const { GoalGetToBlock } = require('mineflayer-pathfinder').goals

module.exports = {
    commands: {
        "chat": async (bot, username, message) => {
            reply = await requestGPT(await constructContext("chat"), 1, 1, 0, 0);
            bot.chat(reply);
        },
        "mine": async (bot, username, message) => {
            let mcData = require('minecraft-data')(bot.version);
            const defaultMovements = new Movements(bot);
            defaultMovements.canDig = false;
            reply = JSON.parse(await requestGPT(await constructContext("interpretMining", message), 0.2, 1, 0, 0));
            // Reply will contain block + amount { "block": "grass", "amount": 64 }
            for (let i = 0; i < reply.amount; i++) {
                const target = bot.findBlock({
                    matching: mcData.blocksByName[reply.block].id
                });
                if (!bot.canDigBlock) {
                    logger.error(`Cannot Dig Block ${target}`);
                    return;
                }
                try {
                    bot.pathfinder.setMovements(defaultMovements);
                    let goal = await new GoalGetToBlock(target.position.x, target.position.y, target.position.z);
                    await bot.pathfinder.goto(goal);
                    await bot.dig(target);
                } catch (err) {
                    logger.error(err);
                }
            }
        }
    }
}