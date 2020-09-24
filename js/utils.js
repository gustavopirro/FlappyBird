class Utils {
    constructor () {

    }
    static getRandomFloat (min, max) {
        return Math.random() * (max - min) + min;
    }
    static getRandomInt (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static preload (paths, callback) {
        const img = new Image();
        img.src = paths[0];
        paths.splice(0, 1)
        img.onload = paths.length === 0 ? callback : this.preload(paths, callback)
    }
}