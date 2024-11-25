import { generateFetchComponent } from "./fetch.js";
import { addToTable } from "./maps.js";
import { createMap } from "./maps.js";

let isLogged = sessionStorage.getItem("login");
if(isLogged === "true"){
    document.getElementById("insert-incident").classList.toggle("hidden");
    document.getElementById("register-button").classList.add("hidden")
    document.getElementById("login-button").classList.add("hidden")
}
else{
    console.log("Non loggato")
}

document.getElementById("register-button").onclick = () => {
    document.getElementById("credential").innerHTML = `<form>
    <div class="form-group">
      <label for="usernameInput">Username</label>
      <input type="text" class="form-control" id="usernameInput" aria-describedby="usernameHelp" placeholder="Enter username">
    </div>
    <div class="form-group">
      <label for="passwordInput">Password</label>
      <input type="password" class="form-control" id="passwordInput" placeholder="Password">
    </div>
    <button id="credentialRegister" type="button" class="btn btn-success">Submit</button>
  </form>
  `

  document.getElementById("credentialRegister").onclick = () => {
    console.log("Provando a registrarsi");
    fetch("https://ws.cipiaceinfo.it/credential/register", {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "key": "2891583b-c4cc-4903-818f-75b825c26f70"
        },
        body: JSON.stringify( {
            username: document.getElementById("usernameInput").value,
            password: document.getElementById("passwordInput").value
        })
    }).then(r => r.json()).then(()=>{
        const username = document.getElementById("usernameInput").value;
        const password = document.getElementById("passwordInput").value;

        document.getElementById("usernameInput").value="";
        document.getElementById("passwordInput").value ="";

        sessionStorage.setItem("login", "true");

        document.getElementById("insert-incident").classList.toggle("hidden");
        document.getElementById("credential").classList.add("hidden")
        document.getElementById("register-button").classList.add("hidden")
        document.getElementById("login-button").classList.add("hidden")

    }).catch(console.error);
  }
}


document.getElementById("login-button").onclick = () => {
    document.getElementById("credential").innerHTML = `<form>
    <div class="form-group">
      <label for="usernameInput">Username</label>
      <input type="text" class="form-control" id="usernameInput" aria-describedby="usernameHelp" placeholder="Enter username">
    </div>
    <div class="form-group">
      <label for="passwordInput">Password</label>
      <input type="password" class="form-control" id="passwordInput" placeholder="Password">
    </div>
    <button id="credentialLogin" type="button" class="btn btn-success">Submit</button>
  </form>
  `

  document.getElementById("credentialLogin").onclick = () => {
    console.log("Provando a loggarsi")
    fetch("https://ws.cipiaceinfo.it/credential/login", {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "key": "2891583b-c4cc-4903-818f-75b825c26f70"
        },
        body:JSON.stringify( {
            username: document.getElementById("usernameInput").value,
            password: document.getElementById("passwordInput").value
        })
    }).then(r => r.json()).then(()=>{
        const username = document.getElementById("usernameInput").value;
        const password = document.getElementById("passwordInput").value;

        document.getElementById("usernameInput").value="";
        document.getElementById("passwordInput").value ="";

        sessionStorage.setItem("login", "true");

        document.getElementById("insert-incident").classList.toggle("hidden");
        document.getElementById("credential").classList.add("hidden")
        document.getElementById("register-button").classList.add("hidden")
        document.getElementById("login-button").classList.add("hidden")

    }).catch(console.error);
  }
}

function eliminaspazi(stringa) {
    let stringaResult = "";
    for (let i = 0; i < stringa.length; i++) {
        if (!(stringa.charAt(i) === " ")) {
            stringaResult += stringa.charAt(i);
        }
    }
    return stringaResult;
}

