const bot = require('./bot');
const { BehaviorIdle, BotStateMachine, NestedStateMachine, StateTransition } = require('mineflayer-statemachine');
const targets = require('./targets');

const states = {
    chat: require('./states/chat'),
    mine: require('./states/mine'),
}

module.exports = {
    states: function(bot) {
        const botStates = {};
        for (const state in states) {
            const stateConstructor = Object.values(states[state])[0];
            botStates[state] = new stateConstructor(bot, targets);
        }
        const idle = new BehaviorIdle(bot);
        const transitions = [
            new StateTransition({
                parent: idle,
                child: botStates.chat,
                shouldTransition: () => targets.chat,
            }),
            new StateTransition({
                parent: idle,
                child: botStates.mine,
                shouldTransition: () => targets.mine,
            }),
            new StateTransition({
                parent: botStates.chat,
                child: idle,
                shouldTransition: () => !targets.chat,
            }),
            new StateTransition({
                parent: botStates.mine,
                child: idle,
                shouldTransition: () => !targets.mine,
            }),

        ];
        const rootLayer = new NestedStateMachine(transitions, idle);
        const stateMachine = new BotStateMachine(bot, rootLayer);
        return stateMachine;
    },
    getStates: function() {
        return Object.keys(states);
    },
};