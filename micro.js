const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const app = express()
const expressWs = require('express-ws')(app);
const routers = require('./routes/crack')
const rpc = require('./routes/rpc')


app.engine('html', require('express-art-template'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.use(bodyParser.json())
app.use("/", routers.router, rpc.router);
app.listen(15005, () => {
  console.log(`listening at http://localhost:15005/exploer`)
})