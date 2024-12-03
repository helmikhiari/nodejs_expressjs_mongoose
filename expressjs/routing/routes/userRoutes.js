const express = require("express")


const router = express.Router();


function getUsers(req, res) {
    res.send("All Users");
}

function getUserById(req, res) {
    const { id } = req.params;
    res.send(`Hello User with id ${id}`);
}
router.get("/getUsers", getUsers)

router.get('/getuser/:id', getUserById)

module.exports = router;