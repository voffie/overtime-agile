export const timer = {

    startTime: 0,
    elapsedTime: 0,
    running: false,
    interval: null,

    start(callback) {

        if (this.running) return

        this.running = true
        this.startTime = Date.now() - this.elapsedTime

        this.interval = setInterval(() => {

            this.elapsedTime = Date.now() - this.startTime

            if (callback) {
                callback(this.getFormattedTime())
            }

        }, 1000)
    },

    stop() {
        if (!this.running) return
        this.running = false
        clearInterval(this.interval)
    },

    reset() {
        this.stop()
        this.elapsedTime = 0
    },

    getFormattedTime() {
        const hours = Math.floor(this.elapsedTime / 3600000)
        const minutes = Math.floor((this.elapsedTime % 3600000) / 60000)
        const seconds = Math.floor((this.elapsedTime % 60000) / 1000)
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    },

    getElapsedTimeInSeconds() {
        const seconds = Math.floor((this.elapsedTime % 60000) / 1000)
        return seconds
    }
};
