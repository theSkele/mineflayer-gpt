const fs = require('fs');
const { OpenAI } = require('openai');
const prompts = require('../prompts');
const logger = require('./logger');
require('dotenv').config();

// Price per 1k tokens
const price = {
    'gpt-3.5-turbo': [0.0005, 0.0015],
    'gpt-4o': [0.005, 0.015],
}
const model = process.env.OPENAI_MODEL;

module.exports = {
    // messagesObjArray = [{ role: 'system', content: `abc123` }, { role: 'user', content: `xyz123` }]
    requestGPT: async function(messagesObjArray, temp, top_p, presence, frequency) {
        const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

        const completion = await openai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: messagesObjArray,
            temperature: temp || 0.1,
            top_p: top_p || 0.5,
            presence_penalty: presence || 0,
            frequency_penalty: frequency || 0,
        });
        
        const reply = completion.choices[0].message.content;
        const inputTokens = completion.usage.prompt_tokens;
	    const outputTokens = completion.usage.completion_tokens;
	    const cost = ((inputTokens/1000) * price[model][0]) + ((outputTokens/1000) * price[model][1]);
	    logger.info({ inputMessage: messagesObjArray, outputMessage: reply, cost: cost });
	    //logger.info({ totalCost: calcTotalCost() });
        return reply;
    },
};

function calcTotalCost() {
    const data = fs.readFileSync('usage.log', 'utf8');
    const lines =  data.split('\n');
    let totalCost = 0;
    lines.forEach(line => {
        if (line) {
            const log = JSON.parse(line);
            totalCost += log.cost;
        }
    });
    return totalCost;
}