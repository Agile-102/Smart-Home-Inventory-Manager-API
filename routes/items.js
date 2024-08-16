const express = require('express');
const router = express.Router();
const checkDB = require('../utils/checkDB');
const db = require('../utils/mongoDB')

router.get('/test', async (req, res) => {
    res.send('Pinged items')
})

/** 
 * Get specific item from user
 */
router.post('/getItem', async (req, res) => {
    let username = req.body.username
    let itemName = req.body.itemName

    try {
        const user = await checkDB.checkIfUserExists(username)

        if ( user ) {
            const items = await db.getItemsFromUser(user, itemName)
            if (items.length > 0) {
                let itemList = []

                for (const item of items) {
                    if ( item.room ) {
                        itemList.push({
                            itemName: item.itemName,
                            roomName: item.room.roomName
                        })
                    } else {
                        itemList.push({
                            itemName: item.itemName,
                            roomName: item.subspace.room.roomName,
                            subspaceName: item.subspace.subspaceName
                        })
                    }
                }

                res.status(200)
                res.send(itemList)
            } else {
                res.status(505)
                res.send('No items found')
            }
        } else {
            res.status(501)
            res.send('User not found, please initiate contact with bot')
        }
    } catch (error) {
        res.status(400)
        res.send('Something went wrong...')
        console.log(error)
    }
})

/**
 * Get all items of user
 */
router.post('/getAllItems', async (req, res) => {
    let username = req.body.username
    
    try {
        const user = await checkDB.checkIfUserExists(username) // Check user

        if ( user ) {
            const items = await db.getAllItemsOfUser(user)
            if (items.length > 0) {
                let itemList = []
                for (const item of items) {
                    if ( item.room ) {
                        itemList.push({
                            itemName: item.itemName,
                            roomName: item.room.roomName
                        })
                    } else {
                        itemList.push({
                            itemName: item.itemName,
                            roomName: item.subspace.room.roomName,
                            subspaceName: item.subspace.subspaceName
                        })
                    }
                }
                res.status(200)
                res.send(itemList)
            } else {
                res.status(503)
                res.send('No items found for this user')
            }
        } else {
            res.status(501)
            res.send('User not found, please initiate contact with bot')
        }
    } catch (error) {
        res.status(400)
        res.send(error.message)
    }
})

module.exports = router