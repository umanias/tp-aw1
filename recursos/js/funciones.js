export function renderizadoPrendas(contenedor) {

    fetch('/recursos/datos/tienda.json')
        .then((respuesta) => {
            const datosJson = respuesta.json()
            return datosJson
        }).then((datosFinales) => {
            let innerHTML = "";
            datosFinales.prendas.forEach(producto => {
                const productoHTML = `
                    <article class="prendas-mas-compradas">
                        <img src="${producto.imagen}" alt="Accesorio: ${producto.nombre}">
                        <h3>${producto.nombre}</h3>
                        <p>Precio: $ ${producto.precio}</p>
                    </article>  
                `;
                contenedor.innerHTML += productoHTML;
            });
        })
}

export function renderizadoAccesorios(contenedor) {

    fetch('/recursos/datos/tienda.json')
        .then((respuesta) => {
            const datosJson = respuesta.json()
            return datosJson
        }).then((datosFinales) => {
            let innerHTML = "";
            datosFinales.accesorios.forEach(producto => {
                const productoHTML = `
                    <article class="prendas-mas-compradas">
                        <img src="${producto.imagen}" alt="Accesorio: ${producto.nombre}">
                        <h3>${producto.nombre}</h3>
                        <p>Precio: $ ${producto.precio}</p>
                    </article>  
                `;
                contenedor.innerHTML += productoHTML;
            });
        })
}