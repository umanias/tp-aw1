import { renderizadoProductos, renderizadoPresentacion, renderizarProductosEnCarro } from "./funciones.js";

// Elementos del DOM
const contenedorPrendas = document.getElementById('prendas-productos');
const contenedorAccesorios = document.getElementById('accesorios-productos');
const filtroDescripcion = document.getElementById('filtro'); // Input de filtro
const popupCarro = document.getElementById("popup-carro");
const abrirPopupCarro = document.getElementById("carritoBtn");
const contenedorCarro = document.getElementById("contenedor-carro");
const contadorCarrito = document.getElementById("contador-carrito");

// Estado del carrito y productos
let carrito = [];
let datosPrendas = [];
let datosAccesorios = [];

// Función para guardar el carrito en localStorage
const guardarCarritoEnLocalStorage = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
};

// Función para cargar el carrito desde localStorage
const cargarCarritoDesdeLocalStorage = () => {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
    }
};

// Función para manejar el popup del carrito
const manejadorPopup = () => {
    if (popupCarro.open) {
        popupCarro.close();
    } else {
        popupCarro.showModal();
    }
};

// Evento para abrir el popup del carrito
abrirPopupCarro.addEventListener("click", manejadorPopup);

// Función para actualizar el contador del carrito
const actualizarContadorCarrito = () => {
    const cantidadTotal = carrito.reduce((total, item) => total + item.cantidad, 0);
    contadorCarrito.textContent = `(${cantidadTotal})`;
};

// Función para agregar producto al carrito
const agregarProductoCarrito = (id) => {
    const idProducto = parseInt(id);
    const productoEnCarrito = carrito.find((item) => item.id === idProducto);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad += 1;
    } else {
        carrito.push({ id: idProducto, cantidad: 1 });
    }

    // Guardar el carrito actualizado en localStorage
    guardarCarritoEnLocalStorage();

    renderizarProductosEnCarro([...datosPrendas, ...datosAccesorios], carrito, contenedorCarro);
    actualizarContadorCarrito();
};

// Función para quitar producto del carrito
contenedorCarro.addEventListener("click", (e) => {
    if (e.target.matches("button.eliminar-producto")) {
        const idProducto = parseInt(e.target.dataset.id);
        carrito = carrito.filter((item) => item.id !== idProducto);

        // Guardar el carrito actualizado en localStorage
        guardarCarritoEnLocalStorage();

        renderizarProductosEnCarro([...datosPrendas, ...datosAccesorios], carrito, contenedorCarro);
        actualizarContadorCarrito();
    }
});

// Función para filtrar productos por nombre (sin distinguir mayúsculas o minúsculas)
const filtrarProductos = () => {
    const textoFiltro = filtroDescripcion.value.toLowerCase(); // Convertimos el filtro a minúsculas

    // Filtrar prendas por nombre
    if (contenedorPrendas) {
        const prendasFiltradas = datosPrendas.filter((producto) =>
            producto.nombre.toLowerCase().includes(textoFiltro) // Compara el nombre sin distinguir mayúsculas/minúsculas
        );
        renderizadoProductos(contenedorPrendas, 'prendas', prendasFiltradas);
    }

    // Filtrar accesorios por nombre
    if (contenedorAccesorios) {
        const accesoriosFiltrados = datosAccesorios.filter((producto) =>
            producto.nombre.toLowerCase().includes(textoFiltro) // Compara el nombre sin distinguir mayúsculas/minúsculas
        );
        renderizadoProductos(contenedorAccesorios, 'accesorios', accesoriosFiltrados);
    }
};

// Asignar el evento de búsqueda al input
filtroDescripcion.addEventListener('input', filtrarProductos);

// Cargar los productos iniciales
const inicializarProductos = async () => {
    try {
        const respuesta = await fetch('/recursos/datos/tienda.json');
        const datos = await respuesta.json();
        datosPrendas = datos.prendas;
        datosAccesorios = datos.accesorios;

        // Verificar si el contenedor de prendas está presente
        if (contenedorPrendas) {
            renderizadoProductos(contenedorPrendas, 'prendas', datosPrendas);
        }

        // Verificar si el contenedor de accesorios está presente
        if (contenedorAccesorios) {
            renderizadoProductos(contenedorAccesorios, 'accesorios', datosAccesorios);
        }

        // Cargar carrito desde localStorage y actualizar la vista
        cargarCarritoDesdeLocalStorage();
        renderizarProductosEnCarro([...datosPrendas, ...datosAccesorios], carrito, contenedorCarro);
        actualizarContadorCarrito();

        // Delegación de eventos para botones de "Agregar carrito"
        document.body.addEventListener("click", (e) => {
            if (e.target.matches("button.productos__boton")) {
                agregarProductoCarrito(e.target.dataset.id);
            }
        });
    } catch (error) {
        console.error("Error al cargar los productos:", error);
    }
};

inicializarProductos();
