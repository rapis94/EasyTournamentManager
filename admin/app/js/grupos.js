async function cargarTorneosData() {
    const response = await fetch(server + "/admin/torneos/cargarTorneos", {
        headers: {
            "Content-Type": "application/json",
            "auth": JSON.parse(localStorage.getItem("sesion")).token
        }
    });

    const json = await response.json();

    return json.torneos;
}

async function cargarGrupos(idTorneo) {
    const response = await fetch(server + "/admin/grupos/cargarGrupos", {
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

    return json.grupos;
}

async function initTorneoGrupos() {
    const torneos = await cargarTorneosData();
    const select = document.getElementById("torneoSelect");

    select.innerHTML = '<option value="">Seleccioná un torneo</option>';
    torneos.forEach(t => {
        const opt = document.createElement("option");
        opt.value = t.id;
        opt.textContent = t.Nombre;
        select.appendChild(opt);
    });

    select.onchange = async (e) => {
        const idTorneo = e.target.value;
        if (!idTorneo) return;
        const grupos = await cargarGrupos(idTorneo);

        execContext.grupoDataManager = new DataManager({ destino: "results", cols: ["id", "Nombre", "playerCount", "btnSelect"] });
        execContext.grupoDataManager.setData(grupos.map(grupo => {
            grupo.playerCount = grupo.inscripciones.length;
            grupo.btnSelect = `<button class="btn btn-primary" onclick="seleccionarGrupo(${grupo.id})">Seleccionar</button>`;
            return grupo
        }));
        execContext.grupoDataManager.updateView();
    };
}
/* 

execContext = watchObject(execContext, async ({ prop, newValue }) => {

    if (prop === "torneoSelected" && newValue != false) {
        const result = await cargarGrupos(newValue);
        execContext.dataStorage = result.map(grupo => {
            grupo.playerCount = grupo.inscripciones.length;
            grupo.btnSelect = `<button class="btn btn-primary" onclick="seleccionarGrupo(${grupo.id})">Seleccionar</button>`
            return grupo
        });
        dataManager("results", () => true, execContext.cols);
    }

    if (prop == "grupoSelected") {

    }
});
 */

function seleccionarGrupo(id) {
    console.log(execContext.grupoDataManager);
    execContext.grupoSelected = execContext.grupoDataManager.dataStorage.find(grupo => grupo.id == id);
    console.log(execContext.grupoSelected);
}


