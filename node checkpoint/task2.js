const http = require("http");
const fs = require("fs")


const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" })
    if (req.url == "/samar") {
        res.end('<h2>This is samar</h2>');
    }
    else if (req.url == "/home")
        res.end("This is home")
    else
        res.end("Not Found")
})

server.listen(3000, () => console.log("server is running"))