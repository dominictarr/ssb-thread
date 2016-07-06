# ssb-thread

load a ssb-thread, and sort it in [cryptographic order](https://github.com/ssbc/ssb-sort).

## example

``` js
var getThread = require('ssb-thread')

getThread(sbot, root_msg_id, function (err, ary) {
  //calls back with an array of all messages in order.
})
```

## License

MIT
