/**
* Base
*/
import '../scss/app.scss';

/**
* Javascript
*/

// Loaders
import ResourceLoader from "./vendor/loaders/ResourceLoader";
import ThreeGLTFLoader from "./vendor/loaders/loaders/three-gltf-loader";
import ImageLoader from "./vendor/loaders/loaders/image-loader";
import LoaderUI from './vendor/loaders/LoaderUI';

// Resources
import globalResources from '../../static/datas/globalResources';

// Utils
import bindAll from "./utils/bindAll";

// Three Scene
import ThreeScene from './three/threeScene';

class App {
    constructor() {
        this._resourceLoader = new ResourceLoader();
        this.loaderUI = new LoaderUI("loader");
        this._threeScene = new ThreeScene();

        this._refreshButton = document.querySelector("button");

        this.datas = null;

        this._bindAll();

        this.registerLoaders();
        this.setupResources();
        this.setupEventListeners();
        this.loadResources();
        // this._addRefreshButton();
    }

    registerLoaders() {
        this._resourceLoader.registerLoader({ loader: ThreeGLTFLoader, type: "gltf" });
        this._resourceLoader.registerLoader({ loader: ImageLoader, type: "jpg" });
    }

    setupResources() {
        this._resourceLoader.add({
            resources: globalResources,
            preload: true
        });
    }

    loadResources() {
        this._resourceLoader.preload();
    }

    setupEventListeners() {
        this._resourceLoader.addEventListener('complete', this._loadResourcesCompleteHandler);
        this._resourceLoader.addEventListener('progress', this._loadResourcesProgressHandler);
    }

    _loadResourcesCompleteHandler(e) {
        // console.log("loaded");
        this.datas = e;
        this.loaderUI.toggleLoader();

        // console.log(this._resourceLoader.get('Duck'))
    }

    _bindAll() {
        bindAll(this, '_loadResourcesProgressHandler', '_loadResourcesCompleteHandler');
    }

    _loadResourcesProgressHandler(e) {
        this.loaderUI.setLoaderProgress(Math.round(e * 100));
    }

    _addRefreshButton() {
        this._refreshButton.addEventListener("click", () => {
            // this._threeScene._setup();
            this._threeScene._render();
        });
    }

}

const app = new App();
