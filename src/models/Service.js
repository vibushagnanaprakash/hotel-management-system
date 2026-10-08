const { ObjectId } = require("mongodb");

let db = null;

// Set MongoDB database
function setDatabase(database) {
    db = database;
}

// Get all rooms
async function getAllRooms() {
    return await db.collection("rooms")
        .find({})
        .sort({ roomId: 1 })
        .toArray();
}

// Get available rooms
async function getAvailableRooms() {
    return await db.collection("rooms")
        .find({ availability: true })
        .sort({ roomId: 1 })
        .toArray();
}

// Update room availability
async function updateRoomAvailability(roomId, availability) {

    const result = await db.collection("rooms").updateOne(
        { roomId: Number(roomId) },
        {
            $set: {
                availability: availability
            }
        }
    );

    return result;
}

// Create sample rooms if collection is empty
async function createSampleRooms() {

    const count = await db.collection("rooms").countDocuments();

    if (count === 0) {

        const rooms = [
            {
                roomId: 101,
                roomNumber: "101",
                roomType: "Single",
                floor: 1,
                availability: true
            },
            {
                roomId: 102,
                roomNumber: "102",
                roomType: "Double",
                floor: 1,
                availability: true
            },
            {
                roomId: 103,
                roomNumber: "103",
                roomType: "Single",
                floor: 1,
                availability: true
            },
            {
                roomId: 201,
                roomNumber: "201",
                roomType: "Deluxe",
                floor: 2,
                availability: true
            },
            {
                roomId: 202,
                roomNumber: "202",
                roomType: "Suite",
                floor: 2,
                availability: false
            },
            {
                roomId: 203,
                roomNumber: "203",
                roomType: "Deluxe",
                floor: 2,
                availability: true
            }
        ];

        await db.collection("rooms").insertMany(rooms);

        console.log("Sample rooms inserted into MongoDB");
    }
}

module.exports = {
    setDatabase,
    getAllRooms,
    getAvailableRooms,
    updateRoomAvailability,
    createSampleRooms
};