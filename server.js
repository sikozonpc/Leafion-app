const express = require('express');
const path = require('path');
const fs = require("fs");
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;


// Setting up express and the server
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// START THE DB
var db;
MongoClient.connect('mongodb://sikoz:batata123@ds161894.mlab.com:61894/fcc-test-db', (err, client) => {
  if (err) return console.log(err)

  db = client.db('fcc-test-db') // whatever the database name is

  app.listen(port, () => console.log(`Listening on port ${port}`));
})

//
// Request the list of all items from Database
//
app.get('/items/all', (req, res) => {
  db.collection('items').find().toArray(function(err, results) {
    console.log(results)
    res.send(results);
  })
});

// 
// Add item to the Database
//
app.post('/items/add', (req, res) => {
  let post = req.body.post;
  console.log("POST pre adding:" +post);

  db.collection('items').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/');
  })
});

app.delete("/items/remove", (req, res) => {
  console.log("a")
  db.collection('items').deleteOne({ _id:ObjectId(`${req.body.id}`) } ,
    (err, result) => {
      if (err) return res.send(500, err)
      res.send({message:  result  + " is the result"})
    })

});


// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});


