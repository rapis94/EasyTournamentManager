async function cargarUsuarios() {
    const response = await fetch(server + "/admin/usuarios/cargarUsuarios", {
        headers: {
            "Content-Type": "application/json",
            "auth": JSON.parse(localStorage.getItem("sesion")).token
        }
    });

    const json = await response.json();

    return json.usuarios.map(usuario => {

        const btnActivar = `<button class="btn btn-success" onclick="toggleUsuario(${usuario.id})">Activar</button>`;
        const btnDesctivar = `<button class="btn btn-danger" onclick="toggleUsuario(${usuario.id})">Desactivar</button>`;
        usuario.activoBtn = usuario.activo == 1 ? btnDesctivar : btnActivar;
        return usuario;
    });
}

async function initUsuarios() {
    execContext.cols = ["id", "profPic", "Nombre", "email", "discord", "steam", "elo", "Tipo", "activoBtn"];
    usuarios = await cargarUsuarios();
    console.log(usuarios);
    execContext.dataStorage = new DataManager({ destino: "results", cols: ["id", "profPic", "Nombre", "email", "discord", "steam", "elo", "Tipo", "activoBtn"] });
    execContext.dataStorage.setData(usuarios);
    execContext.dataStorage.updateView();

}




async function toggleUsuario(idUsuario) {
    const response = await fetch(server + "/admin/usuarios/activarUsuario", {
        headers: {
            "Content-Type": "application/json",
            "auth": JSON.parse(localStorage.getItem("sesion")).token
        },
        method: "POST",
        body: JSON.stringify({
            idUsuario
        })
    });

    const json = await response.json();

    if (json.codigo == 200) {
        const newData = [...execContext.dataStorage];
        execContext.dataStorage = newData.map(dato => {
            const btnActivar = `<button class="btn btn-success" onclick="toggleUsuario(${dato.id})">Activar</button>`;
            const btnDesctivar = `<button class="btn btn-danger" onclick="toggleUsuario(${dato.id})">Desactivar</button>`;
            if (dato.id == idUsuario) {
                dato.activo = dato.activo == 0 ? 1 : 0;
                dato.activoBtn = dato.activo == 0 ? btnActivar : btnDesctivar;
            }
            return dato;
        });

        dataManager("results", () => true, execContext.cols);

        alert("Se cambió el estado con éxito");
    }
}

