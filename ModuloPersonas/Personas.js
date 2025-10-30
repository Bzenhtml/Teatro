const operacionesEP = require('../Modulo_entradas/palco');

let personas=[{
    Nombre: "Juan",
    Apellido_Paterno: "Perez",
    Apellido_Materno: "Gonzalez",
    Rut: "12.345.566-9",
    Fecha_Nacimiento: "1990-01-01", 
    Edad: 34,
    Socio: "No",
    Numero_T: "987654321",
    Correo: "jperezgon@gmail.com"
}]; 
function actualizarPersona(rut, nuevosDatos) {
  const persona = buscarPersonaPorRut(rut);
  if (persona) {
    Object.assign(persona, nuevosDatos);

   
    const cantidadEntradas = operacionesEP.ObtenerE().filter(e => e.rut === rut).length;

   
    if (cantidadEntradas >= 10) {
      persona.Socio = "Sí";
      console.log(` ${persona.Nombre} ahora es socio (10 entradas o más).`);
    }

    return true;
  }
  return false;
}

function agregarPersona(persona) {
const rutExistente = personas.some(p => p.Rut === persona.Rut);
if (rutExistente) {
    throw new Error('Ya existe una persona con este RUT');
}   
    const nuevaPersona = {
        Nombre: persona.nombre,
        Apellido_Paterno: persona.Apellido_Paterno,
        Apellido_Materno: persona.Apellido_Materno,
        Rut: persona.Rut,
        Fecha_Nacimiento: persona.Fecha_Nacimiento,
        Edad: persona.Edad,
        Socio: persona.Socio == "No",
        Numero_T: persona.Numero_T,
        Correo: persona.Correo
    };

    personas.push(nuevaPersona);
}
function listarPersonas(){
      personas.forEach(p => {
    const cantidadEntradas = operacionesEP.ObtenerE().filter(e => e.rut === p.Rut).length;
    if (cantidadEntradas >= 10 && p.Socio === "No") {
      p.Socio = "Sí";
      console.log(` ${p.Nombre} fue actualizado a socio automáticamente.`);
    }
  });
    return personas;
}

function buscarPersonaPorRut(rut) {
  if (!rut) return null; 

  const rutLimpio = String(rut).replace(/\./g, '');
  
  return personas.find(p => 
    p.Rut && String(p.Rut).replace(/\./g, '') === rutLimpio
  ) || null;
}

function actualizarPersona(rut, nuevosDatos){
    const persona = buscarPersonaPorRut(rut);       
    if(persona){
        Object.assign(persona, nuevosDatos);
         const cantidadEntradas = operacionesEP.ObtenerE().filter(e => e.rut === rut).length;


    if (cantidadEntradas >= 10) {
      persona.Socio = "Sí";
      console.log(`✅ ${persona.Nombre} ahora es socio (10 entradas o más).`);
    }

        return true;
    }   
    return false;
}

function eliminarPersona(rut){
    const indice = personas.findIndex(persona => persona.Rut === rut);
    if(indice !== -1){
        personas.splice(indice, 1);
        return true;
    }
    return false;
}
 
module.exports = {
    agregarPersona,
    listarPersonas,
    buscarPersonaPorRut,
    actualizarPersona,
    eliminarPersona
};
    
