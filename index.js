var sort = require('ssb-sort')
var pull = require('pull-stream')

function toArray (s) {
  if('string' === typeof s) return [s]
  if(Array.isArray(s)) return s
  return []
}

module.exports = function getThread (sbot, unbox, root, onThread) {
  //in this case, it's inconvienent that panel only takes
  //a stream. maybe it would be better to accept an array?
  var lookup = {}, ary = [], timer, has = {}

  function update (msg) {
    if(!msg) return
    if(has[msg.key]) return
    has[msg.key] = true
    ary.push(unbox(msg))
    ary.forEach(function (msg) {
      lookup[msg.key] = true
    })
    ary.forEach(function (msg) {
      //retrive out of order messages...
      toArray(msg.value.content.branch).forEach(function (id) {
       if(!lookup[id]) {
          lookup[id] = true
          var _id = id
          sbot.get({id:id, private: true}, function (err, msg) {
            if(msg) update({key: id, value: msg, ooo: true})
          })
        }
      })
    })
    if(timer) return
    timer = setTimeout(function () {
      timer = null
      sort(ary)
      onThread(ary)
    }, 50)
  }

  sbot.get({id:root, private: true}, function (err, value) {
    if (err) {
      console.error('could not get root message', root)
      console.error(err)
      return
    }
    update({key: root, value: value})

    if(value.content.root)
      root = value.content.root

    pull(
      sbot.links({
        rel: 'root', dest: root,
        values: true, keys: true,
        live: true, private: true
      }),
      pull.drain(function (msg) {
        if(msg.sync) return
        if(msg.key === msg.value.content.branch) throw new Error('cannot point to self')
        update(msg)
      })
    )

  })

}

