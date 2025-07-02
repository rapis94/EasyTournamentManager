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

async function cargarDuelos(idTorneo) {
    const response = await fetch(server + "/admin/duelos/cargarDuelosTorneo", {
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

    return json.duelos;
}


async function initDuelos() {

    const torneos = await cargarTorneosData();
    const select = document.getElementById("torneoSelect");
    const selectGrupo = document.getElementById("grupoSelect");
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
        selectGrupo.innerHTML = '<option value="">Seleccioná un grupo</option>';
        execContext.grupos = grupos;
        grupos.forEach((t, index) => {
            if (index > 0) {
                const opt = document.createElement("option");
                opt.value = t.id;
                opt.textContent = t.Nombre;
                selectGrupo.appendChild(opt);
            }
        });

        const duelos = await cargarDuelos(idTorneo);
        execContext.duelos = new DataManager({ cols: ["id", "fechaFormatted", "Grupo", "playersHtml"] });
        execContext.duelos.setData(duelos.map(d => {
            d.playersHtml = "<ul>";
            d.players.forEach(p => {
                d.playersHtml += `<li>${p.Nombre}</li>`;
            })
            d.playersHtml += "</ul>";
            if (d.fecha != "1900-01-01 00:00:00") {
                d.fechaFormatted = convertirFecha(d.fecha);

            } else {
                d.fechaFormatted = "A determinar";
            }
            return d;
        }));
        execContext.duelos.updateView();
    };

    selectGrupo.onchange = async (e) => {
        const idGrupo = e.target.value;
        execContext.grupoSelected = execContext.grupos.find(g => g.id == idGrupo);
        const grupo = execContext.grupoSelected;
        execContext.grupoInscripciones = new DataManager({ btnPrev: "prev-players", btnPrev: "next-players", destino: "grupo-players", cols: ["id", "Nombre", "elo"] });
        execContext.grupoInscripciones.setData(grupo.inscripciones);
        execContext.grupoInscripciones.updateView();
        const vistaPlayers = document.getElementById("grupo-details");
        vistaPlayers.classList.remove("hidden");
        const duelosGrupo = execContext.duelos.dataStorage.filter(d => d.idGrupo == idGrupo);
        console.log(execContext.duelos.dataStorage)
        execContext.duelosGrupo = new DataManager({ cols: ["id", "fechaFormatted", "Grupo", "playersHtml"] });
        execContext.duelosGrupo.setData(duelosGrupo);
        execContext.duelosGrupo.updateView();
    }
}


async function crearDuelos1v1() {
    if (execContext?.grupoSelected) {

        const grupo = execContext.grupoSelected;
        const response = await fetch(server + "/admin/duelos/crearDuelosAuto1v1", {
            headers: {
                "Content-Type": "application/json",
                "auth": JSON.parse(localStorage.getItem("sesion")).token
            },
            method: "POST",
            body: JSON.stringify({
                inscripciones: grupo.inscripciones,
                idGrupo: grupo.id
            })
        });

        const json = await response.json();

        if (json.codigo == 200) {
            alert(json.mensaje);
            const duelos = await cargarDuelos(idTorneo);
            execContext.duelos = new DataManager({ cols: ["id", "fechaFormatted", "Grupo", "playersHtml"] });
            execContext.duelos.setData(duelos.map(d => {
                d.playersHtml = "<ul>";
                d.players.forEach(p => {
                    d.playersHtml += `<li>${p.Nombre}</li>`;
                })
                d.playersHtml += "</ul>";
                if (d.fecha != "1900-01-01 00:00:00") {
                    d.fechaFormatted = convertirFecha(d.fecha);

                } else {
                    d.fechaFormatted = "A determinar";
                }
                return d;
            }));
            execContext.grupoSelected = execContext.grupos.find(g => g.id == execContext.grupoSelected.id);

            const idGrupo = execContext.grupoSelected.id;

            const duelosGrupo = execContext.duelos.dataStorage.filter(d => d.idGrupo == idGrupo);
            execContext.duelosGrupo = new DataManager({ cols: ["id", "fechaFormatted", "Grupo", "playersHtml"] });
            execContext.duelosGrupo.setData(duelosGrupo);
            execContext.duelosGrupo.updateView();

        } else {
            alert(json.mensaje);
        }
    } else {
        alert("Debes seleccionar un grupo para generar los duelos");
    }

}


