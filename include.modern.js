(() => {
    let setAttr = (a, b) => Object.keys(b).forEach(k => a.setAttribute(k, b[k])) || a;
    let onLoad = (a, b) => a.addEventListener("load", b, false) || a;
    let FNToMN = (s) => s.slice(s.length - 3) === ".js" ? s.slice(0, 2) === "./" ? s.slice(2, s.length - 3) : s.slice(0, 3) === "../" ? s.slice(3, s.length - 3) : s.slice(0, s.length - 3) : s;

    let include = (Object.getPrototypeOf(this.constructor.prototype) !== null && Object.getPrototypeOf(this.constructor.prototype).constructor.name === "WorkerGlobalScope") ?
            importScripts
        : this.constructor.name === "Object" ?
            function (...a) {
                return a.reduceRight((p, c) => Object.assign(p, c.constructor === Object ?
                    Object.keys(c).forEach((k) => c[k] = require(c[k])) || c
                :
                    {[FNToMN(c)]: require(c)}
                ), (a[a.length - 1].constructor === String || Object.keys(a[a.length - 1]).length > 0) ? this : a.pop());
            }
        :
            function (...a) {
                const c = a.shift();
                c !== undefined && this[FNToMN(c)] === undefined ? document.body.appendChild(onLoad(setAttr(
                    document.createElement("script"), {
                        "async": "",
                        "defer": "",
                        "src": c,
                    }
                ), () => include(...a))): include(...a);
            };

    this.constructor.name === "Object" && (module.exports = include);
    this.constructor.name === "Object" || Object.assign(this, {include});
})();