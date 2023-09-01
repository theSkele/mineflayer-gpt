const { requestGPT } = require('../../utils/openai');
const config = require('../../config');
const queue = require('../../utils/queue');

module.exports = {
    interpretState: (function() {
        function InterpretState(bot, targets) {
            this.bot = bot;
            this.targets = targets;
            this.active = false;
            this.stateName = 'interpret';
        };
        InterpretState.prototype.onStateEntered = async function() {
            console.log(`Entered ${this.stateName} state`);
            this.interpretContext = [
                { role: 'system', content: `${config.prompts.interpret} \n${this.targets.states}` },
                { role: 'user', content: this.targets.message },
            ];
            this.continueChatContext = [
                { role: 'system', content: config.prompts.chatCheck },
                { role: 'assistant', content: `Your last reply: \n${this.targets.reply}` || `No previous reply` },
                { role: 'user', content: `Player's message: \n${this.targets.message}` },
              ];
            console.log(this.targets);
            if (await this.continueChatCheck()) {
                this.targets.interpret = false;
                this.targets.chat = true;
            } else {
                interpreted = await requestGPT(this.interpretContext)
                await queue.scheduleTask(async () => await this.handleInterpreted(interpreted), Date.now());
                this.targets.interpret = false;
            };
        };
        InterpretState.prototype.onStateExited = async function() {
            console.log(`Exited ${this.stateName} state`);
        };
        InterpretState.prototype.handleInterpreted = async function(interpreted) {
            if (this.targets.states.includes(interpreted)) {
                this.targets.message[interpreted] = true;
            } else {
                console.error(`GPT response is NOT valid state: ${interpreted}`);
            }
        };
        InterpretState.prototype.continueChatCheck = async function() {
            const reply = await requestGPT(this.continueChatContext);
            console.log(reply);
            if (reply.includes('continue')) {
                return true;
            } else if (reply.includes('new')) {
                return false;
            } else {
                console.error(`GPT response is NOT 'continue' or 'state': ${reply}`);
                return false;
            }
        };
        return InterpretState;
    }()),
}