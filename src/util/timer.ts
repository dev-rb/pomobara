export class Timer {

    start = Date.now()
    elapsedTime = 0
    expected = 0
    interval = 1000

    timerStore = 0
    callback: Function | null = null

    duration = 0

    constructor(duration?: number, interval?: number, callback?: Function) {
        this.duration = duration || 0
        this.interval = interval || 1000
        this.callback = callback || null
    }

    startTimer() {
        this.expected = Date.now() + this.interval;
        this.timerStore = setTimeout(this.timerStep.bind(this), this.interval);
    }

    stopTimer() {
        clearTimeout(this.timerStore);
    }

    timerStep() {
        let drift = Date.now() - this.expected;
        if (drift > this.interval) {
            console.log("Return")
            return;
        }

        if (this.callback) {
            this.callback();
        }
        // console.log("Test")

        this.expected += this.interval;
        this.timerStore = setTimeout(this.timerStep.bind(this), Math.max(0, this.interval - drift));
    }
}