export const createForm = (parentElement) => {
    let callback = null;

    return {
        onsubmit: (callbackInput) => { callback = callbackInput; },

        render: () => {
            parentElement.innerHTML = `
            <div class="ap">
                <button type="button" id = "bsi" class="button btn btn-primary" data-bs-toggle="modal" data-bs-target="#incidentModal">
                  Segnala Incidente
                </button>
            </div>
            <div class="modal fade" id="incidentModal" tabindex="-1" aria-labelledby="incidentModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="incidentModalLabel">Nuovo Incidente</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="incidentForm">
                                <div class="mb-3">
                                    <label for="inputVia" class="form-label">Via</label>
                                    <input type="text" id="inputVia" class="form-control" required>
                                </div>
                                <div class="mb-3">
                                    <label for="dataOra" class="form-label">Data e Ora</label>
                                    <input type="datetime-local" id="dataOra" class="form-control" required>
                                </div>
                                <div class="mb-3">
                                    <label for="targa1" class="form-label">Targa 1</label>
                                    <input type="text" id="targa" class="form-control">
                                </div>
                                <div class="mb-3">
                                    <label for="inputMorti" class="form-label">Morti</label>
                                    <input type="number" id="inputMorti" class="form-control">
                                </div>
                                <div class="mb-3">
                                    <label for="inputFeriti" class="form-label">Feriti</label>
                                    <input type="number" id="inputFeriti" class="form-control">
                                </div>
                            </form>
                            <div id="message" class="mt-3 text-danger d-none"> <!-- Messaggio di errore -->
                                Compila tutti i campi obbligatori!
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" id="cancel" data-bs-dismiss="modal">Annulla</button>
                            <button type="button" class="btn btn-success" id="submit">Invia</button>
                        </div>
                    </div>
                </div>
            </div>
            `;

            const messageElement = document.querySelector("#message");

            document.querySelector("#submit").onclick = () => {
                const targa = document.querySelector("#targa").value;

                const incidente = {
                    indirizzo: document.querySelector("#inputVia").value + ", Milano",
                    dataOra: document.querySelector("#dataOra").value,
                    targhe: targa,
                    morti: parseInt(document.querySelector("#inputMorti").value || "0", 10),
                    feriti: parseInt(document.querySelector("#inputFeriti").value || "0", 10),
                    key: document.querySelector("#inputVia").value + ", Milano" + document.querySelector("#dataOra").value
                };

                if (!incidente.indirizzo || !incidente.dataOra) {
                    messageElement.classList.remove("d-none");
                } else {
                    messageElement.classList.add("d-none");

                    if (callback) {
                        callback(incidente);
                    }
                    document.querySelector("#incidentForm").reset();
                    document.getElementById("cancel").click();
                }
            };

            document.querySelector("#cancel").onclick = () => {
                document.querySelector("#incidentForm").reset();
                messageElement.classList.add("d-none");
            };
        },
    };
};

const fetchComponent = generateFetchComponent();
fetchComponent.getData().then((s) => {
    let lastResult = JSON.parse(s);
    console.log(lastResult);
    if (lastResult)
        addToTable(lastResult)
    /*for(const key in lastResult) {
        addToTable(lastResult[key]);
    }*/
}).catch(console.error)
const form = createForm(document.querySelector("#modalDiv"));
const mapContainer = document.getElementById("map");
const map = createMap(mapContainer);
console.log(map)
map.build();



form.onsubmit((incidente) => {
    map.addMarkerByAddress(incidente);
    fetchComponent.getData().then((r) => {
        let result = JSON.parse(r);
        if (!result[incidente[eliminaspazi(incidente.indirizzo + "-" + incidente.dataOra)]]) result[eliminaspazi(incidente.indirizzo + "-" + incidente.dataOra)] = incidente;
        else console.log("presente")
        fetchComponent.setData(result).then(() => {
            fetchComponent.getData().then((s) => {
                let lastResult = JSON.parse(s);
                addToTable(lastResult)
            }).catch(console.error)
        }).catch(console.error)
    }).catch(console.error)
    console.log("Incidente salvato:", incidente);
});



form.render();
