function cerrarPopup() {
    const popup = document.getElementById("popup");
    popup.classList.add("hide");
}

const createElement = (...args) => document.createElement(...args);


async function cargarPopup(view, title = "Popup", vars = []) {
    const response = await fetch("/views/popups/" + view + ".php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(vars)
    })
    const html = await response.text();
    const popup = document.getElementById("popup");
    const popupT = document.getElementById("popup-title-content");
    const popupB = document.getElementById("popup-body");
    popup.classList.remove("hide");
    popupT.innerHTML = title;
    popupB.innerHTML = html;

}

function toBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const base64 = reader.result;
            const extension = file.name.split('.').pop().toLowerCase();
            resolve({ base64, extension });
        };
        reader.onerror = error => reject(error);
    });
}

function showHideItem(item) {
    item.classList.toggle("hidden");
}

function convertirFecha(fechaMysql) {
    if (!fechaMysql) return "";

    const tieneHora = fechaMysql.includes(" ");

    const [fechaPart, horaPart] = fechaMysql.split(" ");
    const [anio, mes, dia] = fechaPart.split("-");

    if (tieneHora && horaPart) {
        return `${dia}-${mes}-${anio} ${horaPart}`;
    }

    return `${dia}-${mes}-${anio}`;
}

let globalContext = {}

function ajustarColiseo() {
    const mapa = document.querySelector(".base-map");
    const coliseo = document.querySelector(".hotspot-coliseo");
    const moniseo = document.querySelector("#moniseo");

    const mapaAncho = mapa.clientWidth;
    const mapaAlto = mapa.clientHeight;
    const leftRatio = 0.03;
    const topRatio = 0.49;
    const anchoRatio = 350 / 918.4;

    coliseo.style.left = `${leftRatio * mapaAncho}px`;
    coliseo.style.top = `${topRatio * mapaAlto}px`;
    coliseo.style.width = `${anchoRatio * mapaAncho}px`;
    moniseo.style.left = `${(leftRatio+0.1) * mapaAncho}px`;
    moniseo.style.top = `${(topRatio-0.05) * mapaAlto}px`;
    moniseo.style.width = `${anchoRatio * mapaAncho}px`;
}


function ajustarOraculo() {
    const mapa = document.querySelector(".base-map");
    const oraculo = document.querySelector(".hotspot-oraculo");
    const oraculoT = document.querySelector("#oraculo");

    const mapaAncho = mapa.clientWidth;
    const mapaAlto = mapa.clientHeight;
    const leftRatio = 0.065;
    const topRatio = 0.25;
    const anchoRatio = 130 /1167.91;

    oraculo.style.left = `${leftRatio * mapaAncho}px`;
    oraculo.style.top = `${topRatio * mapaAlto}px`;
    oraculo.style.width = `${anchoRatio * mapaAncho}px`;
    oraculoT.style.left = `${(leftRatio) * mapaAncho}px`;
    oraculoT.style.top = `${(topRatio-0.05) * mapaAlto}px`;
    oraculoT.style.width = `${anchoRatio * mapaAncho}px`;
}

function ajustes(){
    ajustarColiseo(),
    ajustarOraculo()
}

window.addEventListener("load", ajustes);

window.addEventListener("resize", ajustes);