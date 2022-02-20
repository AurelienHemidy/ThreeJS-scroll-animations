import bindAll from "../../utils/bindAll";

class OnScrollAnimator {
    constructor() {

        this._intersectionObserver = null;

        this.animations = [];

        this.globalHeight = window.innerHeight;
        this.globalWidth = window.innerWidth;

        this.scrollAnimationValue = 0;
        this.previousScroll = 0;

        this._bindAll();
    }

    add(element, marginBottom, x) {
        // Ajoute une animation et un listener qui écouté quand l'élément est en vue
        // Element à animer
        // pourcentage après lequel l'élement sera animer
        // De combien de pixel il sera animer
        const elementToAdd = document.querySelector(element);
        console.log(elementToAdd.getBoundingClientRect());
        const animation = {
            target: elementToAdd,
            position: {
                x: elementToAdd.getBoundingClientRect().left,
                y: elementToAdd.offsetTop
            },
            marginBottom: marginBottom,
            x: x
        }
        this.animations.push(animation);
    }

    setup() {
        this._setupEventListener();
    }

    _setupEventListener() {
        window.addEventListener('scroll', this._handleScroll);
        window.addEventListener('resize', this._handleResize);
    }

    _handleScroll() {
        const scrollY = window.scrollY + innerHeight;

        

    
        this.animations.forEach(animation => {
            if (scrollY < animation.position.y || scrollY > animation.position.y + animation.target.offsetHeight) {
                // Not visible
                console.log(false);
                // document.querySelector(".animated-box").style.transform = `translate(${xValue}px, ${0}px)`;
                // this.scrollAnimationValue = 0;
            } else {
                // Visible
                console.log(true);

                console.log(scrollY)
                // if (scrollY > this.previousScroll) {
                //     // Si on scroll plus bas
                //     this.scrollAnimationValue++;
                // } else {
                //     // Si le scroll remonte
                //     this.scrollAnimationValue--;
                // }

                // console.log("scrollAnimationValue", this.scrollAnimationValue);
            }
        });

        this.previousScroll = scrollY;
    }

    _handleResize() {
        console.log("Resize");
        this.globalHeight = window.innerHeight;
        this.globalWidth = window.innerWidth;
    }

    createObserver() {
        this._intersectionObserver = new IntersectionObserver(this._handleIntersection, {

        });
    }

    _handleIntersection(entries, observer) {
        entries.forEach(entry => {

        });
    }
    
    _bindAll() {
        bindAll(this, "_handleScroll", "_handleResize");
    }
}

export default OnScrollAnimator;