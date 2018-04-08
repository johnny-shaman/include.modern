let include = (Object.getPrototypeOf(this.constructor.prototype) !== null && Object.getPrototypeOf(this.constructor.prototype).constructor.name === "WorkerGlobalScope") ?
        importScripts
    : this.constructor.name === "Object" ?
        function (...a) {
            return a.reduceRight((p, c) => Object.assign(p, c.constructor === Object ?
                Object.keys(c).forEach((k) => c[k] = require(c[k])) || c
            :
                {[c.slice(c.length - 3) === ".js" ? c.slice(0, c.length - 3) : c]: require(c)}
            ), a[a.length - 1].constructor === String ? this : a.pop());
        }
    :
        function (...a) {
            let s = document.createElement("script");
            s.setAttribute("src", a.shift());
            a.length > 0 && s.addEventListener.addEventListener("load", include(...a));
            document.body.appendChild(s);
        };
