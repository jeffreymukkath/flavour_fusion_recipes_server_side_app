// load environment variables from .env file
import "dotenv/config";
// import express framework
import express from "express";

// create an instance of the express application
const app = express();
// define the port to listen on, defaulting to 5000 if not specified
const port = process.env.PORT || 5000;

// enable parsing of incoming json requests
app.use(express.json());

// define a basic route for the root url
app.get("/", (req, res) => {
  res.send("hello, world!");
});

try {
  // start the server and listen on the specified port
  const server = app.listen(port, () => {
    console.log(`flavour_fusion_recipes_app listening on port ${port}`);
  });
  // handle server errors
  server.on("error", (err) => {
    console.error("server error:", err);
  });
} catch (err) {
  // handle errors that occur while starting the server
  console.error("failed to start server:", err);
}
