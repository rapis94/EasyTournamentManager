'use strict'

const createElement = (...args) => document.createElement(...args);


const actualContext = {};
let routeContext = {
    path: ""
}
// Proxy con callback personalizado
routeContext = watchObject(routeContext, ({ prop, newValue }) => {
    console.log(`Se modificó '${prop}':`, newValue);
    if (prop === "path") {
        switch (newValue) {
            case "administrarTorneos":
                initTorneos();
                break;
            case "administrarUsuarios":
                initUsuarios();
                break;
            case "administrarGrupos":
                initTorneoGrupos();
                break;
        }
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
  constructor({ destino = 'results', cols = null, paginacion = 10 , btnNext= "btn-next", btnPrev= "btn-prev", dataCountView="dataCountView"} = {}) {
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
    btnNext.onclick = ()=>{
        this.next();
    }
    btnPrev.onclick = ()=>{
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

function dataManagerLocal(destino = 'results', data=[], cols = false) {
    const tabla = document.getElementById(destino);
    tabla.innerHTML = "";
    data.forEach(element => {
        const row = createElement("tr");
        if (cols) {
            const columnas = Object.keys(element);
            cols.forEach(col => {
                if (columnas.find(colToFind => colToFind == col)) {
                    const cell = createElement("td");
                    cell.innerHTML = element[col];
                    row.appendChild(cell);
                }
            })
        } else {
            const columnas = Object.keys(element);
            columnas.forEach(col => {
                const cell = createElement("td");
                cell.innerHTML = element[col];
                row.appendChild(cell);
            })
        }
        tabla.appendChild(row);
    });

    const dataCountView = document.getElementById("dataCountView");
   
    dataCountView.innerHTML = `Mostrando ${data.length} datos`;
}