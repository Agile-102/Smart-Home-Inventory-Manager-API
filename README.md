# Smart-Home-Inventory-Manager API

## Setup Instructions
- After cloning repo, open up console and enter `npm i` to install required packages.
- To use your own MongoDB, open the `.env` file and change the `MONGODB_URI` to your own link (refer to `.env.example` file)
- If `.env` doesn't exist, create a new `.env` file in the root folder /shim-api

If the above steps are fulfilled, open a terminal and enter `npm run dev` to initiate API on local machine.

## How to test
Once API is running, Postman app is strongly recommended for testing!
If Postman is not installed on your device, please install it from [here](https://www.postman.com/downloads/)! 

Once logged in to Postman, 
- Select the appropriate method
- Enter the correct link. (http://localhost:3000 followed by the appropriate data end points, e.g. http://localhost:3000/room/addRoom)
- Below the link there should be a toolbar, click on "Body" and select "raw"
- Enter test info in JSON format ie
```
{
  "username": "user 1",
  "roomName": "room 1"
}
```
- Click on send to check if API works

## Staus Codes
- **200** - Request OK
- **400** - Connection Error
- **501** - User not found
- **502** - Room already exists
- **503** - Room(s) not found
- **504** - Item already exists
- **505** - Item(s) not found
- **506** - Subspace already exists
- **507** - Subspace(s) not found
