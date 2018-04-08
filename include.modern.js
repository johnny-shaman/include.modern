(() => {
    let setSrc = (a, b) => a.setAttribute("src", b) || a;
    let onLoad = (a, b) => a.addEventListener("load", b, false) || a;
    let FNToMN = (s) => s.slice(s.length - 3) === ".js" ? s.slice(0, s.length - 3) : s;
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
                let c = a.shift();
                c !== undefined && this[FNToMN(c)] === undefined ? document.body.appendChild(onLoad(setSrc(
                    document.createElement("script"), c
                ), () => include(...a))): include(...a);
            };

    this.constructor.name === "Object" && (module.exports = include);
    this.constructor.name === "Object" || Object.assign(this, {include});
})();