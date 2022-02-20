// Utils
import bindAll from "../../utils/bindAll";

// To avoid triggering a reflow on images when you change their src attributes, don't forget to specify a hieght and/or width to the images placeholder

class LazyLoader {
    constructor() {
        this.lazyloadImages = document.querySelectorAll(".lazy-images");

        this.currentPage = "#page1";

        // console.log("Lazy Loader initiating");

        this._bindAll();
        this._setup();
    }

    _loazyLoadImages() {
      this.lazyloadImages = document.querySelectorAll(".lazy-images");

      // Check if intersectionObserver isn't currently available in the browser
      if (!"IntersectionObserver" in window) {
        this._lazyLoadIfNoIntersectionObserver();
        document.addEventListener("scroll", this._lazyLoadIfNoIntersectionObserver);
        window.addEventListener("resize", this._lazyLoadIfNoIntersectionObserver);

        return;
      }

      let imageObserver = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {
          if (entry.isIntersecting) {
            let image = entry.target;
            image.src = image.dataset.src;
            image.removeAttribute("data-src");
            image.classList.remove("lazy-images");
            imageObserver.unobserve(image);
          }
        });
      }, {
        // root: document.querySelector("#page1"),
        rootMargin: "0px 0px 500px 0px"
      });
  
      this.lazyloadImages.forEach(image => {
        imageObserver.observe(image);
      });
    }

    _lazyLoadIfNoIntersectionObserver() {
      let lazyloadThrottleTimeout;

      if (lazyloadThrottleTimeout) {
        clearTimeout(lazyloadThrottleTimeout);
      }    
  
      lazyloadThrottleTimeout = setTimeout(function() {
        let scrollTop = window.pageYOffset;

        this.lazyloadImages.each(image => {
          if (image.offsetTop < window.innerHeight + scrollTop - 500) {
            image.src = img.dataset.src;
            image.classList.remove('lazy-images');
          }
        });

        if (this.lazyloadImages.length == 0) { 
          document.removeEventListener("scroll", this._lazyLoadIfNoIntersectionObserver);
          window.removeEventListener("resize", this._lazyLoadIfNoIntersectionObserver);
          window.removeEventListener("orientationChange", this._lazyLoadIfNoIntersectionObserver);
        }
      }, 20);
    }
 
    _setup() {
      if (this.lazyloadImages.length === 0) throw new Error("No images to lazyload");

      this._loazyLoadImages();
    }

    _bindAll() {
      bindAll(this, "_loazyLoadImages", "_lazyLoadIfNoIntersectionObserver");
    }
}

export default LazyLoader;