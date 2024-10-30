const express = require('express')
const app = express();
const port = 8080


//parse json from requests
app.use(express.json);

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
})






function shutdown() {
  console.log('Goodbye')
  process.exit()
}
process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)