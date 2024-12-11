import { Producto } from './productos.js';
import { agregarAlCarrito, mostrarCarrito } from './carrito.js';

const productos = [
    new Producto(1, "Camiseta de Los Pumas", "Camiseta oficial de la selección nacional de rugby.", 125000, "../fotos/Camiseta pumas 2024 2.png"),
    new Producto(2, "Camiseta Los Pumas Granaderos", "Edición especial Granaderos de Los Pumas.", 120000, "../fotos/Camiseta Pumas Granaderos.jpg"),
    new Producto(3, "Short de Los Pumas Titular", "Short oficial de la selección nacional de rugby.", 69000, "../fotos/Short Pumas.jpg"),
    new Producto(4, "Short Alternativo de Los Pumas", "Short alternativo de la selección nacional de rugby.", 69000, "../fotos/Short Pumas 2.jpg"),
    new Producto(5, "Pelota Rugby URBA 2024", "Pelota oficial para partidos de rugby URBA 2024.", 105000, "../fotos/URBA pelota.jpg"),
    new Producto(6, "Botines Rugby Originales", "Botines de rugby originales, ideales para todo tipo de terreno.", 180000, "../fotos/Botines rugby adidas negros.jpg"),
    new Producto(7, "Botines Rugby Celestes", "Botines de rugby celestes, cómodos y duraderos.", 110000, "../fotos/Botines rugby celestes.jpg"),
    new Producto(8, "Protector Bucal Gilbert", "Protección para tu boca durante los partidos.", 29000, "../fotos/Protector bucal Gilbert.png")
  ];

const mostrarProductos = () => { // este es el código utilizado para las cards en el Index, pero para utilizar en JS
  const contenedorProductos = document.getElementById("productos");
  contenedorProductos.innerHTML = '';

  productos.forEach(producto => {
      const cardHTML = `
          <div class="card">
              <h2 class="card__productos">${producto.nombre.toUpperCase()}</h2>
              <hr class="bordeCard">
              <div class="card__cajaImagen">
                  <img class="card__img" src="${producto.imagen}" alt="${producto.nombre}">
                  <p class="card__description">
                      <i class="bi bi-arrow-right-circle-fill"></i> <span class="bold">PRECIO: </span> <span class="italic">$${producto.precio.toLocaleString()}</span>
                      <button class="agregar-al-carrito" data-id="${producto.id}">
                          <img src="../fotos/Logo carrito.png" alt="Agregar al carrito" class="icono-carrito"> Agregar al carrito
                      </button>
                  </p>
              </div>
          </div>
      `;
      contenedorProductos.innerHTML += cardHTML;
  });
    const botonAgregar = document.querySelectorAll('.agregar-al-carrito');

    botonAgregar.forEach(boton => {
        boton.addEventListener('click', (e) => {
            const idProducto = parseInt(e.target.getAttribute('data-id'));
            agregarAlCarrito(idProducto, productos);
        });
    });
};

const generarId = () => {
    const maxId = productos.length > 0 ? Math.max(...productos.map(producto => producto.id)) : 0;
    return maxId + 1;
  };
  
const crearProducto = (producto = "", descripcion = "", precio = 0, imagen = "") => {
    const id = generarId();

    const nuevoProducto = new Producto(id, producto, descripcion, precio, imagen);

    productos.push(nuevoProducto);
    console.log(`Se agregó el producto: ${nuevoProducto.nombre}`)

    mostrarProductos();
};
  
crearProducto("Campera de Los Pumas 2024", "Campera oficial del seleccionado argentino de rugby.", 169000, "../fotos/Campera de Los Pumas.jpg");

productos.forEach(producto => {
    producto.producto = producto.producto;
  });

mostrarProductos();


window.onload = () => {
    mostrarProductos();
    mostrarCarrito();
  };
