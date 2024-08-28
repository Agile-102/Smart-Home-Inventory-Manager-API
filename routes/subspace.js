const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const Rooms = require('../models/rooms.model');
const Subspace = require('../models/subspace.model');
const Items = require('../models/items.model');
const checkDB = require('../utils/checkDB');
const db = require('../utils/mongoDB')

router.get('/test', async (req, res) => {
    res.send('Pinged subspaces')
})

/**
 * Creates a subspace for a user
 */
router.post('/addSpace', async (req, res) => {
    let username = req.body.username
    let spaceName = req.body.spaceName
    let roomName = req.body.roomName

    try {
        const user = await checkDB.checkIfUserExists(username) // Check user

        if ( user ) {
            const room = await checkDB.checkIfRoomExists(user, roomName) // Check room

            if ( room ) {
                const subspace = await checkDB.checkIfSubspaceExists(room, spaceName) // Check subspace

                if ( !subspace ) {
                    await db.addSubspaceToRoom(user, room, spaceName)
                    res.status(200)
                    res.send(`${spaceName} added to ${roomName}`)
                } else {
                    res.status(506)
                    res.send('Subspace already exists, please use another name')
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
 * Retrieves all subspaces of a user
 */
router.post('/getAllSpaces', async (req, res) => {
    let username = req.body.username

    try {
        const user = await checkDB.checkIfUserExists(username) // Check user

        if ( user ) {
            const spaces = await db.getAllSubspaces(user)
            
            if ( spaces.length > 0 ) {
                let spaceList = []
                for (const space of spaces) {
                    spaceList.push({
                        "subspaceName": space.subspaceName,
                        "roomName": space.room.roomName
                    })
                }
                res.status(200)
                res.send(spaceList)
            } else {
                res.status(507)
                res.send('No subspaces found, please use another name')
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

/** Retrieves all subspaces of a room */
router.post('/getSpacesOfRoom', async (req, res) => {
    let username = req.body.username
    let roomName = req.body.roomName

    try {
        const user = await checkDB.checkIfUserExists(username) // Check user

        if ( user ) {
            const room = await checkDB.checkIfRoomExists(user, roomName) // Check room

            if ( room ) {
                const subspaces = await db.getAllSubspacesOfRoom(room)
                if ( subspaces.length > 0 ) {
                    let subspaceList = []
                    for (const space of subspaces) {
                        subspaceList.push(space.subspaceName)
                    }
                    res.status(200)
                    res.send(subspaceList)
                } else {
                    res.status(507)
                    res.send('No subspaces found in this room')
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

/** Retrieves info of a specific subspace */
router.post('/getSpecificSpace', async (req, res) => {
    let username = req.body.username
    let spaceName = req.body.spaceName

    try {
        const user = await checkDB.checkIfUserExists(username) // Check user

        if ( user ) {
            const subspace = await db.getSubSpaceOfUser(user, spaceName)
            if ( subspace.length > 0 ) {
                let spaceList = []
                for (const space of subspace) {
                    spaceList.push({
                        "subspaceName": space.subspaceName,
                        "roomName": space.room.roomName,
                        "items": space.items
                    })
                }
                res.status(200)
                res.send(spaceList)
            } else {
                res.status(507)
                res.send('Subspace not found')
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
 * Edit a subspace name
 */
router.patch('/editSpace', async (req, res) => {
    let username = req.body.username
    let roomName = req.body.roomName
    let oldName = req.body.oldName
    let newName = req.body.newName

    try {
        const user = await checkDB.checkIfUserExists(username) // Check user

        if ( user ) {
            const room = await checkDB.checkIfRoomExists(user, roomName) // Check room

            if ( room ) {
                const subspace = await checkDB.checkIfSubspaceExists(room, oldName)
                if ( subspace ) {
                   await db.editSubspaceName(subspace, newName)
                   res.status(200)
                   res.send(`Subspace name changed from ${oldName} to ${newName}`)
                } else {
                    res.status(507)
                    res.send('No subspaces found in this room')
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
 * Delete a subspace
 */
router.delete('/deleteSpace', async (req, res) => {
    let username = req.body.username
    let roomName = req.body.roomName
    let spaceName = req.body.spaceName

    try {
        const user = await checkDB.checkIfUserExists(username) // Check user

        if ( user ) {
            const room = await checkDB.checkIfRoomExists(user, roomName) // Check room

            if ( room ) {
                const subspace = await checkDB.checkIfSubspaceExists(room, spaceName)
                if ( subspace ) {
                   await db.deleteSubspaceFromRoom(subspace)
                   res.status(200)
                   res.send(`Subspace ${spaceName} deleted from ${roomName}`)
                } else {
                    res.status(507)
                    res.send('No subspaces found in this room')
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
 * Adds an Item to the subspace
 */
router.post('/addItem', async (req, res) => {
    let username = req.body.username
    let roomName = req.body.roomName
    let spaceName = req.body.spaceName
    let itemName = req.body.itemName

    try {
        const user = await checkDB.checkIfUserExists(username) // Check user

        if ( user ) {
            const room = await checkDB.checkIfRoomExists(user, roomName) // Check room

            if ( room ) {
                const subspace = await checkDB.checkIfSubspaceExists(room, spaceName) // Check subspace
                if ( subspace ) {
                    const item = await checkDB.checkIfItemExistsSpace(subspace, itemName)
                    if ( !item ) {
                        await db.addItemIntoSpace(subspace, user, itemName)
                        res.status(200)
                        res.send(`${itemName} added to ${spaceName} of ${roomName}`)
                    } else {
                        res.status(504)
                        res.send('Item already exists')
                    }
                } else {
                    res.status(507)
                    res.send('No subspaces found in this room')
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

/** Gets Item in a subspace */
router.post('/getItemsInSpace', async (req, res) => {
    let username = req.body.username
    let roomName = req.body.roomName
    let spaceName = req.body.spaceName

    try {
        const user = await checkDB.checkIfUserExists(username) // Check user

        if ( user ) {
            const room = await checkDB.checkIfRoomExists(user, roomName) // Check room

            if ( room ) {
                const subspace = await checkDB.checkIfSubspaceExists(room, spaceName) // Check subspace
                if ( subspace ) {
                    const items = await db.getAllItemsInSpace(subspace)
                    if ( items.length > 0 ) {
                        let itemsList = []
                        for (const item of items) {
                            itemsList.push(item.itemName)
                        }
                        res.status(200)
                        res.send(itemsList)
                    } else {
                        res.status(505)
                        res.send('No items found in this subspace')
                    }
                } else {
                    res.status(507)
                    res.send('No subspaces found in this room')
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
 * Edits an Item to the subspace
 * @param username - Telegram username of user
 * @param {User, Rooms, Subspace} - Database Model
 */
router.patch('/editItem', async (req, res) => {
    let username = req.body.username
    let roomName = req.body.roomName
    let spaceName = req.body.spaceName
    let oldItemName = req.body.oldItemName
    let newItemName = req.body.newItemName

    try {
        const user = await checkDB.checkIfUserExists(username) // Check user

        if ( user ) {
            const room = await checkDB.checkIfRoomExists(user, roomName) // Check room

            if ( room ) {
                const subspace = await checkDB.checkIfSubspaceExists(room, spaceName) // Check subspace
                if ( subspace ) {
                    const item = await checkDB.checkIfItemExistsSpace(subspace, oldItemName) // Check item
                    if ( item ) {
                        await db.editItemInSpace(item, newItemName) // Update item
                        res.status(200)
                        res.send(`Item name changed from ${oldItemName} to ${newItemName}`)
                    } else {
                        res.status(505)
                        res.send('Item not found')
                    }
                } else {
                    res.status(507)
                    res.send('No subspaces found in this room')
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
 * Deletes an Item from the subspace
 */
router.delete('/deleteItem', async (req, res) => {
    let username = req.body.username
    let roomName = req.body.roomName
    let spaceName = req.body.spaceName
    let itemName = req.body.itemName

    try {
        const user = await checkDB.checkIfUserExists(username) // Check user

        if ( user ) {
            const room = await checkDB.checkIfRoomExists(user, roomName) // Check room

            if ( room ) {
                const subspace = await checkDB.checkIfSubspaceExists(room, spaceName) // Check subspace
                if ( subspace ) {
                    const item = await checkDB.checkIfItemExistsSpace(subspace, itemName) // Check item
                    if ( item ) {
                        await db.deleteItemInSpace(item) // Delete item
                        res.status(200)
                        res.send(`${itemName} has been deleted`)
                    } else {
                        res.status(505)
                        res.send('Item not found')
                    }
                } else {
                    res.status(507)
                    res.send('No subspaces found in this room')
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