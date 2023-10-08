// Elementos del DOM
const monedaInput = document.querySelector("input");
const monedaSelect = document.querySelector("select");
const btn = document.querySelector("button");
const span = document.querySelector("span");

// Variables
const urlAPI = "https://mindicador.cl/api/";

// Variables para el gráfico
const chartDOM = document.getElementById("myChart");
const config = {};

// Eventos
btn.addEventListener("click", () => {
  const valorMonedaInput = monedaInput.value;
  const valorMonedaSelect = monedaSelect.value;
  searchData(valorMonedaSelect);
});

// Funciones
async function searchData(monedaSeleccionada) {
  try {
    const res = await fetch(urlAPI + monedaSeleccionada);
    const data = await res.json();
    const { serie } = data;

    const datos = crearData(serie.slice(0, 10).reverse());

// Renderizar el gráfico
renderGrafica(datos);
} catch (error) {
console.log("Falló en cargar");
  }
}

function renderGrafica(data) {
  const config = {
    type: "line",
    data: data,
  };

  const ctx = chartDOM.getContext("2d");

  // Crear una nueva instancia de Chart.js
  new Chart(ctx, config);
}

// Crear data para el gráfico
function crearData(serie) {
  const labels = serie.map(({ fecha }) => formateoFecha(fecha));
  const valorSerieMap = serie.map(({ valor }) => valor);

  const datasets = [
    {
      label: "Histórico",
      borderColor: "rgb(75, 192, 192)",
      data: valorSerieMap,
    },
  ];

  return { labels, datasets };
}

// Formatear la fecha
function formateoFecha(fecha) {
  date = new Date(fecha);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  return `${day} - ${month} - ${year}`;
}
