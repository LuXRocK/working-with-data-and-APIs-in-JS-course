const btn = document.getElementById('checkIn')

if ('geolocation' in navigator) {
    console.log('geolocation available');
    navigator.geolocation.getCurrentPosition(position  => {
        lat = position.coords.latitude;
        lon = position.coords.longitude;

        document.getElementById('lat_lon').textContent = lat.toFixed(2)+'°' + ', '+lon.toFixed(2)+'°'
    })
} else {
    console.log('geolocation unavailable')
}

let lat, lon;

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
