
document.getElementById('form-defensor').addEventListener('submit', (e) => e.preventDefault());


document.getElementById('plateaB').addEventListener('click', (e) => generarEntrada(e, '/generarPlatea'));
document.getElementById('galeriaB').addEventListener('click', (e) => generarEntrada(e, '/generarGaleria'));
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
    edad: document.getElementById('edad').value
  };

  try {
    const respuesta = await fetch(ruta, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const dataRes = await respuesta.json();

    if (!respuesta.ok) throw new Error(dataRes.message || 'Error al generar la entrada');

    const contenedor = document.getElementById('lista-archivos');
    contenedor.innerHTML = `
      <div class="alert alert-success mt-3">
         ${dataRes.mensaje}<br>
        <a href="${dataRes.ruta}" target="_blank">Abrir entrada generada</a>
      </div>`;



  } catch (err) {
    console.error(err);
    alert('Error al generar la entrada');
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

cargarAsientos();
