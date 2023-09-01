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
const chatManager = require('./utils/chatManager');

const bot = require('./core/bot');
const { states, getStates } = require('./core/states');
const targets = require('./core/targets');
bot.loadPlugin(pathfinder);

bot.once('spawn', () => {
  console.log('Bot has spawned');
  const stateMachine = states(bot);
  console.log(`Started a state machine with ${stateMachine.transitions.length} transitions and ${stateMachine.states.length} states`);
  new StateMachineWebserver(bot, stateMachine);
  targets.states = getStates();
});

bot.on('chat', (username, message) => {
  targets.message = message;
  chatManager(bot, targets, (message) => {
      console.log(targets);
  })(message);
});
