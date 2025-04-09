# flavour_fusion_recipes_server_side_app

flavour_fusion_recipes_server_side_app is the backend server for a recipe sharing application.
it provides api endpoints for user registration, recipe creation, and public recipe browsing.

## features

- user registration and authentication
- create, read, update, and delete recipes
- public access to view all recipes
- secure handling of user data

## core technologies

- node.js
- express.js
- mongodb
- dotenv

## installation

1. clone the repository:

   ```
   git clone https://github.com/jeffreymukkath/flavour_fusion_recipes_server_side_app.git
   ```

2. navigate into the project directory:

   ```
   cd flavour_fusion_recipes_server_side_app
   ```

3. install dependencies

   ```
   npm install
   ```

4. create a **.env** file in the root directory and add the following:

   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   ```

## getting started

1. start the server:

   ```
   npm start
   ```

2. the server will run on **http://localhost:5000** by default.

## api endpoints

| method | endpoint            | description                 | auth required |
| ------ | ------------------- | --------------------------- | ------------- |
| post   | /api/users/register | register a new user         | no            |
| post   | /api/users/login    | log in as a user            | no            |
| get    | /api/recipes/       | get all recipes             | no            |
| post   | /api/recipes/       | create a new recipe         | yes           |
| get    | /api/recipes/:id    | get a specific recipe by id | no            |
| put    | /api/recipes/:id    | update a recipe             | yes           |
| delete | /api/recipes/:id    | delete a recipe             | yes           |

## contributing

pull request are welcome.
for major changes, please open an issue first to discuss what you would like to change.

## license

this project is open source and available under the mit license
