async function cargarTorneos() {
    const response = await fetch(server + "/admin/torneos/cargarTorneos", {
        headers: {
            "Content-Type": "application/json",
            "auth": JSON.parse(localStorage.getItem("sesion")).token
        }
    });

    const json = await response.json();

    return json.torneos.map(torneo => {

        const btnActivar = `<button class="btn btn-success" onclick="toggleTorneo(${torneo.id})">Activar</button>`;
        const btnDesctivar = `<button class="btn btn-danger" onclick="toggleTorneo(${torneo.id})">Desactivar</button>`;
        torneo.activoBtn = torneo.activo == 1 ? btnDesctivar : btnActivar;
        torneo.pagoTxt = torneo.pago == 0 ? "No" : "Si";
        torneo.fechaParsed = convertirFecha(torneo.fechaInicio);
        torneo.modBtn = `<button class="btn btn-primary" onclick="modificarTorneo(${torneo.id})">Modificar</button>`;
        return torneo;
    });
}

async function initTorneos() {
    const torneos = await cargarTorneos();
    execContext.dataStorage = new DataManager({destino:"results", cols:["id", "Nombre", "eloMin", "eloMax", "pagoTxt", "fechaParsed", "img", "Grupos", "modBtn", "activoBtn"]});
    execContext.dataStorage.setData(torneos);
    execContext.dataStorage.updateView();
}




async function toggleTorneo(idTorneo) {
    const response = await fetch(server + "/admin/torneos/activarTorneo", {
        headers: {
            "Content-Type": "application/json",
            "auth": JSON.parse(localStorage.getItem("sesion")).token
        },
        method: "POST",
        body: JSON.stringify({
            idTorneo
        })
    });

    const json = await response.json();

    if (json.codigo == 200) {
        const newData = [...execContext.dataStorage];
        execContext.dataStorage = newData.map(dato => {
            const btnActivar = `<button class="btn btn-success" onclick="toggleTorneo(${dato.id})">Activar</button>`;
            const btnDesctivar = `<button class="btn btn-danger" onclick="toggleTorneo(${dato.id})">Desactivar</button>`;
            if (dato.id == idTorneo) {
                dato.activo = dato.activo == 0 ? 1 : 0;
                dato.activoBtn = dato.activo == 0 ? btnActivar : btnDesctivar;
            }
            return dato;
        });

        dataManager("results", () => true, execContext.cols);

        alert("Se cambió el estado con éxito");
    }
}


