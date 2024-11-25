import { generateFetchComponent } from "./fetch.js";
import { addToTable } from "./maps.js";
import { createMap } from "./maps.js";

const createLogin = () => {
    const myToken = "2891583b-c4cc-4903-818f-75b825c26f70"; 
    let isLogged = sessionStorage.getItem("Logged") === "true" ? true : false; 
    const renderLogin = () => {
        document.body.innerHTML = `
            <div id="login-container">
                <div class="login-box">
                    <h2>Login</h2>
                    <form id="loginForm">
                        <div class="mb-3">
                            <label for="name" class="form-label">Nome</label>
                            <input type="text" id="name" class="form-control" required>
                        </div>
                        <div class="mb-3">
                            <label for="password" class="form-label">Password</label>
                            <input type="password" id="password" class="form-control" required>
                        </div>
                        <button type="button" id="loginButton" class="btn btn-primary">Login</button>
                    </form>
                    <div id="loginMessage" class="mt-3 text-danger d-none">
                        Credenziali non valide
                    </div>
                </div>
            </div>
        `;
    };

    if (!isLogged) {
        const privateDiv = document.querySelector("#private");
        if (privateDiv) {
            privateDiv.classList.add("hidden");
        }

        renderLogin();

        const loginButton = document.querySelector("#loginButton");
        const loginMessage = document.querySelector("#loginMessage");

        loginButton.onclick = () => {
            const name = document.querySelector("#name").value;
            const password = document.querySelector("#password").value;

            if (name === "utente" && password === "password") {
                sessionStorage.setItem("Logged", "true");
                isLogged = true;

                document.querySelector("#login-container").innerHTML = "";
                if (privateDiv) {
                    privateDiv.classList.add("visible");
                    privateDiv.classList.remove("hidden");
                }
            } else {
                loginMessage.classList.remove("d-none");
            }
        };
    } else {
        const privateDiv = document.querySelector("#private");
        if (privateDiv) {
            privateDiv.classList.add("visible");
            privateDiv.classList.remove("hidden");
        }
    }

    return {
        isLogged: () => isLogged,
    };
};

createLogin();

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
                <button type="button" class="button btn btn-primary" data-bs-toggle="modal" data-bs-target="#incidentModal">
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
                                    <label for="targa1" class="form-label">Targhe</label>
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
                            <div id="message" class="mt-3 text-danger d-none"> 
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

const fetch = generateFetchComponent();
fetch.getData().then((s) => {
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
    fetch.getData().then((r) => {
        let result = JSON.parse(r);
        if (!result[incidente[eliminaspazi(incidente.indirizzo + "-" + incidente.dataOra)]]) result[eliminaspazi(incidente.indirizzo + "-" + incidente.dataOra)] = incidente;
        else console.log("presente")
        fetch.setData(result).then(() => {
            fetch.getData().then((s) => {
                let lastResult = JSON.parse(s);
                addToTable(lastResult)
            }).catch(console.error)
        }).catch(console.error)
    }).catch(console.error)
    console.log("Incidente salvato:", incidente);
});



form.render();
