const express = require('express')// config
const config = require('./config');

// db connection
const { initMongoSession } = require('./db');
const db = initMongoSession();

const app = express();
const port = config.port


//parse json from requests
app.use(express.json);
app.use((req, res, next) => {
  const authToken = req.headers.authorization;
  if (!authToken) {
    res.status(401)
    return res.send({
      "message": "No authorization was provided",
    });
  } else {
    // check token?
  }
  next();
})

app.get('/cities-by-tag', (req, res, next) => {
  console.log(req.query.tag);
  res.status(200)
})

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