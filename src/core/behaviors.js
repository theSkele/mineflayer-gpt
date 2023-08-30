const behaviors = {
    chat: require('./behaviors/chat'),
    move: require('./behaviors/move'),
    mine: require('./behaviors/mine'),
    craft: require('./behaviors/craft'),
    smelt: require('./behaviors/smelt'),
    collect: require('./behaviors/collect'),
    explore: require('./behaviors/explore'),
    interact: require('./behaviors/interact'),
    consume: require('./behaviors/consume'),
    equip: require('./behaviors/equip'),
    attack: require('./behaviors/attack'),
    defend: require('./behaviors/defend'),
};


module.exports = {
    behaviors: function(bot) {
        const botBehaviors = {};
        for (const behavior in behaviors) {
            botBehaviors[behavior] = (data) => {
                behaviors[behavior](bot, data);
            }
        }
        return botBehaviors;
    },
    getBehaviors: function() {
        return Object.keys(behaviors);
    }
}