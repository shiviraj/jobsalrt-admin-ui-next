const express = require('express')
const next = require('next')
const {createProxyMiddleware} = require("http-proxy-middleware")

const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const target = process.env.BFF_URL || 'http://localhost:3001'
const app = next({dev})
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  server.use("/api", (req, res, next) => {
    if (req.headers.authorization || req.path === "/user/sign-in") {
      return next()
    }
    res.sendStatus(403)
  });

  server.use('/api', createProxyMiddleware({target, changeOrigin: true, pathRewrite: {'^/api': '/api'},}));

  server.all("*", (req, res) => {
    return handle(req, res)
  })

  server.listen(port, () => console.log(`Server is listening on ${port}`))
})
