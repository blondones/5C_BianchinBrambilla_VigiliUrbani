import { createForm } from "./form.js";

const createMap = (parentElement) => {
    let map, markers = [];

    return {
        build: () => {
            map = L.map(parentElement).setView([45.4642, 9.19], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
        },

        addMarkerByAddress: (incidente) => {
            const address = incidente.indirizzo;

            fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`)
                .then(response => response.json())
                .then(data => {
                    if (data && data.length > 0) {
                        const lat = data[0].lat;
                        const lon = data[0].lon;

                        const marker = L.marker([lat, lon]).addTo(map);

                        const popupContent = "<b>Indirizzo:</b> " + incidente.indirizzo + "<br>" +
                            "<b>Data e Ora:</b> " + incidente.dataOra + "<br>" +
                            "<b>Targhe:</b> " + (incidente.targhe.length > 0 ? incidente.targhe.join("; ") : "Nessuna") + "<br>" +
                            "<b>Morti:</b> " + incidente.morti + "<br>" +
                            "<b>Feriti:</b> " + incidente.feriti;

                        marker.bindPopup(popupContent).openPopup();
                        map.setView([lat, lon], 13);
                        markers.push(marker);
                    } else {
                        console.error("Indirizzo non trovato: " + address);
                        alert("Indirizzo non valido o non trovato!");
                    }
                })
                .catch(error => {
                    console.error("Errore nel geocoding:", error);
                    alert("Errore durante la ricerca dell'indirizzo. Riprova più tardi.");
                });
        },

        clearMarkers: () => {
            markers.forEach(marker => map.removeLayer(marker));
            markers = [];
        }
    };
};

function updateMap() {
    const formContainer = document.getElementById("modaleDiv");
    const mapContainer = document.getElementById("map");
    const form = createForm(formContainer);
    const map = createMap(mapContainer);

    map.build();

    form.onsubmit((incidente) => {
        map.addMarkerByAddress(incidente);
    });

    form.render();
}

updateMap();
