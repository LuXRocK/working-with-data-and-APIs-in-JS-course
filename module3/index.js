const express = require('express');
const Datastore = require('nedb');


const app = express();
app.listen(3002, () => console.log('listening at 3002'));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

const database = new Datastore('database.db');
database.loadDatabase();


app.post('/api', (request, response) => {
    console.log('i got a request');
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    database.insert(data);
    response.json(data);
})