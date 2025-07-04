async function getTorneo(idTorneo) {
    const response = await fetch(api + "/public/getTorneo", {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ idTorneo })
    });

    const json = await response.json();

    cargarPopup("inscripcionTorneo", "Inscribirme en " + json.torneo.Nombre, json.torneo);
}

async function inscribirme(e, form) {
    e.preventDefault();
    const data = {
        idTorneo: form.idTorneo.value
    }
    if (form?.comprobante) {
        const file = form['comprobante'].files[0];
        const base64 = await toBase64(file);
        data.comprobante = base64;
    }
    const sesion = JSON.parse(localStorage.getItem("sesion")) || {};
    if (sesion?.token) {
        const response = await fetch(api + "/private/registerTorneo", {
            headers: {
                "Content-Type": "application/json",
                "auth": JSON.parse(localStorage.getItem("sesion")).token
            },
            method: "POST",
            body: JSON.stringify(data)
        });

        const json = await response.json();

        if (json.codigo == 200) {
            alert(json.mensaje)
            window.location.href = "/mi-perfil";
        } else {
            alert(json.mensaje);
        }

    } else {
        alert("Debes iniciar sesion para inscribirte");
        sesion.lastUrl = window.location.pathname;
        localStorage.setItem("sesion", JSON.stringify(sesion));
        window.location.href = "/login";
    }
}

async function getTorneo() {
   

    cargarPopup("inscripcionTorneo", "Duelos en el torneo " + json.torneo.Nombre, json.torneo);
}
