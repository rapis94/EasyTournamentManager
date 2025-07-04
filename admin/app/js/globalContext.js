
let globalSesion = {};


function watchObject(obj, callback) {
    return new Proxy(obj, {
        set(target, prop, value) {
            const oldValue = target[prop];
            target[prop] = value;

            if (oldValue !== value) {
                callback({ target, prop, oldValue, newValue: value });
            }

            return true;
        }
    });
}
let execContext = {
    dataStorage: {},
    usuario: null,
    token: null
};

let globalContext = {};

async function initEngine() {
    const ubicacionActual = window.location.pathname;
    try {
        if (localStorage.getItem("sesion") === null) {
            if (ubicacionActual !== "/admin/") {
                throw new Error("No existe sesión almacenada. Iniciá sesión nuevamente");
            }
        } else {
            if (ubicacionActual !== "/admin/") {
                const sesion = JSON.parse(localStorage.getItem("sesion"));
                const result = await tokenVerify(sesion);
                if (result) {
                    globalSesion = result.data;
                    globalSesion.token = localStorage.sesion.token;
                    const userName = document.getElementById("user-name");
                    userName.innerHTML = result.data.Nombre;
                } else {
                    throw new Error("Acceso denegado, este usuario no contiene los permisos necesarios para acceder.");
                }
            }
        }
    } catch (error) {
        alert(error.message);
        window.location.href = "/admin";
    }
}

async function tokenVerify(sesion) {
    try {
        const tokenResponse = await fetch(server + "/admin/auth/tokenVerification", {
            headers: {
                "Content-Type": "application/json",
                "auth": sesion.token
            }
        });

        if (!tokenResponse.ok) {
            throw new Error("Token inválido o expirado");
        }

        const tokenData = await tokenResponse.json();
        return tokenData;
    } catch (err) {
        console.error("Error verificando el token:", err);
        return false;
    }
}


initEngine();


async function login(e, form) {
    e.preventDefault();
    try {
        const data = {
            email: form.email.value,
            pass: form.pass.value

        }
        const response = await fetch(server + "/public/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });

        const json = await response.json();

        if (json.codigo == 200) {
            alert("Sesión Iniciada con éxito!!!")
            localStorage.setItem("sesion", JSON.stringify(json.sesion));
            window.location.href = "app";
        } else {
            const notify = document.getElementById("alerta");
            notify.classList.remove("d-none");
            document.getElementById("msg").innerHTML = json.mensaje;
            const attemp = document.getElementById("attemp");
            attemp.innerHTML = parseInt(attemp.innerHTML) + 1;
        }
    } catch (error) {
        console.log(error)
        alert("Hubo un error interno en el sistema, intenta nuevamente");
    }

}

function createRender(dataToRender, table, paginacion) {
    if (!globalSesion?.renders) {
        globalSesion.renders = [];
    }
    const render = {
        table: table,
        data: dataToRender,
        filtro: () => { },
        paginacion,
        paginaActual: 1
    }
    globalSesion.renders.push(render);
}

async function elementFromFile({file, element = "div", clases = [], id = null, vars = {}}) {
    const output = document.createElement(element);

    const response = await fetch(file, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(vars)
    });

    if (!response.ok) {
        throw new Error(`Error al cargar ${file}: ${response.statusText}`);
    }

    const html = await response.text();
    output.innerHTML = html;

    if (id) output.id = id;

    if (clases.length > 0) {
        clases.forEach(clase => output.classList.add(clase));
    }

    return output;
}

function convertirFecha(fechaDMY) {
    const tieneHora = fechaDMY.includes(":");

    if (tieneHora) {
        const [fecha, hora] = fechaDMY.split(" ");
        const [dia, mes, anio] = fecha.split("-");
        return `${anio}-${mes}-${dia} ${hora}`;
    } else {
        const [a, b, c] = fechaDMY.split("-");
        if (a.length === 4) {
            return fechaDMY;
        }

        const [dia, mes, anio] = fechaDMY.split("-");
        return `${anio}-${mes}-${dia}`;
    }
}
