
async function cargarTablaPosiciones(idTorneo=false){
    const idTorneoGlobal = globalContext.idTorneo;
    const idTorneoFind = idTorneoGlobal ?? idTorneo;
    
    const torneo = await cargarTorneosData(idTorneoFind);
    console.log(torneo);
    return torneo;
}

async function initPosiciones(){
    const gruposTorneo = cargarTablaPosiciones();
    
    gruposTorneo.forEach(async grupo => {
        const renderTabla = elementFromFile({
            file: "views/posiciones.php", 
            vars: {grupo},
            clases: "tabla-grupo"
        })


    });
}

function crearTablaGrupo() {
  const table = createElement("table");
  table.className = "table table-striped table-dark";

  const thead = createElementHijo({
    padre: table,
    element: "thead"
  });

  const trHead = createElementHijo({
    padre: thead,
    element: "tr"
  });

  createElementHijo({
    padre: trHead,
    element: "th",
    content: ["Nombre", "Victorias", "Derrotas", "Pendientes"]
  });

  return table;
}