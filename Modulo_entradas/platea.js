const personas = require('../ModuloPersonas/Personas');
let entradas_platea = [
  {
    id: 1,
    rut: "12.345.566-9",
    numeroAsiento: "A1",
    nombreFuncion: "Homenaje a Michael Jackson",
    TipoFuncion: "Musical",
    horaFuncion: "20:00",
    fechaFuncion: "2024-12-01",
    Correo: "jperez@gmail.com",
    Telefono: "987654321",
    Valor: 50000,
    Descuento: "No",
    Nivel: "Platea"
  }
];


function EntradasAgotadasPlatea() {
  if (entradas_platea.length >= 15) {
    console.log("Lo sentimos, las entradas de platea están agotadas.");
    return true;
  }
  return false;
}

function generarIDautomatico() {
  if (entradas_platea.length === 0) return 1;
  const ids = entradas_platea.map(e => e.id || 0);
  return Math.max(...ids) + 1;
}

function agregarEntradaPlatea(entrada) {
  if (EntradasAgotadasPlatea()) return;


  const nuevoID = generarIDautomatico();

  const asientoOcupado = entradas_platea.some(
    e => e.numeroAsiento === entrada.numeroAsiento
  );
  if (asientoOcupado) throw new Error("El asiento ya está ocupado.");

  
  const cantidadPorRut = entradas_platea.filter(e => e.rut === entrada.rut).length;
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
    Nivel: "Platea"
  };

  entradas_platea.push(nuevaEntrada);
}

function obtenerEntradasPlatea() {
  return entradas_platea;
}

function buscarEntradasPorRut(rut) {
  return entradas_platea.filter(entrada => entrada.rut === rut);
}

function eliminarEntradaPlatea(id) {
  const indice = entradas_platea.findIndex(entrada => entrada.id === id);
  if (indice !== -1) {
    entradas_platea.splice(indice, 1);
    return true;
  }
  return false;
}
function actualizarEntradaPlatea(id, nuevosDatos) {
  const entrada = entradas_platea.find(e => e.id === Number(id));
  if (entrada) {
    Object.assign(entrada, nuevosDatos);
    return true;
  }
  return false;
}
module.exports = {
  AgregarEPL: agregarEntradaPlatea,
  ObtenerEPL: obtenerEntradasPlatea,
  BuscarEPL: buscarEntradasPorRut,
  EliminarEPL: eliminarEntradaPlatea,
 ActualizarEPL: actualizarEntradaPlatea
};
