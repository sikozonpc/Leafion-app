const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
var ObjectId = require("mongodb").ObjectID;

//
//
// IMPORTANT | If you are interested in contribution to Leafion, the server is using a
// MongoDB as database for the items, and so you can create your database or even change the
// server to load from anywhere.
//
// If you are using mongoDB this is where it laods the database uri, to do so:
// 1. Create in this directory a 'dbinfo.json' and add to it a 'uri' pointing to your database;
const dbUri = require("./dbinfo.json");
//

// Setting up express and the server
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

// START THE DB
var db;

MongoClient.connect(dbUri.uri, { useNewUrlParser: true }, (err, client) => {
	if (err) return console.log(err);

	db = client.db("fcc-test-db"); // whatever the database name is

	app.listen(port, () => console.log(`Listening on port ${port}`));
});

//
// Request the list of all items from Database
//
app.get("/items/all", (req, res) => {
	db.collection("items")
		.find()
		.toArray(function(err, results) {
			res.send(results);
		});
});

//
// Add item to the Database
//
app.post("/items/add", (req, res) => {
	let post = req.body.post;

	db.collection("items").save(req.body, (err, result) => {
		if (err) return console.log(err);

		res.redirect("/");
	});
});

//
// Delete item from the Database
//
app.delete("/items/remove", (req, res) => {
	db.collection("items").deleteOne(
		{ _id: ObjectId(`${req.body.id}`) },
		(err, result) => {
			if (err) return res.send(500, err);
			res.send({ message: result + " is the result" });
		}
	);
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname + "/client/build/index.html"));
});
