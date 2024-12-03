function middleware(req, res, next) {
    console.log("Inside middleware");
    next();
}

module.exports = middleware