// import express framework
import express from "express";
// import objectid from mongodb to work with document ids
import { ObjectId } from "mongodb";
// import database connection function
import { connect_db } from "../db/db.js";

// create a new express router
const router = express.Router();

// handle get request to fetch all recipes
router.get("/", async (req, res) => {
  try {
    // connect to the database and get recipes collection
    const db = await connect_db();
    const recipe_collection = db.collection("recipes");

    // retrieve all recipe documents as an array
    const result = await recipe_collection.find().toArray();

    // return 404 if no recipes are found
    if (result.length === 0) {
      return res
        .status(404)
        .json({ message: "no recipes found in the database" });
    }

    // return the list of recipes with status 200
    res.status(200).json(result);
  } catch (error) {
    // handle errors while fetching recipes
    console.error("error fetching recipes", error);
    res.status(500).json({ message: "internal server error" });
  }
});

// route to handle recipe registration
router.post("/", async (req, res) => {
  const {
    title,
    description,
    author_name,
    summary,
    recipe_details,
    ingredients,
    instructions,
    recipe_nutrition_facts,
  } = req.body;

  // check if all required fields are provided
  if (
    !title ||
    !description ||
    !author_name ||
    !summary ||
    !recipe_details ||
    !ingredients ||
    !instructions ||
    !recipe_nutrition_facts
  ) {
    return res.status(400).json({ message: "all fields are required" });
  }

  try {
    // connect to the database and get recipes collection
    const db = await connect_db();
    const recipe_collection = db.collection("recipes");

    // get current date and format it
    const date = new Date();
    const formatted_date = date.toLocaleDateString();

    // insert the new recipe into the database
    const result = await recipe_collection.insertOne({
      title: title,
      description: description,
      author_name: author_name,
      date: formatted_date,
      summary: summary,
      recipe_details: [recipe_details],
      ingredients: [ingredients],
      instructions: [instructions],
      recipe_nutrition_facts: [recipe_nutrition_facts],
    });

    // respond with success message and inserted recipe id
    res.status(201).json({
      message: "recipe registered successfully",
      recipe_id: result.insertedId,
    });
  } catch (error) {
    // handle registration errors
    console.error("recipe registration error", error);
    res.status(500).json({ message: "internal server error" });
  }
});

// handle get request to fetch a recipe by id
router.get("/:id", async (req, res) => {
  // extract id from the route parameters
  const { id } = req.params;

  try {
    // connect to the database and get recipe collection
    const db = await connect_db();
    const recipe_collection = db.collection("recipes");

    // validate the recipe id
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "invalid recipe id" });
    }

    // find the recipe with the given id
    const result = await recipe_collection.findOne({ _id: new ObjectId(id) });

    // return 404 if the recipe is not found
    if (!result) {
      return res
        .status(404)
        .json({ message: "recipe is not found in the database" });
    }

    // return the found recipe with status 200
    res.status(200).json(result);
  } catch (error) {
    // handle errors while fetching a single recipe
    console.error("error fetching recipe", error);
    res.status(500).json({ message: "internal server error" });
  }
});

// export the router to be used in other files
export default router;
