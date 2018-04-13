# include.modern
All Platform use to like importScripts function

# usage

## make a module

### ex1
~~~javascript
    this.constructor.name === "Object" ? module.exports = myModule: Object.assign(this, {myModule});
~~~

### ex2: Using is.modern
~~~javascript
    is.server ? module.exports = myModule: Object.assign(this, {myModule});
~~~

### ex3: Using is.modern
~~~javascript
    is.server && (module.exports = myModule)
    is.server || Object.assign(this, {myModule});
~~~

## including

### Node.js

npm install include.modern

~~~javascript
let include = require("include.modern");
//You can do it like a importScripts

/*
The means of same...

let http = require("http"),
    express = require("express"),
    myCtrls = require(./myCtrls.js);
*/

include("http", "express",  "./myCtrls.js");

//define global

include("http", "express", "./myCtrls.js", {
    io: "socket.io",
    myClass: "./my.class.js"
    myTemplate: "./template/my.template.js"
});

/*
The means of same...
let ctrls = {
    route: require("./route.js"),
    index: require("./controllers/index.js"),
    foo: require("./controllers/foo.js"),
    bar: require("./controllers/bar.js")
}
*/

const path = "./controllers/";
include.setPath(path);
let ctrls = include("./route.js", {
    index: path + "index.js",
    foo: path + "foo.js",
    bar: path + "bar.js"
}, {});
~~~

### Worker

Download this repository.

~~~javascript
let include = importScripts("../my_js_folder/include.modern.js");
//You can do it like a importScripts

include("./my0.js", "./my1.js", "./my2.js");
~~~

### Browser

insert first this tag
~~~html
<script src="https://cdn.jsdelivr.net/npm/include.modern/include.modern.min.js" async defer></script>
<script src="./my_module_folder/my.js" defer></script>
~~~

and my.js file can use

~~~javascript
/*
You can do it like a importScripts && return Promise and Promise.then === Promise.defer
As You like to use it!
*/
include("./js/my0.js", "./js/my1.js", "./js/my2.js").defer(() => {
    //scripting here
});
~~~

Happy Hacking!!!
