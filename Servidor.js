const express=require('express');
const app=express();
const port=3000;
const operaciones=require('./ModuloPersonas/Personas');
const operacionesEP=require('./Modulo_entradas/palco');
const operacionesEG=require('./Modulo_entradas/gradería');
const operacionesEPL=require('./Modulo_entradas/platea');
app.use(express.json());

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
app.get('/entradas',(req,res)=>{

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
app.get('/entradasG',(req,res)=>{

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
app.get('/entradasPL',(req,res)=>{

    const PLATEA=operacionesEPL.ObtenerEPL();
    res.json(PLATEA);
});
app.post('/agregarPL', (req, res) => {
   
    operacionesEPL.AgregarEPL(req.body);
    res.json({ mensaje: 'Entrada ingresada correctamente' });
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
async function generarHTML(nombre, telefono, correo, direccion, imagenUrl) {
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Contacto</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css" rel="stylesheet">
        <link rel="stylesheet" href="inicio.css">
    </head>
    <header>
        <nav class="navbar barranav">
            <div class="container-fluid barranav">
                <a href="#">
                    <img src="Contenido/Logo-DPP-300dpi-4.png" alt="Logo" width="250" height="80">
                </a>
            </div>
        </nav>
    </header>
    <body>
        <br>
        <div class="bs-primary-border-subtle container">
            <div class="marcofoto">
                <div class="foto">
                    ${imagenUrl ? `<img src="${imagenUrl}">` : ''}
                </div>
            </div>
            <div class="info">
                <h1 class="titulo">Datos de contacto</h1>
                <div class="letras">
                    <h4 class="nombre-defensor">${nombre}</h4>
                    <h4>Teléfono: ${telefono}</h4>
                    <h4>Email: ${correo}</h4>
                    <h4>Dirección: ${direccion}</h4>
                    <br><br>
                    <a href="#">
                        <button class="boton">AGENDAR CITA</button>
                    </a>
                </div>
            </div>
        </div>
    </body>
    <footer></footer>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/js/bootstrap.bundle.min.js"></script>
    </html>
  `;
}

app.listen(port,()=>{
    console.log(`Servidor escuchando en http://localhost:${port}/admin.html`);
}   );