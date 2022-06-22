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
        const root = document.createElement('div');
        root.classList = 'root';

        const location = document.createElement('p');
        location.textContent = `${item.lat}°, ${item.lon}°`;

        const time = document.createElement('p');
        const datestring = new Date(item.timestamp).toLocaleString();
        time.textContent = datestring

        root.append(location, time);
        // document.body.append(root);
    }
    console.log(data);
}