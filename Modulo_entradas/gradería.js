const personas = require('../ModuloPersonas/Personas');
let entradas_graderia = [
  {
    id: 1,
    rut: "17.361.566-2",
    numeroAsiento: "A1",
    nombreFuncion: "Las penumbrias del ruiseñor",
    TipoFuncion: "Obra teatral",
    horaFuncion: "15:00",
    fechaFuncion: "2025-12-04",
    Correo: "reyesc@gmail.com",
    Telefono: "986754301",
    Valor: 20000,
    Descuento: "No",
    Nivel:"Gradería"
  }
];


function EntradasAgotadasGraderia() {
  if (entradas_graderia.length >= 40) {
    console.log("Lo sentimos, las entradas de gradería están agotadas.");
    return true;
  }
  return false;
}

function generarIDautomatico() {
  if (entradas_graderia.length === 0) return 1;
  const ids = entradas_graderia.map(e => e.id || 0);
  return Math.max(...ids) + 1;
}

function agregarEntradaGraderia(entrada) {
  if (EntradasAgotadasGraderia()) return;


  const nuevoID = generarIDautomatico();

  const asientoOcupado = entradas_graderia.some(
    e => e.numeroAsiento === entrada.numeroAsiento
  );
  if (asientoOcupado) throw new Error("El asiento ya está ocupado.");

  
  const cantidadPorRut = entradas_graderia.filter(e => e.rut === entrada.rut).length;
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
    Nivel: "Gradería"
  };

  entradas_graderia.push(nuevaEntrada);
}

function obtenerEntradasGraderia() {
  return entradas_graderia;
}

function buscarEntradasPorRut(rut) {
  return entradas_graderia.filter(entrada => entrada.rut === rut);
}

function eliminarEntradaGraderia(id) {
  const indice = entradas_graderia.findIndex(entrada => entrada.id === id);
  if (indice !== -1) {
    entradas_graderia.splice(indice, 1);
    return true;
  }
  return false;
}
function actualizarEntradaGraderia(id, nuevosDatos) {
  const entrada = entradas_graderia.find(e => e.id === Number(id));
  if (entrada) {
    Object.assign(entrada, nuevosDatos);
    return true;
  }
  return false;
}
module.exports = {
  AgregarEG: agregarEntradaGraderia,
  ObtenerEG: obtenerEntradasGraderia,
  BuscarEPR: buscarEntradasPorRut,
  EliminarEG: eliminarEntradaGraderia,
 ActualizarEG: actualizarEntradaGraderia
};
