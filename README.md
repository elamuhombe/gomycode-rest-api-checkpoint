**README.md**

# Node.js CRUD API with Express and Mongoose

This is a simple CRUD (Create, Read, Update, Delete) API built using Node.js, Express, and Mongoose. It provides endpoints to manage users in a MongoDB database.

## Instructions

1. Start a new Node.js project with `npm init`.
2. Install required packages: `mongoose`, `express`, and `.env` using `npm install mongoose express dotenv`.
3. Configure environment variables using `.env`.
4. Launch a server with Express in the `server.js` file.
5. Connect your database locally or with MongoDB Atlas.
6. The folder structure should be as follows:

```
- .env
- models/
  - User.js
- server.js
```

7. Create a `models` folder and a `User.js` file in it.
8. Define a Mongoose schema and export the model in `User.js`.
9. In `server.js`, create four routes:
   - GET: Return all users.
   - POST: Add a new user to the database.
   - PUT: Edit a user by ID.
   - DELETE: Remove a user by ID.
10. Use Mongoose methods in each callback function to manipulate data and return it in the response.
11. Test each route using Postman.

## Folder Structure

```
- .env
- models/
  - User.js
- server.js
```

## Useful Links

- [dotenv](https://www.npmjs.com/package/dotenv)
- [Express.js](https://expressjs.com/)
- [req.params & req.query](https://coursework.vschool.io/express-params-and-query/)
- [Mongoose](https://mongoosejs.com/)
- [REST API Tutorial](https://www.youtube.com/watch?v=SLwpqD8n3d0)

## Running the Server

To run the server, execute `node server.js` in your terminal. Make sure your MongoDB server is running and accessible.

## Testing Endpoints

You can test the API endpoints using a tool like Postman. Make requests to the specified routes to perform CRUD operations on the users in the database.

### Screenshots of test results of the CRUD operations
#### GET
#### POST
#### PUT
#### DELETE
