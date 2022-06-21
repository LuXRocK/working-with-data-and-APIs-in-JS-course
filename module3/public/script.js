//getting geolocation
let lat, lon;
if ('geolocation' in navigator) {
    console.log('geolocation available');
    navigator.geolocation.getCurrentPosition(async position  => {
        lat = position.coords.latitude;
        lon = position.coords.longitude;

        document.getElementById('lat_lon').textContent = lat.toFixed(2)+'°' + ', '+lon.toFixed(2)+'°';
        const api_url = `weather/${lat},${lon}`;
        // const api_url = `/weather`;
        // const api_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=97b6e7e5e0151749788be3a5d34a0e19`;
        const response = await fetch(api_url);
        const json = await response.json();
        console.log(json);
    });
} else {
    console.log('geolocation unavailable')
}

// Submiting data to database
const btn = document.getElementById('checkIn');
btn.addEventListener('click', async event => {
    const data = { lat, lon };
    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
            body: JSON.stringify(data)
    };
    const response = await fetch('/api', options);
    const json = await response.json();
    console.log(json);
});
