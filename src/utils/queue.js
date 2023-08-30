module.exports = {
    taskQueue: [],
    currentTaskNonce: 0,

    scheduleTask: async function (task, nonce) {
        this.taskQueue.push({ task, nonce });
        if (this.currentTaskNonce === 0) {
            await this.runTaskQueue();
        }
    },

    runTaskQueue: async function () {
        while (this.taskQueue.length > 0) {
            const { task, nonce } = this.taskQueue.shift();
            this.currentTaskNonce = nonce;
            await task();
            this.currentTaskNonce = 0;
        }
    },
}