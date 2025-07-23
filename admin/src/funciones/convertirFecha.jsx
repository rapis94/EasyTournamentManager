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

export function formatDateMySQL(date, datetime) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  if (!datetime) {
    return `${year}-${month}-${day}`;
  }

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

