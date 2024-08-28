const Users = require('../models/user.model');
const Rooms = require('../models/rooms.model');
const Subspace = require('../models/subspace.model');
const Items = require('../models/items.model');

module.exports = {
    /** Check if a user exists in database */
    checkIfUserExists : async function (username) {
        const user = await Users.exists({username})

        if (user) {
            return user._id
        } else {
            return false
        }
    },

    /** Check if a room exists for a user */
    checkIfRoomExists : async function (userId, roomName) {
        const room = await Rooms.exists(
            { roomName: roomName, username: userId }
        )

        if (room) {
            return room._id
        } else {
            return false
        }
    },

    /** Check if an item exists for a room */
    checkIfItemExistsRoom: async function (roomId, itemName) {
        const item = await Items.exists(
            { itemName: itemName, room: roomId }
        )

        if (item) {
            return item._id
        } else {
            return false
        }
    },

    /** Check if an item exists for a subspace */
    checkIfItemExistsSpace: async function (spaceId, itemName) {
        const item = await Items.exists(
            { itemName: itemName, subspace: spaceId }
        )

        if (item) {
            return item._id
        } else {
            return false
        }
    },

    /** Check if a subspace exists for a room */
    checkIfSubspaceExists: async function (roomId, subspaceName) {
        const subspace = await Subspace.exists(
            { subspaceName: subspaceName, room: roomId }
        )

        if (subspace) {
            return subspace._id
        } else {
            return false
        }
    }
}