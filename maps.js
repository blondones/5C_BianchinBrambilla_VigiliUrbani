import { createForm } from "./form.js";

export const createMap = (parentElement) => {
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

            fetch('https://nominatim.openstreetmap.org/search?format=json&q=' + encodeURIComponent(address))
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

                        addToTable(incidente);
                    } else {
                        console.error("Indirizzo non trovato: " + address);
                    }
                })
                .catch(error => {
                    console.error("Errore nel geocoding:", error);
                });
        },

        clearMarkers: () => {
            markers.forEach(marker => map.removeLayer(marker));
            markers = [];
            clearTable();
        }
    };
};

export function addToTable(incidente) {
    const tableDiv = document.getElementById("tableDiv");

    if (!tableDiv.querySelector("table")) {
        const tableHTML = 
            '<table class="table table-striped">' +
                '<thead>' +
                    '<tr>' +
                        '<th>Indirizzo</th>' +
                        '<th>Data e Ora</th>' +
                        '<th>Targa 1</th>' +
                        '<th>Targa 2</th>' +
                        '<th>Targa 3</th>' +
                        '<th>Morti</th>' +
                        '<th>Feriti</th>' +
                    '</tr>' +
                '</thead>' +
                '<tbody id="tableBody">' +
                '</tbody>' +
            '</table>';
        tableDiv.innerHTML = tableHTML;
    }

    const tableBody = document.getElementById("tableBody");

    const rowHTML = 
        '<tr>' +
            '<td>' + incidente.indirizzo + '</td>' +
            '<td>' + incidente.dataOra + '</td>' +
            '<td>' + (incidente.targhe) + '</td>' +
            '<td>' + incidente.morti + '</td>' +
            '<td>' + incidente.feriti + '</td>' +
        '</tr>';

    tableBody.innerHTML += rowHTML;
}

function clearTable() {
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = "";
}
