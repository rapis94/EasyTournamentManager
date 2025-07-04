export default function convertirFecha(fechaMysql) {
  if (!fechaMysql) return "";

  const tieneHora = fechaMysql.includes(" ");

  const [fechaPart, horaPart] = fechaMysql.split(" ");
  const [anio, mes, dia] = fechaPart.split("-");

  if (tieneHora && horaPart) {
    return `${dia}-${mes}-${anio} ${horaPart}`;
  }

  return `${dia}-${mes}-${anio}`;
}