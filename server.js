const express = require("express")
const next = require("next");
const cors = require('cors')

const dev = process.env.NODE_ENV !== "production";
const app = next({dev});
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;


app.prepare().then();
const server = express();

server.all("*", (req, res) => {
  return handle(req, res);
});

server.listen(port, () => console.log(`> Ready on localhost:${port}`))


