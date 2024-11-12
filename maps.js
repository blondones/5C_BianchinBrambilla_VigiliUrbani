const map = L.map('map').setView([45.4642, 9.19], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

function addMarkerByAddress(address) {
    fetch('https://nominatim.openstreetmap.org/search?format=json&q=' + (address))
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                const lat = data[0].lat;
                const lon = data[0].lon;
                const marker = L.marker([lat, lon]).addTo(map);
                marker.bindPopup('<b>' + address + '</b><br>Lat: ' + lat + ', Lon: ' + lon).openPopup();
                map.setView([lat, lon], 13);
            } else {
                alert('Indirizzo non trovato');
            }
        })
        .catch(error => {
            console.error('Errore nel geocoding:', error);
            alert('Errore nel geocoding');
        });
}