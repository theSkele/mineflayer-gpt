const fs = require('fs');
const dotenv = require('dotenv').config();

const mineflayer = require('mineflayer');
const { StateMachineWebserver } = require('mineflayer-statemachine');
const pathfinder = require('mineflayer-pathfinder').pathfinder;
const Movements = require('mineflayer-pathfinder').Movements
const { GoalNear } = require('mineflayer-pathfinder').goals;

const config = require('./config');
const queue = require('./utils/queue');
const openai = require('./utils/openai');

const bot = require('./core/bot');
const { getBehaviors, behaviors } = require('./core/behaviors');
const botBehaviors = behaviors(bot);
const { states } = require('./core/states');
const targets = require('./core/targets');
bot.loadPlugin(pathfinder);

bot.once('spawn', () => {
  console.log('Bot has spawned');
  const stateMachine = states(bot);
  console.log(`Started a state machine with ${stateMachine.transitions.length} transitions and ${stateMachine.states.length} states`);
  new StateMachineWebserver(bot, stateMachine);
});

bot.on('chat', async (username, message) => {
  targets.chatMessage = message;

  structMessage = [
    { role: 'system', content: `${config.prompts.interpret} \nList of Behavior Functions: ${getBehaviors()}` },
    { role: 'user', content: message },
  ];
  const interpreted = await openai.requestGPT(structMessage);
  let data = {};
  data.message = message;
  await queue.scheduleTask(async () => await handleInterpreted(interpreted, data), Date.now());
});

async function handleInterpreted(interpreted, data) {
  if (getBehaviors().includes(interpreted)) {
    targets[interpreted] = true;
  } else {
    console.error(`AI response is NOT valid behavior: ${interpreted}`);
  }
}

