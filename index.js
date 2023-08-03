const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const setTZ = require('set-tz');
setTZ('UTC');

// parse application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
console.log(new Date().toString())

const server = http.createServer(app);
const port = 3035;
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
})

const {
    GetSystemDetailsController
} = require('./controllers/index');

const ControllerCallBack = require('./framework/web-express/controllers-callback');


// ------------------------ Get APIs ------------------------------------------

app.get("/dev/api/getSystemDetails",ControllerCallBack(GetSystemDetailsController));



