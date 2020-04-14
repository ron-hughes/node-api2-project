const express = require('express')
const postsRouter = require("./routers/posts-router.js");
const welcomeRouter = require("./welcome/welcome-router.js");
const server = express()
const port = 4000

server.use(express.json())
server.use("/api/posts", postsRouter)
server.use("/", welcomeRouter)

server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
})