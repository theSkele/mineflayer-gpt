const { BehaviorFindBlock, BehaviorMineBlock } = require('mineflayer-statemachine');
const chatManager = require('../../utils/chatManager');

module.exports = {
    mineState: (function() {
        function MineState(bot, targets) {
            this.bot = bot;
            this.targets = targets;
            this.active = false;
            this.stateName = 'mine';
        };
        MineState.prototype.onStateEntered = async function () {
            console.log(`Entered ${this.stateName} state`);
            if (this.targets.block && this.targets.amount) {
                // Mines blocks, at targets.position; uses best tool
                this.findBlocks();
            } else {
                console.error(`Missing:\n \tBlock: ${this.targets.block}\n \tAmount: ${this.targets.amount}`);
                this.targets.awaitingPlayerResponse = true;
                await chatManager(this.bot, this.targets, (message = this.targets.message) => {
                    console.log(this.targets.message);
                });
            }
            // Mines 1 block, at targets.position; uses best tool
            // new BehaviorMineBlock(this.bot, this.targets);
        };
        MineState.prototype.onStateExited = function () {

        };
        MineState.prototype.findBlocks = function () {
            new BehaviorFindBlock(this.bot, this.targets);
        };
        return MineState;
    }()),
}