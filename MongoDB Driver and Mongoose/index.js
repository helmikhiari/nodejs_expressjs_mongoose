const mongodb = require("mongodb")
const uri = "mongodb://localhost:27017";
const client = new mongodb.MongoClient(uri);
async function connect() {
    try {

        await client.connect();
        console.log("Connected to mongodb")
    }
    catch (error) {
        console.log("Error is " + error);
    }
}
connect();

const db = client.db("testdb");

async function createUser(user) {
    try {
        const users = db.collection("user");
        await users.insertOne(user);
        console.log("User Inserted");
    }
    catch (error) {
        console.log("Error at create is " + error);
    }
}

async function findUser(name) {
    try {
        const users = db.collection('user');
        const userToFind = await users.findOne({ name });
        console.log(userToFind);
    }
    catch (error) {
        console.log("Error is " + error);
    }
}
// createUser({ name: "hama", balance: 5000 });
// createUser({ name: "samar", balance: -5000 });
// findUser("hama");

async function updateUser(name, balance) {
    try {
        const users = db.collection('user');
        const res = await users.updateOne({ name }, { $inc: { balance } })
        console.log(res);
    }
    catch (error) {
        console.log("Error is " + error);
    }
}

updateUser("samar", 2000);
