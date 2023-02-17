const app = require("./app");
const mongoose = require("mongoose");
const config = require("config");

if (!config.has("jwtPrivateKey")) {
  console.log("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}

// Configuring the database
const db = config.get("db");

mongoose.Promise = global.Promise;
mongoose.set("strictQuery", false);

// Connecting to the database
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to the database.");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

// listen for requests
app.listen(9103, () => {
  console.log("Server is listening on port 9103.");
});
