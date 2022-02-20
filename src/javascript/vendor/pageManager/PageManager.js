class PageManager {
    constructor() {
        this.currentPage = "#page1";

        this.setup();
        // this.to({to: "/projects", state: { id: 1 }});
    }

    setup() {
        // If there's already a path, load the right page
        if (window.location.hash !== "") {
            this.to({ to: window.location.hash, state: { id: 2 } });
        }
    }

    // Setting new page
    to({to: to, state: state}) {
        console.log(to);
        console.log(state)
    }

    back() {
        // Could be a great feature
    }
}

export default PageManager;