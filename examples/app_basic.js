const http = require("http");
// import * as http from 'http';

// ## A simple http server without any middleware. ##

//create a server object:
// http
//   .createServer(function(req, res) {
//     res.writeHead(200, { "Content-Type": "text/html" }); // http header
//     const url = req.url;
//     if (url === "/about") {
//       console.log("serving about page");
//       res.write("<h1>about us page<h1>"); //write a response
//       res.end(); //end the response
//     } else if (url === "/contact") {
//       console.log("serving contact page");
//       res.write("<h1>contact us page<h1>"); //write a response
//       res.end(); //end the response
//     } else {
//       console.log("serving home page");
//       res.write("<h1>Hello World!<h1>"); //write a response
//       res.end(); //end the response
//     }
//   })
//   .listen(3000, function() {
//     console.log("server start at port 3000"); //the server object listens on port 3000
//   });

// ## A simple web server using Express.js ##

const express = require("express");
const morgan = require("morgan");
const bodyParser = require('body-parser');

const dbConfig = require('./config/database.config.js/index.js');
const mongoose = require('mongoose');

const port = 3000

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
  useNewUrlParser: true
}).then(() => {
  console.log("Successfully connected to the database");    
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
});
// --- Define all the middlewares being used ---

// Log all the incoming requests
app.use(morgan("combined"));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// serve public static files\
// app.use('/static', express.static(path.join(__dirname, 'public')))

const app = express();



app.get("/", function(req, res) {
  res.send("<h1>Hello Chaps!<h1>");
});

app.post("/", function(req, res) {
  res.send("<h1>Hello Chaps!<h1>");
});



app.listen(port, () => console.log(`Tutorial Server listening on port ${port}!`))
