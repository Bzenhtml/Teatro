const express=require('express');
const app=express();
const port=3000;
const operaciones=require('./ModuloPersonas/Personas');
const operacionesEP=require('./Modulo_entradas/palco');
const operacionesEG=require('./Modulo_entradas/gradería');
const operacionesEPL=require('./Modulo_entradas/platea');
const path = require('path');
const { Pool } = require('pg');
const fs = require('fs');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'teatro_coliseo',
  password: 'Be200519',
  port: 5432,
});

app.use(express.json());
app.use(express.static(path.join(__dirname, 'Admin')));


app.get('/administrador', (req, res) => {
res.sendFile(path.join(__dirname, 'Admin', 'administrador.html'));
});
//-PERSONAS-
app.get('/personas',(req,res)=>{
    const personas=operaciones.listarPersonas();
    res.json(personas);
});
app.post('/agregar', (req, res) => {
    operaciones.agregarPersona(req.body);
    res.json({ mensaje: 'Persona agregada exitosamente' });
});

app.get('/buscar/:rut',(req,res)=>{
    const rut=req.params.rut;
    const persona=operaciones.buscarPersonaPorRut(rut);
    if(persona){
        res.json(persona);
    }else{
        res.status(404).json({error:'Persona no encontrada'});
    }
});     
app.put('/actualizar/:rut',(req,res)=>{ // PENDIENTE 
    const Rut=req.params.rut;
    const nuevosDatos=req.body;
    const exito=operaciones.actualizarPersona(Rut,nuevosDatos);
    if(exito){
        res.json({mensaje:'Persona actualizada exitosamente'});
    }
    else{
        res.status(404).json({error:'Persona no encontrada'});
    }   
});
app.delete('/eliminar/:Rut',(req,res)=>{
    const Rut=req.params.Rut;
    const exito=operaciones.eliminarPersona(Rut);
    if(exito){
        res.json({mensaje:'Persona eliminada exitosamente'});
    }else{
        res.status(404).json({error:'Persona no encontrada'});
    }
}); 
//--FIN PERSONAS--

// ENTRADAS PALCO
app.get('/entradas',async (req,res)=>{
  try {
    const result = await pool.query('SELECT * FROM entradas_palco');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener entradas de palco');
  }
    const PALCO=operacionesEP.ObtenerE();
    res.json(PALCO);
});
app.post('/agregarEP', (req, res) => {
   
    operacionesEP.AgregarE(req.body);
    res.json({ mensaje: 'Entrada ingresada correctamente' });
});

    
app.put('/actualizarEP/:id',(req,res)=>{ 
    const id=parseInt(req.params.id);
    const nuevosDatos=req.body;
    const exito=operacionesEG.ActualizarEG(id,nuevosDatos);
    if(exito){
        res.json({mensaje:'Datos actualizados'});
    }
    else{
        res.status(404).json({error:'Entrada no encontrada'});
    }   
});
app.delete('/eliminarE/:id',(req,res)=>{
    const id = parseInt(req.params.id); 
    const exito=operacionesEG.EliminarEG(id);
    if(exito){
        res.json({mensaje:'Entrada eliminada'});
    }else{
        res.status(404).json({error:'Hubo un error al eliminar la entrada'});
    }
}); 
//--FIN ENTRADAS PALCO--
app.get('/entradasG',async(req,res)=>{
  try {
    const result = await pool.query('SELECT * FROM entradas_graderia');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener entradas de gradería');
  }
    const GRADERIA=operacionesEG.ObtenerEG();
    res.json(GRADERIA);
});

app.post('/agregarEG', (req, res) => {
   
    operacionesEG.AgregarEG(req.body);
    res.json({ mensaje: 'Entrada ingresada correctamente' });
});

    
app.put('/actualizarEG/:id',(req,res)=>{ 
    const id=parseInt(req.params.id);
    const nuevosDatos=req.body;
    const exito=operacionesEG.ActualizarEG(id,nuevosDatos);
    if(exito){
        res.json({mensaje:'Datos actualizados'});
    }
    else{
        res.status(404).json({error:'Entrada no encontrada'});
    }   
});

app.delete('/eliminarG/:id',(req,res)=>{
    const id = parseInt(req.params.id); 
    const exito=operacionesEG.EliminarEG(id);
    if(exito){
        res.json({mensaje:'Entrada eliminada'});
    }else{
        res.status(404).json({error:'Hubo un error al eliminar la entrada'});
    }
});  

//--FIN ENTRADAS GRADERIA--

//--PLATEA--
app.get('/entradasPL',async (req,res)=>{
  try {
    const result = await pool.query('SELECT * FROM entradas_platea');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener entradas de palco');
  }
    const PLATEA=operacionesEPL.ObtenerEPL();
    res.json(PLATEA);
});
app.post('/agregarPL', async (req, res) => {
   const { nombre, telefono, correo, direccion } = req.body;
    operacionesEPL.AgregarEPL(req.body);
    res.json({ mensaje: 'Entrada ingresada correctamente' });
      const html = await generarHTML(nombre, telefono, correo, direccion);
          fs.writeFileSync(filePath, html, 'utf8');
});

    
app.put('/actualizarPL/:id',(req,res)=>{ 
    const id=parseInt(req.params.id);
    const nuevosDatos=req.body;
    const exito=operacionesEPL.ActualizarEPL(id,nuevosDatos);
    if(exito){
        res.json({mensaje:'Datos actualizados'});
    }
    else{
        res.status(404).json({error:'Entrada no encontrada'});
    }   
});
app.delete('/eliminarPL/:id',(req,res)=>{
    const id = parseInt(req.params.id); 
    const exito=operacionesEPL.EliminarEPL(id);
    if(exito){
        res.json({mensaje:'Entrada eliminada'});
    }else{
        res.status(404).json({error:'Hubo un error al eliminar la entrada'});
    }
});  

