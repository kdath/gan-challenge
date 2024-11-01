const express = require('express')// config
const config = require('./config');
const {getByTag} = require('./actions')

const port = config.port

// db connection
const { initMongoSession } = require('./db');
const db = initMongoSession();

const app = express();

app.use((req, res, next) => {
  const authToken = req.headers.authorization;
  if (!authToken) {
    res.status(401).send({
      "message": "No authorization was provided",
    })
  } else {
    // check token?
    console.log('Authorized token')
    next();
  }
})

app.get('/', (req, res, next) => {
  res.send('Hello')
})

app.get('/cities-by-tag', getByTag)

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
})


function shutdown() {
  db.close();
  console.log('Goodbye')
  process.exit()
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)