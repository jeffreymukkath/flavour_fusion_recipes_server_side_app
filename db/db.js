// import mongodb client and server api version
import { MongoClient, ServerApiVersion } from "mongodb";
// get mongo uri from environment variables
const mongo_uri = process.env.MONGO_URI;

// create a new mongo client with specific server api options
const client = new MongoClient(mongo_uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// variable to store the connected database instance
let db;

// function to connect to the database
export async function connect_db() {
  // return existing db instance if already connected
  if (db) return db;
  try {
    // connect to mongodb server
    await client.connect();
    // send a ping command to confirm connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "pinged your deployment. you successfully connected to mongodb!"
    );
    // set and return the specific database
    db = client.db("flavour_fusion_recipes");
    return db;
  } catch (error) {
    // log any connection errors and close the client
    console.error(error);
    await client.close();
  }
}
