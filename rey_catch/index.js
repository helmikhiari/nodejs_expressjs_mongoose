const express = require('express')
const app = express()
app.use(express.json());
const connect = require("./DB_Connection")
const client =  connect()
async function addNewUser(req, res) {
    try {

        if (req.body.name && req.body.status) {

            const db = client.db("myDatabase");
            const collection = db.collection("users");

            const result = await collection.insertOne(req.body);
            res.status(201).send("User addedSuccessfully");
        }
        else
            res.status(409).send("name and status are required ")
    }
    catch (error) {
        res.status(400).send("Error Occured");
    }
}

app.post("/addUser", addNewUser)
app.get("/getUser/:name", async (req, res) => {
    const client = await connect()
    const db = client.db("myDatabase");
    const collection = db.collection("users");
    const users = await collection.findOne({ name: req.params.name });
    res.send(users);
})


app.listen(5002, () => console.log("Running"))