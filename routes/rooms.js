const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const Rooms = require('../models/rooms.model');
const Items = require('../models/items.model');
const checkDB = require('../utils/checkDB');
const db = require('../utils/mongoDB')

router.get('/test', async (req, res) => {
    //res.send('Pinged rooms')
    const userExists = await checkDB.checkIfRoomExists(req.body.username, req.body.roomName)
    res.send(userExists)
})

/**
 * Creates a new Room/User
 */
router.post('/addRoom', async (req, res) => {
    // Get data from request body
    let username = req.body.username
    let roomName = req.body.roomName

    try {
        const user = await checkDB.checkIfUserExists(username) // Check user

        if ( user ) {
            const room = await checkDB.checkIfRoomExists(user, roomName) // Check room
            if ( !room ) {
                await db.addRoomToUser(user, roomName) // Add Room
                res.status(200)
                res.send(`[${roomName}] added for user: ${username}`)
            } else {
                res.status(502)
                res.send('Room already exists, please use a different name')
            }
        } else {
            await db.addUser(username, roomName) // Add user and room
            res.status(200)
            res.send(`User: ${username} added successfully with room ${roomName}`)
        }
    } catch (error) {
        res.status(400)
        res.send('Something went wrong...')
    }
})

/**
 * Get all rooms of a user
 */
router.post('/getAllRooms', async (req, res) => {
    // Get data from request body
    let username = req.body.username
    
    try {
        const user = await checkDB.checkIfUserExists(username)

        if ( user ) {
            const rooms = await db.getAllRooms(user)
            if (rooms.length > 0) {
                let roomList = []
                for (const room of rooms) {
                    roomList.push(room.roomName)
                }
                res.status(200)
                res.send(roomList)
            } else {
                res.status(503)
                res.send('No rooms found for this user')
            }
        } else {
            res.status(501)
            res.send('User not found, please initiate contact with bot')  
        }
    } catch (error) {
        res.status(400)
        res.send('Something went wrong...')
    }
})

/**
 * Get room info from a user
 */
router.post('/getRoom', async (req, res) => {
    // Get data from request body
    let username = req.body.username
    let roomName = req.body.roomName

    try {
        const user = await checkDB.checkIfUserExists(username) // Check user

        if ( user ) {
            const room = await checkDB.checkIfRoomExists(user, roomName) // Check room

            if ( room ) {
                const roomFound = await db.getRoomOfUser(room)
                let subspaces = []
                let items = []

                for (const subspace of roomFound.subspaces) {
                    subspaces.push(subspace.subspaceName)
                }

                for (const item of roomFound.items) {
                    items.push(item.itemName)
                }

                let roomInfo = {
                    'subspaces': subspaces,
                    'items': items
                }

                res.status(200)
                res.send(roomInfo)
            } else {
                res.status(502)
                res.send('Room not found')
            }
        } else {
            res.status(501)
            res.send('User not found, please initiate contact with bot')
        }
    } catch (error) {
        res.status(400)
        res.send('Something went wrong...')
    }
})

/**
 * Edits a room name of a user
 */
router.patch('/editRoom', async (req, res) => {
    let username = req.body.username
    let oldName = req.body.oldName
    let newName = req.body.newName

    try {
        const user = await checkDB.checkIfUserExists(username) // Check user

        if ( user ) {
            const room = await checkDB.checkIfRoomExists(user, oldName) // Check room

            if ( room ) {
                await db.editRoomOfUser(room, newName)
                res.status(200)
                res.send(`Room name updated from ${oldName} to ${newName}`)
            } else {
                res.status(502)
                res.send('Room not found')
            }
        } else {
            res.status(501)
            res.send('User not found, please initiate contact with bot')
        }
    } catch (error) {
        res.status(400)
        res.send('Something went wrong...')
    }
})

/**
 * Deletes a room of a user
 */
router.delete('/deleteRoom', async (req, res) => {
    let username = req.body.username
    let roomName = req.body.roomName
    
    try {
        const user = await checkDB.checkIfUserExists(username) // Check user

        if ( user ) {
            const room = await checkDB.checkIfRoomExists(user, roomName) // Check room

            if ( room ) {
                await db.deleteRoomOfUser(user, room) // Delete room
                res.status(200)
                res.send(`${roomName} deleted for ${username}`)
            } else {
                res.status(502)
                res.send('Room not found')
            }
        } else {
            res.status(501)
            res.send('User not found, please initiate contact with bot')
        }
    } catch (error) {
        res.status(400)
        res.send('Something went wrong...')
    }
})

