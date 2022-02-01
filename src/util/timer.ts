export class Timer {

    start = 0
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
        this.start = Date.now();
        this.expected = Date.now() + this.interval;
        // console.log("Elapsed", this.duration, this.start)
        this.timerStore = setTimeout(this.timerStep.bind(this), this.interval);
    }

    stopTimer() {
        clearTimeout(this.timerStore);
    }

    getTime() {
        // console.log(new Date(this.elapsedTime).getMilliseconds())
        return this.elapsedTime;
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
        this.duration -= this.interval;
        // console.log(new Date(this.elapsedTime).getSeconds())
        // console.log(this.elapsedTime)

        this.expected += this.interval;
        this.timerStore = setTimeout(this.timerStep.bind(this), Math.max(0, this.interval - drift));
    }
}