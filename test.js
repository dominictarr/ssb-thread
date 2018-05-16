var Thread = require('./')

require('ssb-client')(function (err, sbot) {

  Thread(sbot, function (e) { return e }, 
//    '%Xwyb2EDVlP98UYbs+KGM0VdlYHxS1J01XU9kEKjQbWo=.sha256',
//    '%8q4UVCWQwBrMw4wxZ6YkuBtR7pJGlPdTrRUPCP7t8wQ=.sha256',
//    '%WgVG9T2IryRoPMCQk7znuMt2Cmo/shgnrbn0wY6gc3M=.sha256',
//    '%mOhiV2NYIf0uNpH1X6VKXJX5pcGmV9ar761x66C5joA=.sha256',
    process.argv[2],
  function (list) {
    console.log('[\n', list.map(function (e) { 
      return JSON.stringify({key:e.key, branch: e.value.content.branch})
    }).sort().join(',\n'),'\n]\n')
  })
})


