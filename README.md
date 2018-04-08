# include.modern
All Platform use to like importScripts function

## usage

### Node.js

npm install include.modern

~~~javascript
let include = require("include.modern");
//You can do it like a importScripts

let myDeamon = include("http", "express", {io: "socket.io"});

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
