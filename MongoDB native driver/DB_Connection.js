const mongo = require("mongodb")

async function connect() {
    try {
        const uri = "mongodb://localhost:27017";
        const client = new mongo.MongoClient(uri);

        await client.connect()
        console.log("Connected To MongDB")
        return client;

    }
    catch (error) {
        console.log("Error Connecting to mongodb")
    }
}

module.exports = connect;