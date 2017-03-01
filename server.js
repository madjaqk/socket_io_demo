var express = require("express")
var path = require("path")

var app = express()

var PORT = 8000

app.use(express.static(path.join(__dirname, "./client")))
app.use(express.static(path.join(__dirname, "./node_modules")))

app.set("views", path.join(__dirname, "./client/views"))
app.set("view engine", "ejs")

if(!app.count){
	app.count = 10000000000
}

require("./server/config/routes.js")(app)

var server = app.listen(PORT, function(){
	console.log(`Listening on port ${PORT}`)
})

var io = require("socket.io").listen(server)

io.sockets.on("connection", function(socket){
	console.log("New connection", socket.id)

	socket.emit("update_count", app.count)

	socket.on("plus_one", function(){
		app.count++
		socket.broadcast.emit("update_count", app.count)
	})
})