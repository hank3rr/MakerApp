const express = require('express');
const cors = require('cors');
const http = require('http');
const app = express();
const routes = require('./routes/index.js')
require('dotenv').config();
require('./models/db');
const port = process.env.PORT || 6000;

app.use(cors());
app.use(express.json());

app.use('/api/v1', routes);

app.all('*', (req, res, next) => {
    res.status(404).send({success: false, message: "path not found", data: []});
});

let server = http.createServer(app);
server.listen(port);

server.on('listening', () => {
    console.log(`listening on ${port}`)
});

server.on('error', (err) => {
    console.log(err);
});
