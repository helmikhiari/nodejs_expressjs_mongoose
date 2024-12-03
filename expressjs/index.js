const express = require("express")

const app = express();

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs")
app.set("views", "./views")



app.get('/about', (req, res) => res.send("About"))

app.use((req, res, next) => { console.log("incoming request at " + req.url); next() });

app.get('/auth/:email/:password', (req, res, next) => {
    const { email, password } = req.params;
    if (email == "admin@gmail.com" && password == "1234")
        next();
    else
        res.send("Forbidden");

}, (req, res) => {
    res.send("Welcome admin");
})




app.get("/home/:name/:color", (req, res) => {
    const name = req.params.name
    const color = req.params.color
    const user = { name: name, color: color }
    res.render("home", { user: user });
})

app.use((req, res,) => res.send("404 not found"))

app.listen(5000, () => console.log("running"))