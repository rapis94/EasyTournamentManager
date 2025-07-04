import { useState, useMemo } from "react";

export default function useDataManager({
  datos = [],
  elementosPorPagina = 10,
  filtro = () => true,
  sort = null,
  paginaExterna = null, 
}) {
  const [paginaInterna, setPaginaInterna] = useState(1);
  const pagina = paginaExterna ?? paginaInterna;

  const datosFiltrados = useMemo(() => datos.filter(filtro), [datos, filtro]);

  const datosOrdenados = useMemo(() => {
    if (!sort) return datosFiltrados;

    const ordenar = typeof sort === "function"
      ? sort
      : (a, b) => {
          const aVal = a[sort];
          const bVal = b[sort];
          if (!isNaN(Number(aVal)) && !isNaN(Number(bVal))) {
            return Number(aVal) - Number(bVal);
          }
          return String(aVal).localeCompare(String(bVal));
        };

    return [...datosFiltrados].sort(ordenar);
  }, [datosFiltrados, sort]);

  const total = datosOrdenados.length;
  const totalPaginas = Math.max(1, Math.ceil(total / elementosPorPagina));
  const desde = (pagina - 1) * elementosPorPagina;
  const hasta = desde + elementosPorPagina;
  const dataPaginada = datosOrdenados.slice(desde, hasta);

  const mostrarConteo =
    total === 0
      ? "Mostrando 0 resultados"
      : `Mostrando de ${desde + 1} a ${Math.min(hasta, total)} de ${total}`;

  const puedeAvanzar = pagina < totalPaginas;
  const puedeRetroceder = pagina > 1;

  const setPagina = paginaExterna ? () => {} : setPaginaInterna;
  const next = () => {
    if (!paginaExterna && puedeAvanzar) setPaginaInterna(pagina + 1);
  };
  const prev = () => {
    if (!paginaExterna && puedeRetroceder) setPaginaInterna(pagina - 1);
  };

  return {
    pagina,
    total,
    totalPaginas,
    dataPaginada,
    mostrarConteo,
    puedeAvanzar,
    puedeRetroceder,
    setPagina,
    next,
    prev,
  };
}
