const express = require("express")
const userRoutes = require('./routes/userRoutes')
const app = express();

function sayHello(req, res) {
    res.send('Hello From express');
}
const middleware = require('./middlewares/logger')


app.get('/', sayHello)

app.use('/user', middleware, userRoutes);

app.listen(5000, () => console.log("Running "));