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

function seleccionarGrupo(id) {
    const grupos = execContext.grupoDataManager.dataStorage;
    execContext.grupoSelected = grupos.find(grupo => grupo.id == id);
    execContext.grupoSelected.inscripciones = execContext.grupoSelected.inscripciones.map(
        inscripcion => {
            let htmlSelect = `<select onchange='cambiarGrupo(${inscripcion.id}, this.value)'>`;
            grupos.forEach(grupo => {
                htmlSelect += `<option ${grupo.id == id ? "selected" : ""} value='${grupo.id}'>${grupo.Nombre}</option>`
            })
            htmlSelect += `</select>`
            inscripcion.comprobanteLink = `<a href='https://demovanilla.ddns.net:456/fotos/comprobantes/${inscripcion.comprobante}' target='_blank'>Click para ver</a>`
            inscripcion.cambiarGrupo = htmlSelect;
            return inscripcion
        }
    )
    execContext.grupoSelectedDM = new DataManager({ destino: "grupo-players", cols: ["id", "Nombre", "elo", "comprobanteLink", "cambiarGrupo"], btnPrev: "prev-players", btnNext: "next-players", dataCountView: "dataCountViewPlayers" });
    execContext.grupoSelectedDM.setData(execContext.grupoSelected.inscripciones);
    execContext.grupoSelectedDM.updateView();
    const vistaPlayers = document.getElementById("grupo-details");
    vistaPlayers.classList.remove("hidden");
}
execContext.grupoSelectedDM = {dataStorage: []}
let superWatch = watchObject(execContext.grupoSelectedDM.dataStorage, ({prop, newValue})=>{
    console.log(`Cambia ${prop}: ${value}`);
})

async function cambiarGrupo(idPlayer, idGrupo) {
    const inscripciones = execContext.grupoSelectedDM.dataStorage;
    const response = await fetch(server + "/admin/grupos/cambiarGrupo", {
        headers: {
            "Content-Type": "application/json",
            "auth": JSON.parse(localStorage.getItem("sesion")).token
        },
        method: "POST",
        body: JSON.stringify({
            idPlayer, idGrupo
        })
    });

    const json = await response.json();

   if (json.codigo === 200) {
        const inscripcion = inscripciones.find(inscripcion => inscripcion.id == idPlayer);
        const oldGrupoId = inscripcion.idGrupo;

        inscripcion.idGrupo = idGrupo;

        const nuevoGrupo = execContext.grupoDataManager.dataStorage.find(grupo => grupo.id == idGrupo);
        nuevoGrupo.inscripciones.push(inscripcion);

        const oldGrupo = execContext.grupoDataManager.dataStorage.find(grupo => grupo.id == oldGrupoId);
        oldGrupo.inscripciones = oldGrupo.inscripciones.filter(i => i.id != idPlayer);

        const nuevasInscripciones = inscripciones.filter(i => i.id != idPlayer);
        execContext.grupoSelectedDM.setData(nuevasInscripciones);
        execContext.grupoSelectedDM.updateView();

        execContext.grupoDataManager.dataStorage.forEach(grupo => {
            grupo.playerCount = grupo.inscripciones.length;
        });
        execContext.grupoDataManager.updateView();
    }

}


