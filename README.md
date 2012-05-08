# columnize: print data in columns

<img src="https://github.com/russfrank/columnize/raw/master/shot.png" />

Print data in columns in node.js.  Install it like this

```
npm i columnize
```

Use it like this

```javascript
var columnize = require('columnize');
var output = columnize(3); // three columns

output(0, "hello!");
output(2, "derp");

require('child_process').spawn('uptime').on('data', output(1));
```

`columnize()` creates a function which you can call with the column # and some
data to insert into it.  You can also partially apply this function; `output(1)`
above returns a function which just takes data as input and throws it into
column 1.

Thats about it. Enjoy.

# License

MIT (as always)
