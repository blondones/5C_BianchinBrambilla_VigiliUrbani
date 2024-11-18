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
                                    <label for="targa1" class="form-label">Targa 1</label>
                                    <input type="text" id="targa1" class="form-control">
                                </div>
                                <div class="mb-3">
                                    <label for="targa2" class="form-label">Targa 2</label>
                                    <input type="text" id="targa2" class="form-control">
                                </div>
                                <div class="mb-3">
                                    <label for="targa3" class="form-label">Targa 3</label>
                                    <input type="text" id="targa3" class="form-control">
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
                const targhe = [];
                const targa1 = document.querySelector("#targa1").value;
                const targa2 = document.querySelector("#targa2").value;
                const targa3 = document.querySelector("#targa3").value;

                if (targa1) targhe.push(targa1);
                if (targa2) targhe.push(targa2);
                if (targa3) targhe.push(targa3);

                const incidente = {
                    indirizzo: document.querySelector("#inputVia").value + ", Milano",
                    dataOra: document.querySelector("#dataOra").value,
                    targhe: targhe,
                    morti: parseInt(document.querySelector("#inputMorti").value || "0", 10),
                    feriti: parseInt(document.querySelector("#inputFeriti").value || "0", 10),
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

const form = createForm(document.querySelector("#modalDiv"));
form.onsubmit((incidente) => {
    console.log("Incidente salvato:", incidente);
    alert("Incidente registrato con successo!");
});
form.render();
