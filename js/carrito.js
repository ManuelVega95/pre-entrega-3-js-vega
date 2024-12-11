let carrito = [];

export const agregarAlCarrito = (idProducto, productos) => {
  let carritoStorage = JSON.parse(localStorage.getItem("carrito")) || [];
  const productoSeleccionado = productos.find(producto => producto.id === idProducto);
  
  if (productoSeleccionado) {
    const productoExistente = carritoStorage.find(producto => producto.id === idProducto);
    
    if (productoExistente) {
      productoExistente.cantidad += 1;
    } else {
      carritoStorage.push({
        ...productoSeleccionado,
        cantidad: 1
      });
    }

    localStorage.setItem("carrito", JSON.stringify(carritoStorage));
    console.log('Se agregó al carrito el producto:', productoSeleccionado.nombre);
    mostrarCarrito();
  } else {
    console.log("Producto no encontrado");
  }
};

export const mostrarCarrito = () => {

  const contenedorCarrito = document.getElementById("carrito");
  contenedorCarrito.innerHTML = "";
  
  const carritoStorage = JSON.parse(localStorage.getItem("carrito")) || [];
  let total = 0;

  if (carritoStorage.length > 0) {
    carritoStorage.forEach(producto => {
      const precioTotalProducto = producto.precio * producto.cantidad;

      total += precioTotalProducto;
      const cardHTML = `
        <div class="producto-en-carrito" id="producto-${producto.id}">
          <h3>${producto.nombre}</h3>
          <span>Precio: $${producto.precio.toLocaleString('es-AR')}</span>
          <span>Cantidad: ${producto.cantidad}</span>
          <span>Total producto: $${precioTotalProducto.toLocaleString('es-AR')}</span>
          <button class="sumar-cantidad" data-id="${producto.id}">Sumar cantidad</button>
          <button class="eliminar" data-id="${producto.id}">Eliminar</button>
        </div>
      `;
      contenedorCarrito.innerHTML += cardHTML;
    });

    const totalHTML = `
      <div class="total-carrito">
        <h3>Total: $${total.toLocaleString('es-AR')}</h3>
      </div>
    `;
    contenedorCarrito.innerHTML += totalHTML;

    console.log(`Total del carrito actualizado: $${total.toLocaleString('es-AR')}`);

    const botonesSumar = document.querySelectorAll(".sumar-cantidad");
    botonesSumar.forEach(boton => {
      boton.addEventListener("click", (e) => {
        const idProducto = parseInt(e.target.getAttribute("data-id"));
        sumarCantidad(idProducto);
      });
    });

    const botonesEliminar = document.querySelectorAll(".eliminar");
    botonesEliminar.forEach(boton => {
      boton.addEventListener("click", (e) => {
        const idProducto = parseInt(e.target.getAttribute("data-id"));
        eliminarDelCarrito(idProducto);
      });
    });
  } else {
    contenedorCarrito.innerHTML = "<p>El carrito está vacío</p>";
    console.log("El carrito está vacío.");
  }
};

const sumarCantidad = (idProducto) => {
  let carritoStorage = JSON.parse(localStorage.getItem("carrito")) || [];

  const producto = carritoStorage.find(producto => producto.id === idProducto);
  
  if (producto) {
    producto.cantidad += 1;
    
    localStorage.setItem("carrito", JSON.stringify(carritoStorage));
    console.log(`Se incrementó la cantidad del producto: ${producto.nombre}, ahora en el carrito hay: ${producto.cantidad}`);
    mostrarCarrito();
  }
};

const eliminarDelCarrito = (id) => {
  let carritoStorage = JSON.parse(localStorage.getItem("carrito")) || [];

  const producto = carritoStorage.find(producto => producto.id === id);

  if (producto) {
    if (producto.cantidad > 1) {
      producto.cantidad -= 1;
      console.log(`Se redujo la cantidad del producto "${producto.nombre}" en el carrito, a ${producto.cantidad}`);
    } else {
      carritoStorage = carritoStorage.filter(producto => producto.id !== id);
      console.log(`Se eliminó del carrito el producto "${producto.nombre}", con el id "${id}"`);
    }

    localStorage.setItem("carrito", JSON.stringify(carritoStorage));
    mostrarCarrito();
  }
};

window.onload = () => mostrarCarrito();