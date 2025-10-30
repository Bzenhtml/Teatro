const personas = require('../ModuloPersonas/Personas');
let entradas_palco = [
  {
    id: 1,
    rut: "12.345.566-9",
    numeroAsiento: "A1",
    nombreFuncion: "Concierto de Rock",
    TipoFuncion: "Musical",
    horaFuncion: "20:00",
    fechaFuncion: "2024-12-01",
    Correo: "jperez@gmail.com",
    Telefono: "987654321",
    Valor: 50000,
    Descuento: "No",
    Nivel: "Palco"
  },
  {
    id: 2,
    rut: "12.346.566-9",
    numeroAsiento: "A2",
    nombreFuncion: "Concierto de Rock",
    TipoFuncion: "Musical",
    horaFuncion: "20:00",
    fechaFuncion: "2024-12-01",
    Correo: "jperez@gmail.com",
    Telefono: "987654321",
    Valor: 50000,
    Descuento: "No",
    Nivel: "Palco"
  },
   {
    id: 3,
    rut: "12.346.566-9",
    numeroAsiento: "A3",
    nombreFuncion: "Concierto de Rock",
    TipoFuncion: "Musical",
    horaFuncion: "20:00",
    fechaFuncion: "2024-12-01",
    Correo: "jperez@gmail.com",
    Telefono: "987654321",
    Valor: 50000,
    Descuento: "No",
    Nivel: "Palco"
  },
   {
    id: 4,
    rut: "12.346.566-9",
    numeroAsiento: "A4",
    nombreFuncion: "Concierto de Rock",
    TipoFuncion: "Musical",
    horaFuncion: "20:00",
    fechaFuncion: "2024-12-01",
    Correo: "jperez@gmail.com",
    Telefono: "987654321",
    Valor: 50000,
    Descuento: "No", 
    Nivel: "Palco"
  },
   {
    id: 5,
    rut: "12.346.566-9",
    numeroAsiento: "A5",
    nombreFuncion: "Concierto de Rock",
    TipoFuncion: "Musical",
    horaFuncion: "20:00",
    fechaFuncion: "2024-12-01",
    Correo: "jperez@gmail.com",
    Telefono: "987654321",
    Valor: 50000,
    Descuento: "No",
    Nivel: "Palco"
  },
  {
    id: 6,
    rut: "12.346.566-9",
    numeroAsiento: "A6",
    nombreFuncion: "Concierto de Rock",
    TipoFuncion: "Musical",
    horaFuncion: "20:00",
    fechaFuncion: "2024-12-01",
    Correo: "jperez@gmail.com",
    Telefono: "987654321",
    Valor: 50000,
    Descuento: "No",
    Nivel: "Palco"
  },
   {
    id: 7,
    rut: "12.346.566-9",
    numeroAsiento: "A7",
    nombreFuncion: "Concierto de Rock",
    TipoFuncion: "Musical",
    horaFuncion: "20:00",
    fechaFuncion: "2024-12-01",
    Correo: "jperez@gmail.com",
    Telefono: "987654321",
    Valor: 50000,
    Descuento: "No",
    Nivel: "Palco"
  },
   {
    id: 8,
    rut: "12.346.566-9",
    numeroAsiento: "A8",
    nombreFuncion: "Concierto de Rock",
    TipoFuncion: "Musical",
    horaFuncion: "20:00",
    fechaFuncion: "2024-12-01",
    Correo: "jperez@gmail.com",
    Telefono: "987654321",
    Valor: 50000,
    Descuento: "No",
    Nivel: "Palco"
  },
   {
    id: 9,
    rut: "12.346.566-9",
    numeroAsiento: "A9",
    nombreFuncion: "Concierto de Rock",
    TipoFuncion: "Musical",
    horaFuncion: "20:00",
    fechaFuncion: "2024-12-01",
    Correo: "jperez@gmail.com",
    Telefono: "987654321",
    Valor: 50000,
    Descuento: "No",
    Nivel: "Palco"
  } 
];


function EntradasAgotadasPalco() {
  if (entradas_palco.length >= 15) {
    console.log("Lo sentimos, las entradas de palco están agotadas.");
    return true;
  }
  return false;
}

function generarIDautomatico() {
  if (entradas_palco.length === 0) return 1;
  const ids = entradas_palco.map(e => e.id || 0);
  return Math.max(...ids) + 1;
}

function agregarEntradaPalco(entrada) {
  if (EntradasAgotadasPalco()) return;


  const nuevoID = generarIDautomatico();

  const asientoOcupado = entradas_palco.some(
    e => e.numeroAsiento === entrada.numeroAsiento
  );
  if (asientoOcupado) throw new Error("El asiento ya está ocupado.");

  
  const cantidadPorRut = entradas_palco.filter(e => e.rut === entrada.rut).length;
  const Socio = cantidadPorRut >= 10;
  const descuentoS = 0.20;
 if (cantidadPorRut + 1 === 10) {
    console.log(` El cliente con RUT ${entrada.rut} ha realizado 10 compras.`);
    console.log(" Ingréselo a la base de datos de socios.");
   
    const persona = personas.buscarPersonaPorRut(entrada.rut);
  if (persona && persona.Socio === "No") {
    persona.Socio = "Sí";
    console.log(` ${persona.Nombre} ahora es socio (actualizado automáticamente).`);
  
  }
  
  }
  let valorFinal = entrada.Valor;
  let textoDescuento = "No";
  if (Socio) {
     valorFinal = valorFinal - valorFinal * descuentoS;
    textoDescuento = "Sí (20%)";
  }

  const nuevaEntrada = {
    id: nuevoID, 
    rut: entrada.rut,
    numeroAsiento: entrada.numeroAsiento,
    nombreFuncion: entrada.nombreFuncion,
    TipoFuncion: entrada.TipoFuncion,
    horaFuncion: entrada.horaFuncion,
    fechaFuncion: entrada.fechaFuncion,
    Correo: entrada.Correo,
    Telefono: entrada.Telefono,
    Valor: valorFinal,
    Descuento: textoDescuento,
    Nivel: "Palco"
  };

  entradas_palco.push(nuevaEntrada);
}

function obtenerEntradasPalco() {
  return entradas_palco;
}

function buscarEntradasPorRut(rut) {
  return entradas_palco.filter(entrada => entrada.rut === rut);
}

function eliminarEntradaPalco(id) {
  const indice = entradas_palco.findIndex(entrada => entrada.id === id);
  if (indice !== -1) {
    entradas_palco.splice(indice, 1);
    return true;
  }
  return false;
}
function actualizarEntradaPalco(id, nuevosDatos) {
  const entrada = entradas_palco.find(e => e.id === Number(id));
  if (entrada) {
    Object.assign(entrada, nuevosDatos);
    return true;
  }
  return false;
}
module.exports = {
  AgregarE: agregarEntradaPalco,
  ObtenerE: obtenerEntradasPalco,
  BuscarEP: buscarEntradasPorRut,
  EliminarEP: eliminarEntradaPalco,
 ActualizarEP: actualizarEntradaPalco
};
