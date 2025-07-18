async function enviarRegistro(e, form) {
    try {
        const btnReg = document.getElementById("btn-register");
        btnReg.disabled = true;
        const previous = btnReg.innerHTML;
        btnReg.innerHTML = "Cargando...";
        e.preventDefault();

        const data = {
            nick: form.nick.value,
            email: form.email.value,
            discord: form.discord.value,
            steam: form.steam.value
        };


        const response = await fetch(api + "/public/registerUser", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(
                data
            )
        });

        const json = await response.json();

        if (json.codigo == 200) {
            btnReg.innerHTML = "Registrado con éxito";
            alert(json.mensaje);
        } else {
            btnReg.innerHTML = previous;
            btnReg.disabled = null;
            alert(json.mensaje);
        }

    } catch (error) {
        alert(error);
    }
}

async function login(e, form) {
    e.preventDefault();
    try {
        const data = {
            email: form.email.value,
            pass: form.pass.value

        }
        const response = await fetch(api + "/public/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });

        const json = await response.json();

        if (json.codigo == 200) {
            alert("Sesión Iniciada con éxito!!!")
            const sesion = JSON.parse(localStorage.getItem("sesion"));
            if (sesion) {
                const sesion2 = {
                    ...sesion,
                    ...json.sesion
                }

                localStorage.setItem("sesion", JSON.stringify(sesion2));
                window.location.href = sesion2.lastUrl;
            } else {
                localStorage.setItem("sesion", JSON.stringify(json.sesion));
                window.location.href = "/";
            }
        } else {
            alert(json.mensaje);
        }
    } catch (error) {
        alert("Hubo un error interno en el sistema, intenta nuevamente");
    }

}

async function getMiPerfil() {
    const sesion = JSON.parse(localStorage.getItem("sesion"));
    const response = await fetch(api + "/private/getMiPerfil", {
        headers: {
            "auth": sesion.token
        }
    });

    const json = await response.json();

    const nombre = document.getElementById("player-nombre");
    const elo = document.getElementById("player-elo");
    const discord = document.getElementById("player-discord");
    const steam = document.getElementById("steam-link");
    const email = document.getElementById("player-email");
    const profPic = document.getElementById("player-profPic");

    nombre.innerHTML += json.usuario.Nombre;
    elo.innerHTML += json.usuario.elo;
    discord.innerHTML += json.usuario.discord;
    steam.href = json.usuario.steam;
    email.innerHTML += json.usuario.email;
    if (json.usuario?.profPic != "") {
        profPic.src = api + "/fotos/" + json.usuario.profPic;
    } else {
        profPic.src = api + "/fotos/logo.png";
    }
    const torneos = document.getElementById("torneos");
    json.torneos.forEach(torneo => {
        let html = `
            <div class='torneo-profile'>
                <h5>${torneo.Torneo}</h5>
                <p>
                    <b>Estado de inscripción:</b> ${torneo.revisada == 1 ? "Confirmada" : "En revisión"}<br>
                    <b>Grupo:</b> ${torneo.Grupo}<br>
                    <b>Comprobante de pago:</b> ${torneo.comprobante == '' ? "Información no disponible" : ` <a href="${api + "/fotos/comprobantes/" + torneo.comprobante}">Click para ver comprobante</a>`}
                </p>
                <button class="btn btn-normal" onclick="verDuelos(${torneo.id})">Ver duelos</button>
            </div>
        `;
        torneos.innerHTML += html;
    });
    globalContext.torneos = json.torneos;
}

async function verDuelos(idTorneo) {
    globalContext.torneoSelected = globalContext.torneos.find(({ id }) => id == idTorneo);
    const torneo = globalContext.torneoSelected;
    await cargarPopup("duelosPendientes", "Duelos en el torneo " + torneo.Torneo, torneo);
    renderDuelos();
}

function renderDuelos(filtro = () => true, element = null) {
    const duelos = globalContext.torneoSelected.duelos.filter(filtro);
    if (element != null) {
        console.log(element)
        const otrosBotones = document.getElementsByClassName("btn-success");
        Array.from(otrosBotones).forEach(boton => {
            boton.classList.remove("btn-success");
        });
        element.classList.add("btn-success");
    }

    const tbody = document.getElementById("tabla-resultados");
    tbody.innerHTML = "";
    duelos.forEach(duelo => {
        const tr = createElement("tr");
        const tdFecha = createElement("td");
        const tdJugadores = createElement("td");
        const tdResultado = createElement("td");
        const fechaFormatted = convertirFecha(duelo.fecha);
        const buttonProponer = createElement("button");
        buttonProponer.innerHTML = "Proponer fecha";
        buttonProponer.className = "btn btn-normal"
        if (duelo.fecha == nullDate) {
            tdFecha.appendChild(buttonProponer);
        } else {
            tdFecha.innerHTML = fechaFormatted;
        }
        const listaJugadores = createElement("ul");
        duelo.jugadores.forEach(jugador => {
            const item = createElement("li");
            item.innerHTML = jugador.Nombre;
            listaJugadores.appendChild(item);
        });
        tdJugadores.appendChild(listaJugadores);
        tdResultado.innerHTML = duelo.resultado == 0 ? "Sin disputar" : (duelo.resultado == 1 ? "Victoria" : "Derrota");
        tr.appendChild(tdFecha);
        tr.appendChild(tdJugadores);
        tr.appendChild(tdResultado);
        tbody.appendChild(tr);
    })
}

async function cambiarPass(e, form) {
    e.preventDefault();
    const data = {
        pass: form.pass.value,
        passN1: form.passN1.value,
        passN2: form.passN2.value
    }

    if (data.passN1 == data.passN2) {

        const response = await fetch(api + "/private/cambiarPass", {
            headers: {
                "auth": JSON.parse(localStorage.getItem("sesion")).token,
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(data)
        })

        const json = await response.json();

        if (json.codigo == 200) {
            alert("Contraseña cambiada con éxito");
            window.location.reload();
        } else {
            alert("Hubo un problema al cambiar la contraseña intentalo de nuevo");
        }
    } else {
        alert("Las contraseñas no coinciden");
    }

}