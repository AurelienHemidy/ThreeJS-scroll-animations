class LoaderUI {
    constructor(el) {
        this.el = document.querySelector(`#${el}`);
        this._lastProgressValue = 0;
    }

    _counter(from, to, duration) {
        // Convert duration from seconds to milliseconds
        const durationInSeconds = duration * 1000;

        // Create the setInterval value
        const interval = durationInSeconds / (to - from);

        let progress = from;

        const counter = setInterval(() => {
            progress++;
            // Clear interval if finish
            if (progress === to) {
                clearInterval(counter);
                this._lastProgressValue = to;
            } 

            this.el.innerText = progress;
        }, interval)
    }

    setLoaderProgress(progress) {
        this._counter(this._lastProgressValue, progress, 1);
    }

    //Quand le loading est terminé, le laoder disparait
    toggleLoader() {
        setTimeout(() => {
            this.el.style.opacity = 0;
        }, 1000);
    }

}

export default LoaderUI;