(() => {
    Object.defineProperties(Promise.prototype, {
        defer: {
            configurable: true,
            get () {
                return this.then;
            }
        }
    });
    let setAttr = (a, b) => Object.keys(b).forEach(k => a.setAttribute(k, b[k])) || a;
    let onLoad = (a, b) => a.addEventListener("load", b, false) || a;
    let props = {
        paths: ["", "./", "../"],
        imported: [],
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
            Object.assign(async function (...a) {
                const src = src.length > 0 && a.shift();
                src && include.imported.reduceRight((p, c) => c !== src && p, true) && document.body.append(onLoad(setAttr(document.createElement("script"), {
                    "async": "",
                    "defer": "",
                    "src": src
                }), async function handleLoad (e) {
                    e.target.removeEventListener("load", handleLoad, false);
                    include.imported.push(src);
                    await include(...a);
                }));
            }, props);

    this.constructor.name === "Object" ? (module.exports = include) : Object.assign(this, include);
})();