/**
 * Adds an item into an existing room
 */
router.post('/addItem', async (req, res) => {
    let username = req.body.username
    let roomName = req.body.roomName
    let itemName = req.body.itemName

    try {
        const user = await checkDB.checkIfUserExists(username) // Check user

        if ( user ) {
            const room = await checkDB.checkIfRoomExists(user, roomName) // Check room

            if ( room ) {
                const item = await checkDB.checkIfItemExists(room, itemName) // Check item

                if ( !item ) {
                    await db.addItemToRoom(user, room, itemName)
                    res.status(200)
                    res.send(`${itemName} added to ${roomName}`)
                } else {
                    res.status(504)
                    res.send('Item already exists, please use a different name')
                }
            } else {
                res.status(502)
                res.send('Room not found')
            }
        } else {
            res.status(501)
            res.send('User not found, please initiate contact with bot')
        }
    } catch (error) {
        res.status(400)
        res.send('Something went wrong...')
    }
})

/**
 * Get all items in a room
 */
router.post('/getItemsOfRoom', async (req, res) => {
    let username = req.body.username
    let roomName = req.body.roomName

    try {
        const user = await checkDB.checkIfUserExists(username) // Check user

        if ( user ) {
            const room = await checkDB.checkIfRoomExists(user, roomName) // Check room

            if ( room ) {
                const items = await db.getAllItemsOfRoom(room)

                if (items.length > 0) {
                    let itemList = []
                    for (const item of items) {
                        itemList.push(item.itemName)
                    }
                    res.status(200)
                    res.send(itemList)
                } else {
                    res.status(505)
                    res.send('No items found in this room')
                }
            } else {
                res.status(502)
                res.send('Room not found')
            }
        } else {
            res.status(501)
            res.send('User not found, please initiate contact with bot')
        }
    } catch (error) {
        res.status(400)
        res.send('Something went wrong...')
    }
})

/**
 * Edits an item in a room
 */
router.patch('/editItem', async (req, res) => {
    let username = req.body.username
    let roomName = req.body.roomName
    let oldName = req.body.oldName
    let newName = req.body.newName

    try {
        const user = await checkDB.checkIfUserExists(username) // Check user

        if ( user ) {
            const room = await checkDB.checkIfRoomExists(user, roomName) // Check room

            if ( room ) {
                const item = await checkDB.checkIfItemExists(room, oldName) // Check item
                if ( item ) {
                    await db.editItemOfRoom(item, newName)
                    res.status(200)
                    res.send(`Item name updated from ${oldName} to ${newName}`)
                } else {
                    res.status(504)
                    res.send('Item not found, please use a different name')
                }
            } else {
                res.status(502)
                res.send('Room not found')
            }
        } else {
            res.status(501)
            res.send('User not found, please initiate contact with bot')
        }
    } catch (error) {
        res.status(400)
        res.send('Something went wrong...')
    }
})

/**
 * Deletes an item from a room
 */
router.delete('/deleteItem', async (req, res) => {
    let username = req.body.username
    let roomName = req.body.roomName
    let itemName = req.body.itemName

    try {
        const user = await checkDB.checkIfUserExists(username) // Check user

        if ( user ) {
            const room = await checkDB.checkIfRoomExists(user, roomName) // Check room

            if ( room ) {
                const item = await checkDB.checkIfItemExists(room, itemName) // Check item
                if ( item ) {
                    await db.deleteItemOfRoom(item)
                    res.status(200)
                    res.send(`${itemName} deleted from ${roomName}`)
                } else {
                    res.status(504)
                    res.send('Item not found, please use a different name')
                }
            } else {
                res.status(502)
                res.send('Room not found')
            }
        } else {
            res.status(501)
            res.send('User not found, please initiate contact with bot')
        }
    } catch (error) {
        res.status(400)
        res.send('Something went wrong...')
    }
})

module.exports = router;