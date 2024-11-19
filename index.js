import { generateFetchComponent } from "./fetch.js"

const fetchComp = generateFetchComponent();
fetchComp.setData({
    "ViaNinoBixio15-19112024": {
        indirizzo: "Via Nino Bixio 15",
        targhe: "AB123CD",
        morti: 90,
        feriti: 200,
        dataOra: new Date(Date.now()).toUTCString()
    }
}).then(console.log).catch(console.error);