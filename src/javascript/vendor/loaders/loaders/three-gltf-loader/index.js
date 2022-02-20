import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

class ThreeGLTFLoader {
    constructor(options = {}) {
        // super(options);

        this._gltfLoader = new GLTFLoader();
    }

    /**
     * Public
     */
    load({ path }) {
        const promise = new Promise((resolve, reject) => {
            this._gltfLoader.load(path, resolve, null, reject);
        });

        return promise;
    }
}

export default ThreeGLTFLoader;