getData();

async function getData(){
    const response = await fetch('/api');
    const data = await response.json();

    for (item of data) {
        const root = document.createElement('div');
        root.classList = 'root';
        const mood = document.createElement('div');
        const geo = document.createElement('div');
        const date = document.createElement('div');
        const img = document.createElement('img');
        const picture = document.createElement('img');

        mood.textContent = `mood: ${item.mood}`;
        geo.textContent = `${item.lat}°, ${item.lon}°`;
        const dateString = new Date(item.timestamp).toLocaleString();
        date.textContent = dateString;
        img.src = item.img64;
        picture.src = item.picture;

        root.append(mood, geo, date, img, picture);
        document.body.append(root);
    }
    console.log(data);
};
