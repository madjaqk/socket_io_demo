module.exports = function(app){
	app.get("/", function(req, res){
		res.render("index")
	})

	app.get("/current_counter", function(req, res){
		res.json({"counter": app.count})
	})

	app.get("/plus_one", function(req, res){
		app.count++
		res.json({"status": "OK"})
	})
}