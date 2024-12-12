export function renderizadoProductos(contenedor, tipoProducto, productos) {
    let innerHTML = "";
    productos.forEach((producto) => {
        const productoHTML = `
            <article class="prendas-mas-compradas">
                <img src="${producto.imagen}" alt="${tipoProducto.slice(0, -1)}: ${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>Precio: $${producto.precio}</p>
                <button
                class="productos__boton"
                data-btn-carro
                data-id="${producto.id}"
                >
                Agregar carrito
                </button>
            </article>
        `;
        innerHTML += productoHTML;
    });
    contenedor.innerHTML = innerHTML;
}

export function renderizadoPresentacion(contenedor) {
    const imagenes = [
        '/recursos/imagenes/fotosIndex/imagen1.jpg',
        '/recursos/imagenes/fotosIndex/imagen2.jpg',
        '/recursos/imagenes/fotosIndex/imagen3.jpg'
    ];

    let innerHTML = "";
    imagenes.forEach((imagen) => {
        innerHTML += `
            <div class="slide" style="background-image: url('${imagen}');"></div>
        `;
    });

    contenedor.innerHTML = innerHTML;

    let currentIndex = 0;
    const totalSlides = imagenes.length;

    setInterval(() => {
        currentIndex = (currentIndex + 1) % totalSlides;
        contenedor.style.transform = `translateX(-${currentIndex * 100}%)`;
    }, 3000);
}

export function renderizarProductosEnCarro(arregloProductos, carrito, contenedorProductos) {
    const productosFiltrados = carrito.map((item) => {
        const producto = arregloProductos.find((prod) => prod.id === item.id);
        return { ...producto, cantidad: item.cantidad };
    });

    let total = 0;
    let contenidoHTML = '';
    productosFiltrados.forEach((producto) => {
        const subtotal = producto.precio * producto.cantidad;
        total += subtotal;

        contenidoHTML += `
            <article>
                <ul>
                    <li>${producto.nombre} (x${producto.cantidad})</li>
                    <li>Precio unitario: $${producto.precio}</li>
                    <li>Subtotal: $${subtotal.toFixed(2)}</li>
                </ul>
                <button class="eliminar-producto" data-id="${producto.id}">Eliminar</button>
            </article>
            <hr>
        `;
    });

    // Agregar el total después de todos los productos
    contenidoHTML += `
        <div style="text-align: right; font-weight: bold; margin-top: 10px;">
            <p>Total: $${total.toFixed(2)}</p>
        </div>
    `;

    contenedorProductos.innerHTML = contenidoHTML;
}