'use strict'

const Hapi = require('hapi')
const Path = require('path')
const Jimp = require('jimp')
const fileType = require('file-type')

const server = new Hapi.Server({
  connections: {
    routes: {
      files: {
        relativeTo: Path.join(__dirname, 'views')
      }
    }
  }
})

server.connection({
  port: 1337
})

server.register(require('inert'), (err) => {
  if (err) {
    throw err
  }
  server.route({
    method: 'GET',
    path: '/js/{file*}',
    handler: {
      directory: {
        path: 'js'
      }
    }
  })

  server.route({
    method: 'POST',
    path: '/upload',
    config: {
      payload: {
        maxBytes: 209715200,
        output: 'stream',
        parse: true
      },
      handler: (request, reply) => {
        let file = fileType(request.payload['img']._data).mime
        if (file === 'image/png' || file === 'image/jpeg') {
          Jimp.read(request.payload['img']._data).then((test) => {
            let w = test.bitmap.width
            let h = test.bitmap.height
            let time = 0
            for (let i = 1; i < 26; i++) {
              let clone = test.clone().autocrop()
              if (i <= 5) { // första
                clone.crop(((w / 5) * time), 0, (w / 5), (h / 5)).write('views/imgs/img' + i + '.png')
                time++
                if (i === 5) {
                  time = 0
                }
              } else if (i > 5 && i <= 10) { // andra
                clone.crop(((w / 5) * time), (h / 5), (w / 5), (h / 5)).write('views/imgs/img' + i + '.png')
                time++
                if (i === 10) {
                  time = 0
                }
              } else if (i > 10 && i <= 15) { // tredje
                clone.crop(((w / 5) * time), ((h / 5) * 2), (w / 5), (h / 5)).write('views/imgs/img' + i + '.png')
                time++
                if (i === 15) {
                  time = 0
                }
              } else if (i > 15 && i <= 20) { // fjärde
                clone.crop(((w / 5) * time), ((h / 5) * 3), (w / 5), (h / 5)).write('views/imgs/img' + i + '.png')
                time++
                if (i === 20) {
                  time = 0
                }
              } else if (i > 20) { // femte
                clone.crop(((w / 5) * time), ((h / 5) * 4), (w / 5), (h / 5)).write('views/imgs/img' + i + '.png')
                time++
                if (i === 25) {
                  time = 0
                }
              }
            }
          }).catch(function (err) {
            console.error(err)
          })

          reply().redirect('/puzzle')

        } else {
          reply('rip')
        }
      }
    }
  })

  server.route({
    method: 'GET',
    path: '/puzzle',
    handler: (request, reply) => {
      reply.file('puzzle.html')
    }
  })

  server.route({
    method: 'GET',
    path: '/css/{file*}',
    handler: {
      directory: {
        path: 'css'
      }
    }
  })

  server.route({
    method: 'GET',
    path: '/img/{file*}',
    handler: {
      directory: {
        path: 'imgs'
      }
    }
  })

  server.route({
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
      reply.file('index.html')
    }
  })

  server.start((err) => {
    if (err) {
      throw err
    }

    console.log('Server running at:', server.info.uri)
  })
})

