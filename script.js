const carrito = [];

function filtrar(categoria) {
  document.querySelectorAll('.filtros button').forEach(btn => {
    btn.classList.toggle('activo', btn.textContent.toLowerCase().includes(categoria));
  });

  let productos = document.querySelectorAll('.card');

  productos.forEach(producto => {
    if (categoria === 'todos' || producto.dataset.categoria === categoria) {
      producto.style.display = 'flex';
    } else {
      producto.style.display = 'none';
    }
  });
}

function buscar(texto) {
  texto = texto.trim().toLowerCase();
  let productos = document.querySelectorAll('.card');

  productos.forEach(producto => {
    let nombre = producto.querySelector('h3').textContent.toLowerCase();
    producto.style.display = nombre.includes(texto) ? 'flex' : 'none';
  });

  // Si se borra el texto, mostraremos todos los productos filtrados según botón activo.
  if (!texto) {
    let botonActivo = document.querySelector('.filtros button.activo');
    if (botonActivo) {
      filtrar(botonActivo.textContent.toLowerCase());
    }
  }
}

function addToCart(nombre, precio) {
  const item = carrito.find(p => p.nombre === nombre);

  if (item) {
    item.cantidad += 1;
  } else {
    carrito.push({ nombre, precio, cantidad: 1 });
  }

  actualizarCarrito();
  mostrarMensaje(`${nombre} se agregó al carrito.`);
}

function actualizarCarrito() {
  const lista = document.getElementById('lista-carrito');
  const totalEl = document.getElementById('total');

  lista.innerHTML = '';

  let total = 0;
  carrito.forEach(item => {
    total += item.precio * item.cantidad;

    let li = document.createElement('li');
    li.innerHTML = `${item.nombre} x${item.cantidad} <strong>$${(item.precio * item.cantidad).toLocaleString()}</strong>`;
    lista.appendChild(li);
  });

  totalEl.textContent = `$${total.toLocaleString()}`;
}

function vaciarCarrito() {
  carrito.length = 0;
  actualizarCarrito();
  mostrarMensaje('Carrito vaciado.');
}

function checkout() {
  if (carrito.length === 0) {
    mostrarMensaje('El carrito está vacío. Agrega productos primero.');
    return;
  }

  let total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
  carrito.length = 0;
  actualizarCarrito();
  mostrarMensaje(`Compra realizada, total pagado: $${total.toLocaleString()}. ¡Gracias!`);
}

function mostrarMensaje(texto) {
  const mensaje = document.getElementById('mensaje');
  mensaje.textContent = texto;
  setTimeout(() => (mensaje.textContent = ''), 3000);
}

window.addEventListener('DOMContentLoaded', () => filtrar('todos'));
