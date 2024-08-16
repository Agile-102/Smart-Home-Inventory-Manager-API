const Users = require('../models/user.model');
const Rooms = require('../models/rooms.model');
const Subspaces = require('../models/subspace.model');
const Items = require('../models/items.model');

module.exports = {

    /** 
     * ======= Rooms CRUD Block =======
     */

    /** Add user and room into database */
    addUser: async function(username, roomName) {
        const newUser = await Users.create(
            { username: username}
        )

        const newRoom = await Rooms.create(
            { roomName: roomName , username: newUser._id }
        )

        const addRoomToUser = await Users.updateOne(
            { _id: newUser._id },
            { $push: { rooms: newRoom._id }}
        )
    },

    /** Add room for user */
    addRoomToUser: async function (userId, roomName) {
        const newRoom = await Rooms.create(
            { roomName: roomName, username: userId }
        )

        const addRoomToUser = await Users.updateOne(
            { _id: userId },
            { $push: { rooms: newRoom._id }}
        )
    },

    /** Get all rooms of a user */
    getAllRooms: async function (userId) {
        const rooms = await Rooms.find(
            { username: userId }
        )

        return rooms
    },

    /** Get a specific room of a user */
    getRoomOfUser: async function (roomId) {
        const room = await Rooms.findOne(
            { _id: roomId }
        ).populate('items subspaces')

        return room
    },

    /** Edits a room of a user */
    editRoomOfUser: async function (roomId, newName) {
        const editRoom = await Rooms.findByIdAndUpdate(
            { _id: roomId },
            { roomName: newName }
        )
    },

    /** Delete a room of a user */
    deleteRoomOfUser: async function (userId, roomId) {
        const deleteRoomOfUser = await Users.updateOne(
            { _id: userId },
            { $pull: { rooms: roomId }}
        )

        const deleteRoom = await Rooms.findByIdAndDelete(
            { _id: roomId }
        )
    },

    /**
     * ======= Rooms -> Items CRUD Block =======
     */

    /** Add an item to a room of a user */
    addItemToRoom: async function (userId, roomId, itemName) {
        const createItem = await Items.create(
            {
                itemName: itemName,
                username: userId,
                room: roomId
            }
        )

        const addItemToRoom = await Rooms.updateOne(
            { _id: roomId },
            { $push: { items: createItem._id }}
        )
    },

    /** Get all items of a user */
    getAllItemsOfUser: async function (userId) {
        const items = await Items.find(
            { username: userId }
        ).populate({
            path: 'subspace',
            populate: {
                path: 'room',
                model: 'Rooms'
            }
        }).populate('room')

        return items
    },

    /** Get all items in a room */
    getAllItemsOfRoom: async function (roomId) {
        const items = await Items.find(
            { room: roomId }
        )

        return items
    },

    /** Get specific item from room */
    getItemsFromUser: async function (userId, itemName) {
        const items = await Items.find(
            { username: userId, itemName: itemName }
        ).populate({
            path: 'subspace',
            populate: {
                path: 'room',
                model: 'Rooms'
            }
        }).populate('room')

        return items
    },

    /** Edit an item of a room */
    editItemOfRoom: async function (itemId, newName) {
        const editItem = await Items.findByIdAndUpdate(
            { _id: itemId },
            { itemName: newName }
        )
    },

    /** Delete an item of a room */
    deleteItemOfRoom: async function (itemId) {
        const deleteItem = await Items.findByIdAndDelete(
            { _id: itemId }
        )
    },

    /**
     * ======= Subspace CRUD Block =======
     */

    /** Add subspace to a room of a user */
    addSubspaceToRoom: async function (userId, roomId, subspaceName) {
        const createSubspace = await Subspaces.create(
            {
                subspaceName: subspaceName,
                username: userId,
                room: roomId
            }
        )

        const addSubspaceToRoom = await Rooms.updateOne(
            { _id: roomId },
            { $push: { subspaces: createSubspace._id }}
        )
    },

    /** Get all subspaces of a user */
    getAllSubspaces: async function (userId) {
        const subspaces = await Subspaces.find(
            { username: userId}
        ).populate('room')

        return subspaces
    },

    /** Get all subspaces of a room */
    getAllSubspacesOfRoom: async function (roomId) {
        const subspaces = await Subspaces.find(
            { room: roomId }
        )

        return subspaces
    },

    /** Get a subspace of user */
    getSubSpaceOfUser: async function (userId, spaceName) {
        const subspace = await Subspaces.find(
            { username: userId, subspaceName: spaceName }
        ).populate({
            path: 'room',
            select: 'roomName'
        }).populate({
            path: 'items',
            select: 'itemName'
        })

        return subspace
    },

    /** Edit a subspace name */
    editSubspaceName: async function (subspaceId, newName) {
        const editSubspace = await Subspaces.findByIdAndUpdate(
            { _id: subspaceId },
            { subspaceName: newName }
        )
    },

    /** Deletes a subspace from a room */
    deleteSubspaceFromRoom: async function (subspaceId) {
        const deleteSubspaceFromRoom = await Subspaces.findByIdAndDelete(
            { _id: subspaceId}
        )
    },

    /**
     * ======= Subspace -> Items CRUD Block =======
     */

    /** Adds an item to a subspace */
    addItemIntoSpace: async function (subspaceId, userId, itemName) {
        const createItem = await Items.create(
            { itemName: itemName, username: userId, subspace: subspaceId }
        )

        const addItemToSpace = await Subspaces.updateOne(
            { _id: subspaceId },
            { $push: { items: createItem._id }}
        )
    },

    /** Gets all items in a subspace */
    getAllItemsInSpace: async function (subspaceId) {
        const items = await Items.find(
            { subspace: subspaceId },
        )

        return items
    },

    /** Edit an item in a subspace */
    editItemInSpace: async function (itemId, newName) {
        const editItem = await Items.findByIdAndUpdate(
            { _id: itemId },
            { itemName: newName }
        )
    },

    /** Deletes an item in a subspace */
    deleteItemInSpace: async function (itemId) {
        const deleteItem = await Items.findByIdAndDelete(
            { _id: itemId }
        )
    }
}