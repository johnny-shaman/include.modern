# include.modern
All Platform use to like importScripts function

## usage

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

include("http", "express",  "./myCtrls.js", {
    io: "socket.io",
    myClass: "./my.class.js"
    myTemplate: ./template/my.template.js
});


/*
The means of same...
let ctrls = {
    route: require("./route.js"),
    index: require("./controller/index.controller.js"),
    foo: require("./controller/foo.controller.js"),
    bar: require("./controller/bar.controller.js")
}
*/

let ctrls = ("./route.js", {
    index: "./controller/index.controller.js",
    foo: "./controller/foo.controller.js",
    bar: "./controller/bar.controller.js"
}, {});

~~~

### Worker

Download this repository.

~~~javascript
let include = importScripts("./my_js_folder/include.modern.js");
//You can do it like a importScripts

include("my0.js", "my1.js", "my2.js");
~~~

### Browser

insert first this tag and
~~~html
<script src="./my_js_folder/include.modern.js"　async defer></script>
<script src="./my_module_folder/my.js" defer></script>
~~~
and my.js file can use

~~~javascript
//You can do it like a importScripts
include("my0.js", "my1.js", "my2.js");
~~~

Happy Hacking!!!
