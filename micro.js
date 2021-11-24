const express = require('express');
const routers = require('./routes/crack')
const multer = require('multer');
const upload = multer({ dest: 'libs/' }).array("file", 20)
const app = express()
const port = 15005


app.use("/", routers.router)
app.use(upload)

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})