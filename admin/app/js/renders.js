'use strict'

const createElement = (...args) => document.createElement(...args);

function createElementHijo({ padre, element, content = null, clases = null, id = null }) {
  const addClasses = (el, clases) => {
    if (!clases) return;
    if (Array.isArray(clases)) {
      clases.forEach(clase => el.classList.add(clase));
    } else {
      el.className = clases;
    }
  };

  const create = c => {
    const el = createElement(element);
    addClasses(el, clases);
    if (id) el.id = id;
    if (c != null) el.innerHTML = c;
    padre.appendChild(el);
    return el;
  };

  if (Array.isArray(content)) {
    return content.map(create);
  } else {
    return create(content);
  }
}

let actualContext = {};
let routeContext = {
  path: ""
}
const routeHandlers = {
  administrarTorneos: initTorneos,
  administrarUsuarios: initUsuarios,
  administrarGrupos: initTorneoGrupos,
  administrarDuelos: initDuelos,
  tablaPosiciones: initPosiciones,
};

routeContext = watchObject(routeContext, ({ prop, newValue }) => {
  console.log(`Se modificó '${prop}':`, newValue);

  if (prop === "path" && routeHandlers[newValue]) {
    routeHandlers[newValue]();
  }
});


async function navegar(e, slug) {
  console.log(slug)
  if (e?.preventDefault) e.preventDefault();
  const container = document.getElementById("mainContext");
  container.classList.add("quitarPantalla");
  container.classList.remove("devolverPantalla");
  container.innerHTML = "Cargando..."
  setTimeout(async () => {
    container.innerHTML = "";

    container.classList.remove("quitarPantalla");
    container.classList.add("devolverPantalla");
    const response = await fetch("views/" + slug + ".php");
    const view = await response.text();
    container.innerHTML = view;
    routeContext.path = slug;

    history.pushState({ slug }, '', slug);

  }, 150)

}


window.addEventListener('popstate', (e) => {
  const slug = window.location.pathname.slice(1);
  navegar({}, slug);
});

window.addEventListener("DOMContentLoaded", async () => {
  const path = window.location.pathname.split("/app/");
  if (path[1] == "" || path.length == 1) {
    console.log("a")
    navegar({}, 'inicio');
    return
  }
  navegar({}, path[1]);
})

class DataManager {
  constructor({ destino = 'results', cols = null, paginacion = 10, btnNext = "btn-next", btnPrev = "btn-prev", dataCountView = "dataCountView" } = {}) {
    this.destino = destino;
    this.cols = cols;
    this.paginacion = paginacion;
    this.pagina = 1;
    this.dataStorage = [];
    this.dataRender = [];
    this.btnNext = btnNext;
    this.btnPrev = btnPrev;
    this.dataCountView = dataCountView;
  }

  setData(data) {
    this.dataStorage = data;
    this.pagina = 1;
  }

  filterAndPaginate(filtro = () => true) {
    const inicio = (this.pagina - 1) * this.paginacion;
    const fin = inicio + this.paginacion;
    this.dataRender = this.dataStorage.filter(filtro).slice(inicio, fin);
  }

  render() {
    const tabla = document.getElementById(this.destino);
    if (!tabla) return;
    tabla.innerHTML = "";
    this.dataRender.forEach(element => {
      const row = document.createElement("tr");
      if (this.cols) {
        this.cols.forEach(col => {
          if (col in element) {
            const cell = document.createElement("td");
            cell.innerHTML = element[col];
            row.appendChild(cell);
          }
        });
      } else {
        Object.values(element).forEach(value => {
          const cell = document.createElement("td");
          cell.innerHTML = value;
          row.appendChild(cell);
        });
      }
      tabla.appendChild(row);
    });
    this.updatePaginationView();
  }

  next() {
    const max = Math.ceil(this.dataStorage.length / this.paginacion);
    if (this.pagina < max) {
      this.pagina++;
      this.updateView();
    }
  }

  prev() {
    if (this.pagina > 1) {
      this.pagina--;
      this.updateView();
    }
  }

  updateView(filtro = () => true) {
    this.filterAndPaginate(filtro);
    this.render();
  }

  updatePaginationView() {
    const btnNext = document.getElementById(this.btnNext);
    const btnPrev = document.getElementById(this.btnPrev);
    const dataCountView = document.getElementById(this.dataCountView);
    btnNext.onclick = () => {
      this.next();
    }
    btnPrev.onclick = () => {
      this.prev();
    }
    if (btnPrev) btnPrev.disabled = this.pagina === 1;
    const max = Math.ceil(this.dataStorage.length / this.paginacion);
    if (btnNext) btnNext.disabled = this.pagina >= max;

    const inicio = (this.pagina - 1) * this.paginacion;
    const fin = inicio + this.paginacion;
    if (dataCountView) {
      dataCountView.innerHTML = `Mostrando de ${inicio + 1} a ${Math.min(fin, this.dataStorage.length)} de ${this.dataStorage.length}`;
    }
  }
}
