// import express framework
import express from "express";
// import bcrypt for password hashing
import bcrypt from "bcrypt";
// import database connection function
import { connect_db } from "../db/db.js";

// create a new express router
const router = express.Router();

// route to handle user registration
router.post("/register", async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  // check if all required fields are provided
  if (!first_name || !last_name || !email || !password) {
    return res.status(400).json({ message: "all fields are required." });
  }

  try {
    // connect to the database and get users collection
    const db = await connect_db();
    const user_collection = db.collection("users");

    // check if the email is already registered
    const existing_email = await user_collection.findOne({ email });
    if (existing_email) {
      return res.status(409).json({ message: "email already used." });
    }

    // hash the password with a salt round of 10
    const hashed_password = await bcrypt.hash(password, 10);
    // get current date and format it
    const date = new Date();
    const formatted_date = date.toLocaleDateString();

    // insert the new user into the database
    const result = await user_collection.insertOne({
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: hashed_password,
      admin: false,
      created_at: formatted_date,
    });

    // respond with success message and inserted user id
    res.status(201).json({
      message: "user registered successfully",
      user_id: result.insertedId,
    });
  } catch (error) {
    // handle registration errors
    console.error("registration error", error);
    res.status(500).json({ message: "internal server error" });
  }
});

// route to handle user login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // check if both email and password are provided
  if (!email || !password) {
    return res.status(400).json({ message: "email and password required" });
  }

  try {
    // connect to the database and get users collection
    const db = await connect_db();
    const user_collection = db.collection("users");

    // find user by email
    const user = await user_collection.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "invalid credentials" });
    }

    // compare entered password with stored hashed password
    const password_match = await bcrypt.compare(password, user.password);
    if (!password_match) {
      return res.status(401).json({ message: "invalid credentials" });
    }

    // respond with success message and user id
    res.status(201).json({
      message: "login successful",
      user_id: user._id,
    });
  } catch (error) {
    // handle login errors
    console.error("login error", error);
    res.status(500).json({ message: "internal server error" });
  }
});

// export the router to be used in other files
export default router;
