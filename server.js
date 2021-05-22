const express = require('express')
const next = require('next')
const {createProxyMiddleware} = require("http-proxy-middleware")

const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({dev})
const handle = app.getRequestHandler()

const apiPaths = {
  '/api': {
    target: process.env.BFF_URL || 'http://localhost:3001',
    pathRewrite: {
      '^/api': '/api'
    },
    changeOrigin: true
  }
}

app.prepare().then(() => {
  const server = express()

  server.use("/api", createProxyMiddleware(apiPaths['/api']));

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, () => console.log(`Server is listening on ${port}`))
}).catch(err => {
  console.log('Error:::::', err)
})
