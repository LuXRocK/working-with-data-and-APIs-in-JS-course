//getting geolocation
let lat, lon;
if ('geolocation' in navigator) {
    console.log('geolocation available');
    navigator.geolocation.getCurrentPosition(async position  => {
        try {
            lat = position.coords.latitude;
            lon = position.coords.longitude;

            document.getElementById('latitude').textContent = lat.toFixed(2)+'°';
            document.getElementById('longitude').textContent = lon.toFixed(2)+'°';

            const api_url = `weather/${lat},${lon}`;
            const response = await fetch(api_url);
            const json = await response.json();
            const weather = json.weather;
            console.log(json);

            document.getElementById('description').textContent = weather.weather[0].description;
            let temp = weather.main.temp;
            temp = temp - 273.15;
            document.getElementById('temperature').textContent = temp.toFixed(2);

            const air = json.air_quality.results[0].measurements[0];
            document.getElementById('aq_parameter').textContent = air.parameter;
            document.getElementById('aq_value').textContent = air.value;
            document.getElementById('aq_units').textContent = air.unit;
            document.getElementById('aq_date').textContent = air.lastUpdated;


            const data = { lat, lon, weather, air };
            const options = {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                    body: JSON.stringify(data)
            };
            const db_response = await fetch('/api', options);
            const db_json = await db_response.json();
            console.log(db_json);
        } catch(error) {
            console.log('something went wrong!!');
            document.getElementById('aq_info').textContent = "Unfortunately there is no data about air quality at that location.";
            
            lat = position.coords.latitude;
            lon = position.coords.longitude;

            const api_url = `weather/${lat},${lon}`;
            const response = await fetch(api_url);
            const json = await response.json();
            const weather = json.weather;
            
            const data = { lat, lon, weather };
            const options = {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                    body: JSON.stringify(data)
            };
            const db_response = await fetch('/api', options);
            const db_json = await db_response.json();
            console.log(db_json);
        };
    });
} else {
    console.log('geolocation unavailable')
}


