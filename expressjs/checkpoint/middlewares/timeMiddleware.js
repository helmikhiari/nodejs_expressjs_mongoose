
function timeMiddleware(req, res, next) {
    const currentDate = new Date()
    const currentDay = currentDate.getDay();
    const currentHour = currentDate.getHours();
    if (currentDay == 1 && currentHour >= 9 && currentHour <= 17)
        next()
    else
        res.send("We're Closed");
}

module.exports = timeMiddleware;