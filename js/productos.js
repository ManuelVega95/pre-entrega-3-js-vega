export class Producto {
    constructor(id = 0, nombre = "", descripcion = "", precio = 0, imagen = "") {
      this.id = id;
      this.nombre = nombre;
      this.descripcion = descripcion;
      this.precio = precio;
      this.imagen = imagen;
    }
  
    mostrarProducto() {
      console.log(`Producto: ${this.nombre}, Precio: ${this.precio}`);
    }
  }