// Utils
import bindAll from "../../utils/bindAll";
import EventDispatcher from '../../utils/EventDispatcher';

class ResourceLoader extends EventDispatcher {
    constructor() {
        super();

        this._progress = 0;
        this._preloadedResources = 0;
        this.resources = [];
        this.cache = [];
        this.loaders = {};
        this._preloadByDefault = false;

        this._bindAll();
    }

    // static cacheBis = [];

    getRessources() {
        return this.resources;
    }

    //Permet d'enregistrer un loader pour un type particulier de ressources à loader
    registerLoader({ loader, type }) {
        this.loaders[type] = new loader();
    }

    //Permet d'ajouter les ressources à load
    add({resources, preload }) {
        for (let i = 0; i < resources.length; i++) {
            const resource = resources[i];

            //On set le state du preload s'il il est défini dans les paramètres de la fonction sans override l'option de chaque ressource
            if (preload !== undefined && resource.preload === undefined) {
                resource.preload = preload;
            }

            //On set le state du preload de la ressource s'il est pas défini
            if (resource.preload === undefined) {
                resource.preload = this._preloadByDefault;
            }

            this.resources.push(resource);
        }

        return this.resources;  
    }

    preload() {
        const promises = [];

        const resourcesToPreload = this.resources.filter((resource) => {
            return resource.preload;
        });

        //On envoie l'event de start
        this._preloadStartHandler(resourcesToPreload);

        for (let i = 0; i < resourcesToPreload.length; i++) {
            const promise = this.loadResource(resourcesToPreload[i]);
            promises.push(promise);
            promise.then(this._preloadProgressHandler)
        }
        // Si tout est load, on envoie l'event de complete
        return Promise.all(promises)
            .catch(this._preloadErrorHandler)
            .then(this._preloadCompleteHandler);
    }

    loadResource(resource) {
        //Si la ressource n'a pas de nom
        if (!resource.name) throw new Error('Resource name should be defined');

        const loader = this.loaders[resource.type];

        //Si le loader pour ce type de ressource n'existe pas
        if (!loader) throw new Error(`Resource Loader: No loader is available for type "${resource.type}"`);

        //Si le path de la ressource est incorrect
        if (!resource.path) throw new Error(`Resource Loader: Could not find resource path for "${resource.name}"`);

        const path = resource.path;

        //On crée une promise avec le loader correspondant au bon type et on l'appel avec la ressource
        const promise = loader.load({ path, name: resource.name, type: resource.type, options: resource.options })

        promise.then((response) => {
            //On injecte les datas dans la ressource
            resource.data = response;

            //On check si la ressource est déjà en cache
            for (let i = 0, len = this.cache.length; i < len; i++) {
                if (this.cache[i].name === resource.name) return;
            }

            this.cache.push(resource);
        });

        return promise;
    }

    get(resourceName) {
        const resource = this.getResourceByName(resourceName);
        return resource.data;
    } 

    getResourceByName(name) {
        // console.log(this.cache)
        // Retrieve resource in the cache
        for (let i = 0, len = this.cache.length; i < len; i++) {
            if (this.cache[i].name === name) {
                return this.cache[i];
            }
        }

        throw new Error(`Resource Loader: Resource with name '${name}' was not found`);
    }

    _bindAll() {
        bindAll(this, '_preloadCompleteHandler', '_preloadProgressHandler', '_preloadErrorHandler');
    }

    _preloadStartHandler(resources) {
        //On dispatch l'event de start
        this.dispatchEvent('start', this._resourcesToPreload);
    }

    _preloadProgressHandler(resource) {
        this._preloadedResources++;
        this._progress = this._preloadedResources / this.resources.length;
        this.dispatchEvent('progress', this._progress);
        //On dispatch l'event de progress
    }

    _preloadCompleteHandler(resources) {
        //On dispatch l'event de complete
        this.dispatchEvent('complete', resources);
    }

    _preloadErrorHandler() {
        console.error('Resource Loader : Something went wrong while preloading resources');
    }

    destroy() {
        this.cache = [];
        this.loaders = {};
        this.resources = [];
        this._progress = null;
        this._preloadedResources = null;
    }
    
}

export default ResourceLoader;