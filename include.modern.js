(() => {
    let setAttr = (a, b) => Object.keys(b).forEach(k => a.setAttribute(k, b[k])) || a;
    let onLoad = (a, b) => a.addEventListener("load", b, false) || a;
    let props = {
        paths: ["./", "../"],

        setPath (...a) {
            include.paths = include.paths.concat(a);
        },

        toName (s) {
            s.slice(s.length - 3) === ".js" ?
                include.paths.map(v => s.slice(0, v.length) === v ? s.slice(v.length, s.length - 3) : undefined).reduce((p, c) => c !== undefined ? c : p, s.slice(0, s.length - 3))
            : s;
        }
    };

    let include = (Object.getPrototypeOf(this.constructor.prototype) !== null && Object.getPrototypeOf(this.constructor.prototype).constructor.name === "WorkerGlobalScope") ?
            importScripts
        : this.constructor.name === "Object" ?
            Object.assign(function (...a) {
                return a.reduceRight((p, c) => Object.assign(p, c.constructor === Object ?
                    Object.keys(c).forEach((k) => c[k] = require(c[k])) || c
                :
                    {[include.toName(c)]: require(c)}
                ), (a[a.length - 1].constructor === String || Object.keys(a[a.length - 1]).length > 0) ? this : a.pop());
            }, props)
        :
            Object.assign(function (...a) {
                const c = a.shift();
                c !== undefined && this[include.toName(c)] === undefined ? document.body.appendChild(onLoad(setAttr(
                    document.createElement("script"), {
                        "async": "",
                        "defer": "",
                        "src": c,
                    }
                ), () => include(...a))): include(...a);
            }, props);

    this.constructor.name === "Object" && (module.exports = include);
    this.constructor.name === "Object" || Object.assign(this, {include});
})();
