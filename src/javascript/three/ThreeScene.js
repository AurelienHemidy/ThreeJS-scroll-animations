import * as THREE from 'three'
import bindAll from '../utils/bindAll'
import lerp from '../utils/lerp'

const SETTINGS = {
    enableRaycast: false
}

class ThreeScene {
    constructor() {
        bindAll(this,
            "_tick",
            "_tickHandler",
            "_resizeHandler",
            "_scalePercent",
            "_scrollHandler"
        );

        this._clock = new THREE.Clock()
        this._previousTime = 0;

        this._camera;

        // this._textureLoader = new THREE.TextureLoader();

        this._animationScripts = [];

        this._scrollPercent = 0;

        this._cube;


        this._setup();
    }

    _setup() {
        this._scene = new THREE.Scene()

        const gridHelper = new THREE.GridHelper(10, 10, 0xaec6cf, 0xaec6cf)
        this._scene.add(gridHelper)

        this._camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );

        this._renderer = new THREE.WebGLRenderer()
        this._renderer.setSize(window.innerWidth, window.innerHeight)
        document.body.appendChild(this._renderer.domElement)
        
        const geometry = new THREE.BoxGeometry()
        const material = new THREE.MeshBasicMaterial({
            color: 0xEF5E70,
            wireframe: false,
        })

        this._cube = new THREE.Mesh(geometry, material)
        this._cube.position.set(0, 0.5, -10)
        this._scene.add(this._cube)


        this._setupEventListeners();
        this._resizeHandler();
        this._addAnimations();
    }   

    _setupEventListeners() {
        console.log("setupEventListeners");
        this._tickHandler();
        window.addEventListener('resize', this._resizeHandler);
        window.addEventListener("scroll", this._scrollHandler);
    }

    _resizeHandler() {
        this._camera.aspect = window.innerWidth / window.innerHeight
        this._camera.updateProjectionMatrix()
        this._renderer.setSize(window.innerWidth, window.innerHeight)
        this._renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this._render();
    }

    _scrollHandler() {
        //calculate the current scroll progress as a percentage
        this._scrollPercent =
            ((document.documentElement.scrollTop || document.body.scrollTop) /
                ((document.documentElement.scrollHeight ||
                    document.body.scrollHeight) -
                    document.documentElement.clientHeight)) *
            100
        ;(document.getElementById('scrollProgress')).innerText =
            'Scroll Progress : ' + this._scrollPercent.toFixed(2)

    }

    _scalePercent(start, end) {
        return (this._scrollPercent - start) / (end - start)
    }

    _addAnimations() {
        //add an animation that flashes the cube through 100 percent of scroll
        // this._animationScripts.push({
        //     start: 0,
        //     end: 101,
        //     func: () => {
        //         let g = this._cube.material.color.g
        //         g -= 0.05
        //         if (g <= 0) {
        //             g = 1.0
        //         }
        //         this._cube.material.color.g = g
        //     },
        // });

        //add an animation that moves the cube through first 40 percent of scroll
        this._animationScripts.push({
            start: 0,
            end: 40,
            func: () => {
                this._camera.lookAt(this._cube.position)
                this._camera.position.set(0, 1, 2)
                this._cube.position.z = lerp(-10, 0, this._scalePercent(0, 40))
                //console.log(cube.position.z)
            },
        })

        //add an animation that rotates the cube between 40-60 percent of scroll
        this._animationScripts.push({
            start: 40,
            end: 60,
            func: () => {
                this._camera.lookAt(this._cube.position)
                this._camera.position.set(0, 1, 2);
                this._cube.rotation.z = lerp(0, Math.PI, this._scalePercent(40, 60))
                //console.log(cube.rotation.z)
            },
        })

        //add an animation that moves the camera between 60-80 percent of scroll
        this._animationScripts.push({
            start: 60,
            end: 80,
            func: () => {
                this._camera.position.x = lerp(0, 5, this._scalePercent(60, 80))
                this._camera.position.y = lerp(1, 5, this._scalePercent(60, 80))
                this._camera.lookAt(this._cube.position)
                //console.log(camera.position.x + " " + camera.position.y)
            },
        })

        //add an animation that auto rotates the cube from 80 percent of scroll
        this._animationScripts.push({
            start: 80,
            end: 101,
            func: () => {
                //auto rotate
                this._cube.rotation.x += 0.01
                this._cube.rotation.y += 0.01
            },
        })
    }

    _playScrollAnimations() {
        this._animationScripts.forEach((a) => {
            if (this._scrollPercent >= a.start && this._scrollPercent < a.end) {
                a.func()
            }
        })
    }

    _render() {
        const elapsedTime = this._clock.getElapsedTime();
        const deltaTime = elapsedTime - this._previousTime;
        this._previousTime = elapsedTime;

        this._playScrollAnimations();

        this._renderer.render(this._scene, this._camera);
    }

    _tick() {
        this._render();
    }

    _tickHandler() {
        this._tick();
        window.requestAnimationFrame(this._tickHandler);
    }

}

export default ThreeScene;