app.post('/generarPlatea', async (req, res) => {
  const { rut, nombre, ApellidoP, ApellidoM, telefono, correo, edad, evento, hora } = req.body;
const fechaCompra = new Date().toLocaleString('es-CL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
});

 try {
    const html = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Entrada Palco</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="entradaP.css">
</head>
<body>
<header><img src="22d5227b-d92e-4ec6-a145-940773c65afe.png" width="250"></header>
<div class="divisor">
  <div class="divMini">
    <h1>Entrada Palco</h1>
    <h5>RUT: ${rut}</h5>
    <h5>Nombre: ${nombre}</h5>
    <h5>Apellido Paterno: ${ApellidoP}</h5>
    <h5>Apellido Materno: ${ApellidoM}</h5>
    <h5>Teléfono: ${telefono}</h5>
    <h5>Correo: ${correo}</h5>
    <h5>Edad: ${edad}</h5>
    <h5>Evento: ${evento}</h5>
    <h5>Hora: ${hora}</h5>
    <h5>Fecha de compra: ${fechaCompra}</h5> 
    <h5>Precio: </h5>
    <h5>Descuento: </h5>
  </div>
</div>
</body>
</html>`;


    const filePath = path.join(__dirname, 'Entradas', `${nombre}_Platea.html`);
    fs.writeFileSync(filePath, html, 'utf8');

    res.json({ mensaje: 'HTML generado correctamente', url: `/Entradas/${nombre}_Platea.html` });

  } catch (error) {
    console.error(error);
    res.status(500).send('Error al generar HTML');
  }
});


app.post('/generarPalco', async (req, res) => {
  const { rut, nombre, ApellidoP, ApellidoM, telefono, correo, edad, evento, hora } = req.body;
const fechaCompra = new Date().toLocaleString('es-CL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
});
  try {
    const html = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Entrada Palco</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="entradaP.css">
</head>
<body>
<header><img src="22d5227b-d92e-4ec6-a145-940773c65afe.png" width="250"></header>
<div class="divisor">
  <div class="divMini">
    <h1>Entrada Palco</h1>
    <h5>RUT: ${rut}</h5>
    <h5>Nombre: ${nombre}</h5>
    <h5>Apellido Paterno: ${ApellidoP}</h5>
    <h5>Apellido Materno: ${ApellidoM}</h5>
    <h5>Teléfono: ${telefono}</h5>
    <h5>Correo: ${correo}</h5>
    <h5>Edad: ${edad}</h5>
    <h5>Evento: ${evento}</h5>
    <h5>Hora: ${hora}</h5>
    <h5>Fecha de compra: ${fechaCompra} </h5> 
    <h5>Precio: </h5>
    <h5>Descuento: </h5>
  </div>
</div>
</body>
</html>`;

    const filePath = path.join(__dirname, 'Entradas', `${nombre}_Palco.html`);
    fs.writeFileSync(filePath, html, 'utf8');

    res.json({ mensaje: 'HTML generado correctamente', url: `/Entradas/${nombre}_Palco.html` });

  } catch (error) {
    console.error(error);
    res.status(500).send('Error al generar HTML');
  }
});


app.post('/generarGaleria', async (req, res) => {
  const { rut, nombre, ApellidoP, ApellidoM, telefono, correo, edad, evento, hora } = req.body;
const fechaCompra = new Date().toLocaleString('es-CL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
});
  try {
    const html = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Entrada Galeria</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="entradaG.css">
</head>
<body>
<header><img src="22d5227b-d92e-4ec6-a145-940773c65afe.png" width="250"></header>
<div class="divisor">
  <div class="divMini">
    <h1>Entrada Palco</h1>
    <h5>RUT: ${rut}</h5>
    <h5>Nombre: ${nombre}</h5>
    <h5>Apellido Paterno: ${ApellidoP}</h5>
    <h5>Apellido Materno: ${ApellidoM}</h5>
    <h5>Teléfono: ${telefono}</h5>
    <h5>Correo: ${correo}</h5>
    <h5>Edad: ${edad}</h5>
    <h5>Evento: ${evento}</h5>
    <h5>Hora: ${hora}</h5>
    <h5>Fecha de compra: ${fechaCompra} </h5> 
    <h5>Precio: </h5>
    <h5>Descuento: </h5>
  </div>
</div>
</body>
</html>`;

    const filePath = path.join(__dirname, 'Entradas', `${nombre}_Galeria.html`);
    fs.writeFileSync(filePath, html, 'utf8');

    res.json({ mensaje: 'HTML generado correctamente', url: `/Entradas/${nombre}_Palco.html` });

  } catch (error) {
    console.error(error);
    res.status(500).send('Error al generar HTML');
  }
});
app.get("/asientos-ocupados", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT numero_asiento FROM entradas_graderia"
    );

    const ocupados = result.rows.map(r => r.numero_asiento);

    res.json(ocupados);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener asientos ocupados" });
  }
});
app.listen(port, () => 
    console.log(`Servidor corriendo en http://localhost:${port}/administrador`));