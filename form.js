export const createForm = (parentElement) => {
    let callback = null;

    return {
        onsubmit: (callbackInput) => { callback = callbackInput; },

        render: () => {
            parentElement.innerHTML = `
            <form id="moduloIncidente" class="container">
                <div class="row">
                    <label for="inputVia">Via</label>
                    <input type="text" id="inputVia" class="form-control" required />
                </div>
                <div class="row">
                    <label for="dataOra">Data e Ora</label>
                    <input type="datetime-local" id="dataOra" class="form-control" required />
                </div>
                <div class="row">
                    <label for="targa1">Targa 1</label>
                    <input type="text" id="targa1" class="form-control" />
                </div>
                <div class="row">
                    <label for="targa2">Targa 2</label>
                    <input type="text" id="targa2" class="form-control" />
                </div>
                <div class="row">
                    <label for="targa3">Targa 3</label>
                    <input type="text" id="targa3" class="form-control" />
                </div>
                <div class="row">
                    <label for="inputMorti">Morti</label>
                    <input type="number" id="inputMorti" class="form-control" />
                </div>
                <div class="row">
                    <label for="inputFeriti">Feriti</label>
                    <input type="number" id="inputFeriti" class="form-control" />
                </div>
                <div class="row">
                    <button type="button" id="submit" class="btn btn-success">Invia</button>
                    <button type="button" id="clearButton" class="btn btn-danger">Pulisci</button>
                </div>
                <div class="row">
                    <label id="resultLabel" class="text-danger"></label>
                </div>
            </form>
            `;

            const clearForm = () => {
                document.getElementById("inputVia").value = "";
                document.getElementById("dataOra").value = "";
                document.getElementById("targa1").value = "";
                document.getElementById("targa2").value = "";
                document.getElementById("targa3").value = "";
                document.getElementById("inputMorti").value = "";
                document.getElementById("inputFeriti").value = "";
                document.getElementById("resultLabel").innerText = "";
            };

            document.getElementById("submit").onclick = () => {
                const targhe = [];
                const targa1 = document.getElementById("targa1").value;
                const targa2 = document.getElementById("targa2").value;
                const targa3 = document.getElementById("targa3").value;

                if (targa1) targhe.push(targa1);
                if (targa2) targhe.push(targa2);
                if (targa3) targhe.push(targa3);

                const incidente = {
                    indirizzo: document.getElementById("inputVia").value + ", Milano",
                    dataOra: document.getElementById("dataOra").value,
                    targhe: targhe,
                    morti: parseInt(document.getElementById("inputMorti").value || "0", 10),
                    feriti: parseInt(document.getElementById("inputFeriti").value || "0", 10),
                };

                if (callback) {
                    callback(incidente);
                }
            };

            document.getElementById("clearButton").onclick = clearForm;
        },

        clear: () => {
            document.getElementById("inputVia").value = "";
            document.getElementById("dataOra").value = "";
            document.getElementById("targa1").value = "";
            document.getElementById("targa2").value = "";
            document.getElementById("targa3").value = "";
            document.getElementById("inputMorti").value = "";
            document.getElementById("inputFeriti").value = "";
            document.getElementById("resultLabel").innerText = "";
        },

        setError: (error) => {
            document.getElementById("resultLabel").innerText = error;
        }
    };
};
