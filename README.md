
1. Clone the repository
2. Navigate to the project directory
3. Run `npm install` to install dependencies
4. Start the server using `npm run dev`

## Endpoints

- GET /users - Retrieve all users
- POST /users - Create a new user
- GET /users/:id - Retrieve a user by ID
- PUT /users/:id - Update a user by ID
- DELETE /users/:id - Delete a user by ID

## Testing

Use Postman  to test the endpoints.

### Example Requests

- `GET /users`
- `POST /users` with body `{  "id": 1," "name": "Hamza Mehdi", "email": "hamza@gmail.com" }`
- `GET /users/1`
- `PUT /users/1` with body `{ "name": "Hamza Mehdi" }`
- `DELETE /users/1`

GITHUB URL:https://github.com/syedhamzamehdiii/CRUD-

## MongoDB Setup
1. Install MongoDB from [here](https://www.mongodb.com/try/download/community) 
2. Start the MongoDB server:
   mongod
3. Update the MongoDB connection string in `db.js` if necessary.
4. Run the application:
     node index.js
5. Use Postman to test the API endpoints:
