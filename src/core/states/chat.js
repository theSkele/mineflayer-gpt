const { requestGPT } = require('../../utils/openai');
const chatManager = require('../../utils/chatManager');
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
            reply = await this.chat();
            this.bot.chat(reply);
            this.targets.reply = reply;
            this.targets.chat = false;
        };
        ChatState.prototype.onStateExited = function() {
            console.log(`Exited ${this.stateName} state`);
        };
        ChatState.prototype.chat = async function () {
            this.context.push({ role: 'user', content: this.targets.message });
        
            while (this.context.length > 51) {
                if (this.context[1].role === 'user') {
                    this.context.splice(1, 1);
                }
            }
        
            const reply = await requestGPT(this.context, 1.2, 0.5, 0.1, 0.25);
            this.context.push({ role: 'assistant', content: reply });
            this.targets.reply = reply;
            const chatMgr = chatManager(this.bot, this.targets, (message) => {});
            await chatMgr(this.targets.message);

            return reply
        };
        return ChatState;
    }()),
}