<!-- 
Project guide by freeCodeCamp, Nishant Kumar: https://www.freecodecamp.org/news/build-a-restful-api-using-node-express-and-mongodb/
Postman application to check endpoints: https://www.postman.com/downloads/
-->

# Smart-Home-Inventory-Manager-API
A Smart Home Inventory Manager for homeowners to keep track of and find household inventory items efficiently

# Working on this Repo
1. Copy the repo into your working dir to get started
    ```sh
    git clone https://github.com/Agile-102/Smart-Home-Inventory-Manager-API.git
    ```

2. Create a `.env` file in the root of the project and add the required environment variables. Refer to the `.env.example` file for the variables needed.
<!-- Please inform Zheng Jie your MongoDB Username, email-->
   
3. Install the dependencies:
    ```sh
    npm install
    ```

4. Start the server:
    ```sh
    node index.js
    ```

5. To connect to the database, ensure you have the correct `DATABASE_URL` in your `.env` file.

## Dependencies

Here are the dependencies used:
- `express` for the middleware to create various CRUD endpoints.
- `mongoose` for managing data in MongoDB using various queries.
- `nodemon` to restart our server every time we save our file.
- `dotenv` to manage a .env file.
  
You can install the necessary Node.js packages by running:
    ```
    npm install
    ```

<!-- 
data inserted with http://localhost:3000/api/post should flow into test.datas database.
-->