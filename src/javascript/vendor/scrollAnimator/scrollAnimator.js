// Utils
import bindAll from "../../utils/bindAll";

class ScrollAnimator {
    constructor() {

        this.intersectionObserver = null;

        this._scrollTop = 0;

        this._inRange = false;

        this.animations = [];

        this.prevRatio = 0;
        this.pourcentage = 0;

        this.globalHeight = window.innerHeight;
        this.globalWidth = window.innerWidth;

        this._setupEventListener();
    
        this._bindAll();
        
    }

    // Adds a new animation Scroll to observe
    add({ elementToAnimate }) {
        let element = document.querySelector(elementToAnimate);
        // element.style.transition =  all";
        console.log(element)
        this.intersectionObserver.observe(element);
    }

    createObserver() {

        let numSteps = 100;

        let prevX = 0.0;
        this._buildThresholdList(numSteps)

        const innerHeight = window.innerHeight;

        this.intersectionObserver = new IntersectionObserver(this._handleIntersect, {
            rootMargin: `0px 0px ${0}px 0px`,
            threshold: this._buildThresholdList(numSteps)
        });
    }

    _buildThresholdList(numSteps) {
        let thresholds = [];

        for (let i = 1.0; i <= numSteps; i++) {
          let ratio = i/numSteps;
          thresholds.push(ratio);
        }
      
        thresholds.push(0);
        console.log(thresholds)
        return thresholds;
    }

    _handleIntersect(entries, observer) {
        entries.forEach(entry => {

            // if (entry.intersectionRatio > this.prevRatio) {
                // if (entry.isIntersecting) {
                    console.log(entry)
                // }
                console.log(entry.intersectionRatio)
                if (entry.isIntersecting) {
                    const xValue = entry.intersectionRatio * ((2120 * this.globalWidth) / 1500);
                    document.querySelector(".animated-box").style.transform = `translate(${xValue / 2}px, ${entry.intersectionRatio * 600}px)`;
                    // this.pourcentage++;
                }

                // console.log(this.pourcentage);
                
            // }
            // } else {
            //     console.log(entry.intersectionRatio * 10)
            //     entry.target.style.transform = `translateX(${entry.intersectionRatio * 500}px)`
            // }

            this.prevRatio = entry.intersectionRatio;
        });
    }

    _setupEventListener() {
        window.addEventListener('resize', this._handleResize);
    }

    _handleResize() {
        console.log("Resize");
        this.globalHeight = window.innerHeight;
        this.globalWidth = window.innerWidth;
    }

    _bindAll() {
        bindAll(this, "_handleIntersect", "_buildThresholdList", "_handleResize");
    }
}

export default ScrollAnimator;