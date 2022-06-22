getData();

const map = L.map('map').setView([0, 0], 1);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

async function getData() {
    const response = await fetch('/api');
    const data = await response.json();

    for (item of data) {

        try {
        
        const marker = L.marker([item.lat, item.lon]).addTo(map);
        console.log(item);  

        const txt = `I'm sitting out here at ${item.lat.toFixed(2)}°, ${item.lon.toFixed(2)}°  
        on this ${item.weather.description} day and it is ${((item.weather.main.temp)-273.15).toFixed(2)}°C. outside.
        The concentration of small carcinogenic particles (${item.air.parameter}) 
        I'm breating in is ${item.air.value} ${item.air.unit}
        and it was last measured on ${item.air.lastUpdated}`;

        marker.bindPopup(txt);

        }catch(error) {

            console.error('something went wrong!');

            const marker = L.marker([item.lat, item.lon]).addTo(map);
            console.log(item);  
    
            const txt = `I'm sitting out here at ${item.lat.toFixed(2)}°, ${item.lon.toFixed(2)}°  
            on this ${item.weather.description} day and it is ${((item.weather.main.temp)-273.15).toFixed(2)}°C. outside.
            There is no information about air quality here`;
    
            marker.bindPopup(txt);

        }
        // const root = document.createElement('div');
        // root.classList = 'root';

        // const location = document.createElement('p');
        // location.textContent = `${item.lat}°, ${item.lon}°`;

        // const time = document.createElement('p');
        // const datestring = new Date(item.timestamp).toLocaleString();
        // time.textContent = datestring

        // root.append(location, time);
        // document.body.append(root);
    }
    console.log(data);
}