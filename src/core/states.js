const bot = require('./bot');
const { BehaviorIdle, BotStateMachine, NestedStateMachine, StateTransition } = require('mineflayer-statemachine');
const targets = require('./targets');

const states = {
    interpret: require('./states/interpret'),
    chat: require('./states/chat'),
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
                child: botStates.interpret,
                shouldTransition: () => targets.interpret,
            }),
            new StateTransition({
                parent: botStates.interpret,
                child: idle,
                shouldTransition: () => !targets.interpret,
            }),
            new StateTransition({
                parent: botStates.interpret,
                child: botStates.chat,
                shouldTransition: () => targets.chat,
            }),
            new StateTransition({
                parent: idle,
                child: botStates.chat,
                shouldTransition: () => targets.chat,
            }),
            new StateTransition({
                parent: botStates.chat,
                child: idle,
                shouldTransition: () => !targets.chat,
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