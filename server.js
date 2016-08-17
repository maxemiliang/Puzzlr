'use strict'

const Hapi = require('hapi')
const Path = require('path')
const Jimp = require('jimp')
const fs = require('fs')
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
        let type = fileType(request.payload['img']._data)
        if (type.mime === 'image/jpeg' || type.mime === 'image/png') {
          request.payload['img'].pipe(fs.createWriteStream('views/imgs/' + request.payload['img'].hapi.filename))
          Jimp.read('views/imgs/' + request.payload['img'].hapi.filename).then((test) => {
            test.write('views/img/test.jpg')
          }).catch(function (err) {
            console.error(err)
          })

          reply('upload')
        } else {
          reply.redirect('/')
        }
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
    handler: function (request, reply) {
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

