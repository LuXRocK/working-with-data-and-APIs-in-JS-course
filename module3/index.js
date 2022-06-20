const express = require('express');
const Datastore = require('nedb');
const fetch = require('node-fetch');

const app = express();
app.listen(3002, () => console.log('listening at 3002'));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

const database = new Datastore('database.db');
database.loadDatabase();

app.get('/api', (request, response) => {
    database.find({}, (err, data) => {
        if (err) {
            response.end();
            return;
        }
        response.json(data);
    })
})

app.post('/api', (request, response) => {
    console.log('i got a request');
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    database.insert(data);
    response.json(data);
});




app.get('/weather/:latlon', async (request, response) => {
    const latlon = request.params.latlon.split(',');
    console.log(request.params);
    console.log(latlon);
    const lat = latlon[0];
    const lon = latlon[1];
    console.log(lat, lon);
    // const api_key = '97b6e7e5e0151749788be3a5d34a0e19'
    const api_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=97b6e7e5e0151749788be3a5d34a0e19`;
    
    // const api_url = 'https://api.openweathermap.org/data/2.5/weather?lat=50.3249278&lon=18.7857186&appid=f417256e3985412b0df83d2ca7947de5'
    console.log(api_url);
    const fetch_response = await fetch(api_url);
    const json = await fetch_response.json();
    console.log(json);
    response.json(json);
});