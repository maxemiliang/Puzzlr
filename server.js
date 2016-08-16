'use strict'

const Hapi = require('hapi')
const Path = require('path')
const Jimp = require('jimp')
const fs = require('fs')

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
        request.payload['img'].pipe(fs.createWriteStream('views/imgs/test.jpg'));
        Jimp.read('views/imgs/test.jpg').then((test) => {
          test.write('views/imgs/puzzle.jpg')
        }).catch(function (err) {
          console.error(err)
        })
        reply('upload')
      }
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
    path: '/',
    handler: function (request, reply) {
      reply.file('index.html')
    }
  })

  server.start((err) => {
    if (err) {
      throw err
    }

    console.log('Server running at:', server.info.uri);
  })
})



