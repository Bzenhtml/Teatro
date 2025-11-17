
document.getElementById('form-defensor').addEventListener('submit', (e) => e.preventDefault());


document.getElementById('plateaB').addEventListener('click', (e) => generarEntrada(e, '/generarPlatea'));
document.getElementById('graderiaB').addEventListener('click', (e) => generarEntrada(e, '/generarGraderia'));
document.getElementById('palcoB').addEventListener('click', (e) => generarEntrada(e, '/generarPalco'));



async function generarEntrada(e, ruta) {
  e.preventDefault();

  const data = {
    rut: document.getElementById('Rut').value,
    nombre: document.getElementById('nombre').value,
    ApellidoP: document.getElementById('ApellidoP').value,
    ApellidoM: document.getElementById('ApellidoM').value,
    telefono: document.getElementById('telefono').value,
    correo: document.getElementById('correo').value,
    evento: document.getElementById('evento').value,
    hora: document.getElementById('hora').value,
    edad: document.getElementById('edad').value,

    numero_asiento: document.getElementById('numero_asiento').value,
    precio_asiento: document.getElementById('precio_asiento').value,
    total_pagar: document.getElementById('total_pagar').value,
    fecha_funcion: document.getElementById('fecha_funcion').value
  };

  try {
    const respuesta = await fetch(ruta, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const dataRes = await respuesta.json();

    if (!respuesta.ok) throw new Error(dataRes.message);

    const asientoVendido = data.numero_asiento;
    
    const seatElement = document.querySelector(`.seat[data-seat="${asientoVendido}"]`);
    if (seatElement) {
      seatElement.classList.add("sold");
      seatElement.classList.remove("selected");
      seatElement.style.pointerEvents = "none"; 
    }

 
    const contenedor = document.getElementById('lista-archivos');
    contenedor.innerHTML = `
      <div class="alert alert-success mt-3">
        ${dataRes.mensaje}<br>
        <a href="${dataRes.url}" target="_blank">Abrir entrada generada</a>
      </div>
    `;

  } catch (err) {
    console.error(err);
    alert("Error al generar la entrada");
  }
}
async function cargarAsientos() {
  const resp = await fetch("/asientos-ocupados");
  const ocupados = await resp.json();

  const select = document.getElementById("asiento");

  for (let i = 1; i <= 100; i++) {
    const op = document.createElement("option");
    op.value = i;

    if (ocupados.includes(i)) {
      op.textContent = 'Asiento ${i} (Ocupado)';
      op.disabled = true;  
    } else {
      op.textContent = `Asiento ${i} (Disponible)`;
    }

    select.appendChild(op);
  }
}
const seats = document.querySelectorAll('.seat:not(.sold):not(.legend)');
const inputAsiento = document.getElementById('asiento_seleccionado');

const hiddenAsiento = document.getElementById('numero_asiento');
const hiddenPrecio = document.getElementById('precio_asiento');
const hiddenTotal = document.getElementById('total_pagar');

const countSpan = document.getElementById('count');
const totalSpan = document.getElementById('total');


const precioAsiento = 20000;

seats.forEach(seat => {
  seat.addEventListener('click', () => {

    seats.forEach(s => s.classList.remove('selected'));
    seat.classList.add('selected');

    const codigo = seat.dataset.seat;

   
    inputAsiento.value = codigo;

    
    hiddenAsiento.value = codigo;
    hiddenPrecio.value = precioAsiento;
    hiddenTotal.value = precioAsiento;

    countSpan.textContent = "1";
    totalSpan.textContent = precioAsiento;

    console.log("Asiento:", codigo, "Precio:", precioAsiento, "Total:", precioAsiento);
  });
});
document.getElementById("fecha_nacimiento").addEventListener("change", function () {
  const fechaNac = new Date(this.value);
  const hoy = new Date();

  let edad = hoy.getFullYear() - fechaNac.getFullYear();
  const mes = hoy.getMonth() - fechaNac.getMonth();


  if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
    edad--;
  }

  document.getElementById("edad").value = edad;
});



 

cargarAsientos();
