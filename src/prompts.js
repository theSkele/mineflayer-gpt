module.exports = {
    constructContext: async function (promptName, userInput) {
        let context;
        if(userInput === undefined) {
            context = [{ role: 'system', content: prompts[promptName] }]
        } else {
            context = [{ role: 'system', content: prompts[promptName] }, { role: 'user', content: userInput }]
        }
        return context;
    }
}

const prompts = {
    interpret: `Interpret the meaning of the provided user message and choose a corresponding command (YOUR RESPONSE SHALL BE ONLY the single word command name [string] provided AND NOTHING ELSE): 'mine', 'chat'`,
    interpretMining: `Given a Minecraft Player Message requesting to mine, what is the Minecraft Block being requested and amount of such block; RESPOND ONLY FORMATTED LIKE SO: '{ "block": "grass_block", "amount": 64 }' and NOTHING ELSE, ONLY BLOCK AND AMOUNT FORMATTED LIKE A JAVASCRIPT OBJECT WITH DOUBLE QUOTES FOR STRINGS!!`,
    spawn: `You are a Minecraft player who just spawned in. In few words, greet the world however you choose! 1 Sentence, Few words ONLY!`,
    chat: `Simply respond ONLY within context and appropriate tone the player is talking in. Be a friend by mirroring their language, humans like this`,
}