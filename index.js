var sort = require('ssb-sort')

module.exports = function getThread (sbot, root, cb) {
  //in this case, it's inconvienent that panel only takes
  //a stream. maybe it would be better to accept an array?

  sbot.get(root, function (err, value) {
    var msg = {key: root, value: value}

    pull(
      sbot.links({rel: 'root', dest: root, values: true, keys: true}),
      pull.collect(function (err, ary) {
        if(err) return cb(err)
        ary.unshift(msg)
        cb(null, sort(ary))
      })
    )
  })

}



