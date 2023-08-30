const chatBehavior = require('../behaviors/chat');

module.exports = {
    chatState: (function() {
        function ChatState(bot, targets) {
            this.bot = bot;
            this.targets = targets;
            this.active = false;
            this.stateName = 'chat';
        };
        ChatState.prototype.onStateEntered = async function() {
            console.log(`Entered ${this.stateName} state`);
            console.log(this.targets);
            await chatBehavior(this.bot, this.targets)
            this.targets.chatMessage = null;
            this.targets.chat = false;
        };
        ChatState.prototype.onStateExited = function() {
            console.log(`Exited ${this.stateName} state`);
        };
        return ChatState;
    }()),
}