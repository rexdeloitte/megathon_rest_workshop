import express from "express";
// import mongoose from "mongoose";
// import dbconfig from "./config/database.config";
import morgan from "morgan";
// import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 3000;

mongoose.Promise = global.Promise;

// --- Define all the middlewares being used ---

// Log all the incoming requests
app.use(morgan("combined"));

// parse requests of content-type - application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
// app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Megathon Training 2019!" });
});

// --- Create DB connection and pass it to the app object ---
// require('./api/routes.js')(app);

// mongoose.connect(dbconfig.url, {useNewUrlParser: true})
//   .catch((err) => console.error(err.stack))
//   .then((db) => {
//     app.listen(port, () => {
//       console.log(`Node.js app is listening at http://localhost:${port}`);
//     });
//   });

app.listen(port, () => {
  console.log(`Node.js app is listening at http://localhost:${port}`);
});