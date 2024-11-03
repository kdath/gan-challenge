const express = require('express')// config
const config = require('./config');
const {authenticationMiddleware} = require('./middleware/authentication')
const {initMongoSession} = require('./database/mongo');
const {getByTag, getDistance, getAllCities} = require("./controllers/cityController");
const {getAreaCities, getAreaResult} = require("./controllers/areaController");

const port = config.port
const db = initMongoSession();
const app = express();

app.use(authenticationMiddleware)
app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`)
    next();
})

app.get('/cities-by-tag', getByTag)
app.get('/distance', getDistance)
app.get('/area', getAreaCities)
app.get('/area-result/:guid', getAreaResult)
app.get('/all-cities', getAllCities)

app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`);
})

const shutdown = () => {
    db.close();
    console.log('Goodbye')
    process.exit()
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)