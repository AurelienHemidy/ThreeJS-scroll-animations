class SEOManager {
    constructor() {
        this.metaName = document.querySelector('meta[name="description"]').setAttribute("content", _desc);
        this.metaProperty = document.querySelector('meta[property="description"]').setAttribute("content", _desc);
    }
}

export default SEOManager;