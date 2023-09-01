const { requestGPT } = require('../../utils/openai');
const config = require('../../config');

module.exports = {
    chatState: (function() {
        function ChatState(bot, targets) {
            this.bot = bot;
            this.targets = targets;
            this.active = false;
            this.stateName = 'chat';
            this.context = [{ role: 'system', content: config.prompts.chat }];
        };
        ChatState.prototype.onStateEntered = async function() {
            console.log(`Entered ${this.stateName} state`);
            console.log(this.targets);
            reply = await this.chat(this.bot, this.targets)
            this.bot.chat(reply);
            this.targets.reply = reply;
            this.targets.message = null;
            this.targets.chat = false;
        };
        ChatState.prototype.onStateExited = function() {
            console.log(`Exited ${this.stateName} state`);
        };
        ChatState.prototype.chat = async function (bot, targets) {
            this.context.push({ role: 'user', content: targets.message });
        
            while (this.context.length > 51) {
                if (this.context[1].role === 'user') {
                    this.context.splice(1, 1);
                }
            }
            console.log(this.context);
        
            const reply = await requestGPT(this.context, 1.2, 0.5, 0.1, 0.25);
            this.context.push({ role: 'assistant', content: reply });
            targets.reply = reply;
            return reply;
        };
        return ChatState;
    }()),
}