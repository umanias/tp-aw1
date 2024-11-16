import { renderizadoPrendas, renderizadoAccesorios } from "./funciones.js";

const contenedorPrendas = document.getElementById('prendas-productos');
const contenedorAccesorios = document.getElementById('accesorios-productos');

if(contenedorPrendas) {
    renderizadoPrendas(contenedorPrendas);
}

if(contenedorAccesorios) {
    renderizadoAccesorios(contenedorAccesorios);
}