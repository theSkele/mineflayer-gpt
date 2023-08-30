module.exports = {
    // [$inputPrice, $outputPrice]
    // gpt-3.5-turbo: [$0.0015 for 1k token inputs, $0.002 for 1k token outputs]
    price: {
        'gpt-3.5-turbo': [0.0015, 0.002],
        'gpt-3.5-turbo-16k': [0.003, 0.004],
        'gpt-4': [0.03, 0.06],
        'gpt-4-32k': [0.06, 0.12]
    },
    model: 'gpt-3.5-turbo', // gpt-3.5-turbo, gpt-3.5-turbo-16k, gpt-4, gpt-4-32k

    prompts: {
        chat: `Your role is to engage players in conversation, providing them a friend to chat with.
Respond with Minecraft-themed replies, when applicable.
Responses should be relatively SHORT, 1 or 2 sentences ONLY`,
        interpret: `Your role is to interpret chat messages.
Given a Minecraft chat message, You will determine which behavior to execute.
Choose ONLY 1 behavior from the list that matches the context of the chat Message.
FORMAT REPLY in LOWERCASE and ONLY FUNCTION NAME, like: "zyz" or "behavior"!`,
    },
    botSettings: {
        config: {
            host: 'localhost', // ip or url of server
            username: 'mineflayer-gpt', // set username
            auth: 'offline' // 'microsoft', 'offline', or 'mojang'
            //port: 25565 // defaults to 25565
            //password: '12345678',
        // For options below, section 'mineflayer.createBot(options)': https://github.com/PrismarineJS/mineflayer/blob/master/docs/api.md#bot
            //logErrors: true,
            //hideErrors: true,
            //client: null,
            //brand: 'vanilla',
            //respawn: true,
            //plugins: {},
            //pluginName: false,
            //physicsEnabled: true,
            //chatLengthLimit: 256,
            //defaultChatPatterns: true,
            //chat: null,
            //colorsEnabled: null,
            //viewDistance: null,
            //difficulty: null,
            //skinParts: null,
            //enableTextFiltering: null,
            //enableServerListing: null
        },
        owner: 'theSkele' // Set to YOUR Minecraft Playername
    },
};