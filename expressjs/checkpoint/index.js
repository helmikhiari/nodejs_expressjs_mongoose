const express = require('express')
const pageRoutes = require("./routes/pageRoutes");
const timeMid = require("./middlewares/timeMiddleware")
const app = express();

app.use(express.static(__dirname + "/public"))
app.use(timeMid, pageRoutes);
app.set("view engine", "ejs")
app.set('views', __dirname + "/views");




app.listen(5000, () => console.log('Running'));