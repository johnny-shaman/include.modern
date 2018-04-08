let include = (Object.getPrototypeOf(this.constructor.prototype) !== null && Object.getPrototypeOf(this.constructor.prototype).constructor.name === "WorkerGlobalScope") ?
        importScripts
    : this.constructor.name === "Object" ?
        function (...a) {
            switch (a[0].constructor) {
                case String: return a.reduceRight((p, c) => Object.assign(p.constructor === String ? this : p, {[c.search(".js") > 0 ? c.replace(".js", "") : c]: require(c)}));
                case Object: return a.reduce((p, c) => Object.assign(p, {[c.search(".js") > 0 ? c.replace(".js", "") : c]: require(c)}));
            }
        }
    :
        function (...a) {
            let s = document.createElement("script");
            s.setAttribute("src", a.shift());
            a.length > 0 && s.addEventListener.addEventListener("load", include(...a));
            document.body.appendChild(s);
        };
